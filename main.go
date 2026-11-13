package main

import (
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/websocket"
	"google.golang.org/protobuf/proto"
	pb "tinychat/proto"
)

// Client WebSocket 客户端
type Client struct {
	hub         *Hub
	conn        *websocket.Conn
	send        chan []byte
	id          int32
	name        string
	lastMsgTime time.Time // 限流: 上次消息时间
	msgCount    int       // 限流: 当前秒内消息数
	ip          string    // 客户端 IP
}

// Hub 管理所有客户端连接
type Hub struct {
	clients     map[*Client]bool
	userCount   map[int32]int // 每个用户ID的连接数
	onlineCount int32         // 在线唯一用户数
	broadcast   chan []byte
	register    chan *Client
	unregister  chan *Client
	mu          sync.RWMutex
	ipConnCount map[string]int // 每个IP的连接数 (限流)
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// NewHub 创建新的 Hub
func NewHub() *Hub {
	return &Hub{
		broadcast:   make(chan []byte, 512),
		register:    make(chan *Client),
		unregister:  make(chan *Client),
		clients:     make(map[*Client]bool),
		userCount:   make(map[int32]int),
		ipConnCount: make(map[string]int),
	}
}

// wipeBytes 尽快清零不再需要的消息缓冲区。
// 这不能控制 Go 垃圾回收时机，但可以避免已完成转发的字节继续保留在可用切片中。
func wipeBytes(data []byte) {
	for i := range data {
		data[i] = 0
	}
}

// queueMessage 为每个接收者创建独立副本，避免清理发送方缓冲区时
// 破坏仍在其他客户端发送队列中的消息。
func queueMessage(client *Client, data []byte) bool {
	payload := make([]byte, len(data))
	copy(payload, data)
	select {
	case client.send <- payload:
		return true
	default:
		wipeBytes(payload)
		return false
	}
}

// Run Hub 主循环
func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			h.mu.Lock()
			h.clients[client] = true
			count := len(h.clients)
			h.mu.Unlock()

			log.Printf("[连接] 新客户端连接, 当前连接数: %d", count)
			// 不立即广播加入消息，等收到第一条消息后再广播

		case client := <-h.unregister:
			h.mu.Lock()
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.send)
				count := len(h.clients)

				// 减少 IP 连接计数
				if client.ip != "" {
					h.ipConnCount[client.ip]--
					if h.ipConnCount[client.ip] <= 0 {
						delete(h.ipConnCount, client.ip)
					}
				}
				h.mu.Unlock()

				// 只有已识别的用户才处理离开逻辑
				if client.id != 0 {
					isLastConnection := h.userLeave(client.id)
					log.Printf("[离开] %s (ID: %d), 当前在线: %d", client.name, client.id, h.onlineCount)

					// 只有完全离开才广播（防止多标签页刷屏）
					if isLastConnection {
						leaveMsg := &pb.ChatMessage{
							Type:       pb.MessageType_LEAVE,
							SenderName: client.name,
							Content:    client.name + " 离开了聊天室",
						}
						h.broadcastProtoMessage(leaveMsg)
					}
				} else {
					log.Printf("[断开] 未识别的客户端断开, 当前连接数: %d", count)
				}

				// 广播在线人数
				h.broadcastOnlineCount()
			} else {
				h.mu.Unlock()
			}

		case message := <-h.broadcast:
			h.mu.RLock()
			var failedClients []*Client
			for client := range h.clients {
				if !queueMessage(client, message) {
					// 发送失败，记录需要移除的客户端
					failedClients = append(failedClients, client)
				}
			}
			h.mu.RUnlock()
			wipeBytes(message)

			// 在锁外处理失败的客户端，触发 unregister 流程
			for _, client := range failedClients {
				h.unregister <- client
			}
		}
	}
}

// broadcastOnlineCount 广播在线人数
func (h *Hub) broadcastOnlineCount() {
	h.mu.RLock()
	count := h.onlineCount
	h.mu.RUnlock()

	msg := &pb.ChatMessage{
		Type:        pb.MessageType_ONLINE_COUNT,
		OnlineCount: count,
	}
	h.broadcastProtoMessage(msg)
}

// userJoin 用户加入，返回是否是该用户的首次连接
func (h *Hub) userJoin(id int32) bool {
	h.mu.Lock()
	defer h.mu.Unlock()
	isFirstConnection := h.userCount[id] == 0
	if isFirstConnection {
		h.onlineCount++
	}
	h.userCount[id]++
	return isFirstConnection
}

// userLeave 用户离开，返回是否是该用户的最后一个连接
func (h *Hub) userLeave(id int32) bool {
	h.mu.Lock()
	defer h.mu.Unlock()
	h.userCount[id]--
	isLastConnection := h.userCount[id] <= 0
	if isLastConnection {
		delete(h.userCount, id)
		h.onlineCount = max(h.onlineCount-1, 0)
	}
	return isLastConnection
}

// broadcastProtoMessage 广播 Protobuf 消息
func (h *Hub) broadcastProtoMessage(msg *pb.ChatMessage) {
	data, err := proto.Marshal(msg)
	if err != nil {
		log.Printf("Protobuf 编码失败: %v", err)
		return
	}
	h.broadcast <- data
}

// readPump 读取客户端消息
func (c *Client) readPump() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()

	c.conn.SetReadLimit(128 * 1024) // 限制单条消息最大 128KB
	c.conn.SetReadDeadline(time.Now().Add(90 * time.Second))

	for {
		_, message, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("WebSocket 错误: %v", err)
			}
			break
		}

		// 收到任何消息都重置超时（包括心跳）
		c.conn.SetReadDeadline(time.Now().Add(90 * time.Second))

		// 每条消息单独处理，函数退出时清零原始缓冲区和图片字节。
		func() {
			var msg pb.ChatMessage
			defer func() {
				wipeBytes(message)
				wipeBytes(msg.ImageData)
				msg.Reset()
			}()

			// 限流检查: 每秒最多 5 条消息
			now := time.Now()
			if now.Sub(c.lastMsgTime) < time.Second {
				c.msgCount++
				if c.msgCount > 5 {
					log.Printf("[限流] %s (IP: %s) 发送过快, 已丢弃", c.name, c.ip)
					return
				}
			} else {
				c.msgCount = 1
				c.lastMsgTime = now
			}

			// 解析 Protobuf 消息
			if err := proto.Unmarshal(message, &msg); err != nil {
				log.Printf("Protobuf 解码失败: %v", err)
				return
			}

			// 检查消息大小，防止恶意大包攻击 (限制 60KB)
			if len(msg.ImageData) > 60*1024 {
				log.Printf("[安全] %s 发送的图片过大 (%dKB)，已丢弃", c.name, len(msg.ImageData)/1024)
				return
			}

			// 提取用户信息（第一次收到消息时）
			if c.id == 0 && msg.SenderId != 0 {
				c.id = msg.SenderId
				c.name = msg.SenderName

				isFirstConnection := c.hub.userJoin(c.id)
				log.Printf("[加入] %s (ID: %d)", c.name, c.id)

				// 只有首次加入才广播（防止多标签页刷屏）
				if isFirstConnection {
					joinMsg := &pb.ChatMessage{
						Type:       pb.MessageType_JOIN,
						SenderName: c.name,
						Content:    c.name + " 加入了聊天室",
					}
					data, err := proto.Marshal(joinMsg)
					if err == nil {
						c.hub.mu.RLock()
						for client := range c.hub.clients {
							if client != c {
								queueMessage(client, data)
							}
						}
						c.hub.mu.RUnlock()
						wipeBytes(data)
					}
				}
				c.hub.broadcastOnlineCount()
			}

			// 广播聊天消息给其他人（不包括发送者自己）。
			// 每个接收者使用独立副本，写入完成后由 writePump 清零。
			if msg.Type == pb.MessageType_MESSAGE && (msg.Content != "" || len(msg.ImageData) > 0) {
				c.hub.mu.RLock()
				for client := range c.hub.clients {
					if client != c && !queueMessage(client, message) {
						log.Printf("发送消息失败: %s", client.name)
					}
				}
				c.hub.mu.RUnlock()
			}
		}()
	}
}

// writePump 发送消息到客户端
func (c *Client) writePump() {
	defer c.conn.Close()

	for message := range c.send {
		c.conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
		err := c.conn.WriteMessage(websocket.BinaryMessage, message)
		wipeBytes(message)
		if err != nil {
			return
		}
	}
	// send 通道关闭时发送关闭帧
	c.conn.WriteMessage(websocket.CloseMessage, []byte{})
}

// handleWebSocket 处理 WebSocket 连接
func handleWebSocket(hub *Hub, w http.ResponseWriter, r *http.Request) {
	// 获取客户端 IP
	ip := r.Header.Get("X-Forwarded-For")
	if ip == "" {
		ip = r.Header.Get("X-Real-IP")
	}
	if ip == "" {
		ip = r.RemoteAddr
	}

	// IP 连接数限制: 每个 IP 最多 3 个连接
	hub.mu.Lock()
	if hub.ipConnCount[ip] >= 3 {
		hub.mu.Unlock()
		log.Printf("[限流] IP %s 连接数过多, 拒绝连接", ip)
		http.Error(w, "Too many connections from this IP", http.StatusTooManyRequests)
		return
	}
	hub.ipConnCount[ip]++
	hub.mu.Unlock()

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("WebSocket 升级失败:", err)
		// 连接失败,减少计数
		hub.mu.Lock()
		hub.ipConnCount[ip]--
		if hub.ipConnCount[ip] <= 0 {
			delete(hub.ipConnCount, ip)
		}
		hub.mu.Unlock()
		return
	}

	client := &Client{
		hub:  hub,
		conn: conn,
		send: make(chan []byte, 256),
		ip:   ip,
	}
	client.hub.register <- client

	go client.writePump()
	go client.readPump()
}

func main() {
	hub := NewHub()
	go hub.Run()

	// WebSocket 路由
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		handleWebSocket(hub, w, r)
	})

	// 静态文件服务
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			http.ServeFile(w, r, "chat.html")
		} else if r.URL.Path == "/proto/message.js" {
			w.Header().Set("Content-Type", "application/javascript")
			http.ServeFile(w, r, "proto/message.js")
		} else {
			http.NotFound(w, r)
		}
	})

	addr := ":8080"
	log.Printf("🚀 TinyChat 服务器启动在 http://localhost%s", addr)
	if err := http.ListenAndServe(addr, nil); err != nil {
		log.Fatal("服务器启动失败: ", err)
	}
}

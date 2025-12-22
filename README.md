# 🔒 TinyChat

> 极简匿名聊天室 - 5分钟部署，阅后即焚，零痕迹

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Go Version](https://img.shields.io/badge/Go-1.20+-00ADD8?logo=go)](https://go.dev/)
[![WebSocket](https://img.shields.io/badge/WebSocket-Protobuf-blue)](https://protobuf.dev/)

一个注重隐私、极简设计的实时匿名聊天室。无需注册，无需数据库，刷新即清空，完美适合临时讨论和隐私对话。

## ✨ 特性

- 🚀 **极简部署** - 单个二进制文件 + 单个 HTML，无需数据库
- 🔐 **双层加密** - HTTPS/WSS 传输加密 + Protobuf 二进制混淆
- 👤 **完全匿名** - 随机 ID，无需注册，无法追踪
- 🖼️ **图片支持** - 智能压缩至 ≤50KB，节省流量 90%+
- 💨 **阅后即焚** - 刷新页面即清空，无历史记录
- 📱 **响应式设计** - 完美支持手机和桌面端
- ⚡ **高性能** - Go + WebSocket + Protobuf，轻松支持数千并发

## 🎯 使用场景

- 💬 临时讨论敏感话题
- 📢 匿名爆料/反馈收集
- 🎪 活动临时聊天室
- 🏢 内网快速沟通
- 🔒 不想留痕迹的对话

## 🚀 快速开始

### 方式一：从源码编译

```bash
# 克隆仓库
git clone https://github.com/lotey/tinychat.git
cd tinychat

# 编译
go build -o tinychat server/main.go

# 运行
./tinychat
```

### 方式二：Docker 部署

```bash
# 使用 Docker
docker run -d -p 8080:8080 你的用户名/tinychat

# 或使用 Docker Compose
docker-compose up -d
```

## 📖 功能说明

### 发送消息
- 输入文字后按 **Enter** 发送
- **Shift + Enter** 换行

### 发送图片
- **粘贴** - Ctrl+V 直接粘贴截图
- **拖拽** - 拖拽图片到聊天区域
- **选择** - 点击图片按钮选择文件

图片会自动压缩至 50KB 以下，大幅节省流量！

### 匿名系统
- 每次刷新页面生成新的随机 ID (U0001-U9999)
- 无法关联历史身份
- 完全匿名，无需注册

## 🔒 安全特性

### 传输层安全
- ✅ HTTPS/WSS 加密传输 (配合 Cloudflare)
- ✅ 防中间人攻击
- ✅ 防网络窃听

### 协议层安全
- ✅ Protobuf 二进制协议
- ✅ 非人类可读
- ✅ 难以逆向分析

### 隐私保护
- ✅ 无数据库，无日志
- ✅ 无历史记录
- ✅ 刷新即清空
- ✅ 完全匿名

## 🛠️ 技术栈

- **后端**: Go + Gorilla WebSocket
- **前端**: HTML + jQuery + Protobuf.js
- **协议**: WebSocket + Protocol Buffers
- **部署**: 单二进制文件，零依赖

## 📁 项目结构

```
tinychat/
├── chat.html           # 前端页面 (单文件)
├── server/
│   └── main.go        # 后端服务器
├── proto/
│   ├── message.proto  # Protobuf 定义
│   └── message.pb.go  # 生成的 Go 代码
├── README.md
├── LICENSE
└── Dockerfile
```

## 🔧 配置

### 修改端口

编辑 `server/main.go`:

```go
addr := ":8080"  // 改成你想要的端口
```

### 配合 Cloudflare

1. 部署到服务器
2. 配置 Cloudflare SSL/TLS
3. 自动获得 HTTPS 加密

### Nginx 反向代理

```nginx
location /ws {
    proxy_pass http://localhost:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发环境

```bash
# 安装依赖
go mod download

# 生成 Protobuf 代码
protoc --go_out=. --go_opt=paths=source_relative proto/message.proto

# 运行
go run server/main.go
```

## 📝 TODO

- [ ] Docker 镜像
- [ ] 房间/频道功能
- [ ] 文件传输支持
- [ ] 更多主题
- [ ] 管理员功能

## ⚠️ 免责声明

本项目仅供学习交流使用。请遵守当地法律法规，不要用于非法用途。作者不对使用本软件产生的任何后果负责。

## 📄 开源协议

[MIT License](LICENSE)

## 🙏 致谢

- [Gorilla WebSocket](https://github.com/gorilla/websocket)
- [Protocol Buffers](https://protobuf.dev/)
- [jQuery](https://jquery.com/)

---

⭐ 如果这个项目对你有帮助，请给个 Star！

# 🔒 TinyChat

> **不注册 · 不存储 · 不追踪 · 阅后即焚**  
> **5MB 轻量 · Protobuf 省流 70% · 20MB 内存**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Go Version](https://img.shields.io/badge/Go-1.20+-00ADD8?logo=go)](https://go.dev/)
[![WebSocket](https://img.shields.io/badge/WebSocket-Protobuf-blue)](https://protobuf.dev/)

## 🎯 核心特性

| 特性 | TinyChat | 传统聊天软件 |
|------|----------|-------------|
| 💬 **注册** | ❌ 无需注册，打开即用 | ✅ 需要邮箱/手机号 |
| 💾 **存储** | ❌ 零存储，消息不落盘 | ✅ 数据库永久保存 |
| 📝 **日志** | ❌ 零日志，无访问记录 | ✅ 完整日志记录 |
| 🔍 **追踪** | ❌ 完全匿名，无法追踪 | ✅ 用户 ID 关联 |
| 🔥 **历史** | ❌ 刷新即销毁 | ✅ 永久保留 |
| 📦 **体积** | ✅ 5MB 单文件 | ❌ 数百 MB + 依赖 |
| 💨 **流量** | ✅ Protobuf 省 70% | ❌ JSON 臃肿 |
| 🚀 **内存** | ✅ 20MB 起步 | ❌ 500MB+ |

```bash
# 3 秒启动
git clone https://github.com/lotey/tinychat.git
cd tinychat && go build -o tinychat main.go && ./tinychat
# 访问 http://localhost:8080
```

---

## 🚀 快速开始

```bash
# 从源码运行
git clone https://github.com/lotey/tinychat.git
cd tinychat
go build -o tinychat main.go
./tinychat
```

**Docker 部署**
```bash
docker run -d -p 8080:8080 lotey/tinychat
```

**免费云平台**（用户自行部署）
- **Railway.app** - $5/月免费额度，不休眠
- **Render.com** - 完全免费，15 分钟无活动会休眠

---

## 📖 使用说明

- **发送消息** - Enter 发送，Shift+Enter 换行
- **发送图片** - Ctrl+V 粘贴 / 拖拽 / 点击按钮
- **匿名系统** - 每次刷新生成新 ID (U0001-U9999)

---

## 🔒 技术特性

**消息流转：**
```
用户 A → 服务器内存转发 → 用户 B
           ↓
        立即丢弃
```

**Protobuf 效率：**
```
发送 "Hello World"：
- JSON:     65 字节
- Protobuf: 18 字节 (省 72%)
```

**性能数据：**
```
体积: 5.2 MB  |  内存: 20 MB  |  启动: <100ms
并发: 1000+   |  流量: 省 70%  |  图片: 自动压缩至 50KB
```

---

## 🛠️ 技术栈

- **后端** - Go + Gorilla WebSocket + Protobuf
- **前端** - 单个 HTML + 原生 WebSocket
- **协议** - Protobuf 二进制（比 JSON 小 70%）

---

## 🤝 贡献

欢迎 PR！保持极简原则：
- ✅ 性能优化、Bug 修复、安全增强
- ❌ 数据库、用户系统、历史记录

---

## ⚠️ 免责声明

本项目设计为"零存储"，服务器不保存任何消息。建议配合 HTTPS/WSS 使用。仅供学习交流，请遵守当地法律法规。

---

⭐ **如果你重视隐私，请给个 Star！**

## 📄 License

[MIT License](LICENSE)

# 多阶段构建 Dockerfile
FROM golang:1.23-alpine AS builder

# 设置工作目录
WORKDIR /build

# 复制 go mod 文件
COPY go.mod go.sum ./
RUN go mod download

# 复制源代码
COPY server/ ./server/
COPY proto/ ./proto/

# 构建应用
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o tinychat ./server/main.go

# 最终镜像
FROM alpine:latest

# 安装 ca-certificates（用于 HTTPS）
RUN apk --no-cache add ca-certificates

WORKDIR /app

# 从构建阶段复制二进制文件
COPY --from=builder /build/tinychat .

# 复制前端文件
COPY chat.html .

# 暴露端口
EXPOSE 8080

# 运行应用
CMD ["./tinychat"]

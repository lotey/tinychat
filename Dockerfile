# 多阶段构建 Dockerfile
FROM golang:1.23-alpine AS builder

# 设置 Go 代理为国内镜像
ENV GOPROXY=https://goproxy.cn,direct

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

# 使用阿里云镜像源 + 安装依赖 + 设置时区
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && \
    apk --no-cache add ca-certificates tzdata && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone

WORKDIR /app

# 从构建阶段复制二进制文件
COPY --from=builder /build/tinychat .

# 复制前端文件
COPY chat.html .
COPY proto/message.js proto/

# 暴露端口
EXPOSE 8080

# 运行应用
CMD ["./tinychat"]

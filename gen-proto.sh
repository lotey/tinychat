#!/bin/bash

# Protobuf 编译脚本

echo "🔨 编译 Protobuf 文件..."

# 检查 protoc 是否安装
if ! command -v protoc &> /dev/null
then
    echo "❌ protoc 未安装，请先安装 Protocol Buffers 编译器"
    echo "安装方法："
    echo "  Ubuntu/Debian: sudo apt install protobuf-compiler"
    echo "  macOS: brew install protobuf"
    echo "  或访问: https://github.com/protocolbuffers/protobuf/releases"
    exit 1
fi

# 安装 Go protobuf 插件（如果未安装）
if ! command -v protoc-gen-go &> /dev/null
then
    echo "📦 安装 protoc-gen-go 插件..."
    go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
fi

# 编译 proto 文件
protoc --go_out=. --go_opt=paths=source_relative \
    proto/message.proto

echo "✅ Protobuf 编译完成！"
echo "生成文件: proto/message.pb.go"

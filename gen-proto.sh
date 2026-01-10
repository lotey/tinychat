#!/bin/bash

# Protobuf 编译脚本（Go + JS）

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

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null
then
    echo "❌ Node.js 未安装"
    echo "   安装地址: https://nodejs.org/"
    exit 1
fi

# 安装插件
echo "📦 安装插件..."
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
npm install -g protobufjs-cli

# 编译 Go
echo "📦 生成 Go Protobuf 代码..."
protoc --go_out=. --go_opt=paths=source_relative proto/message.proto
echo "✅ Go: proto/message.pb.go"

# 编译 JS
echo "📦 生成 JS Protobuf 代码..."
npx pbjs -t static-module -w closure -o proto/message.js proto/message.proto
echo "✅ JS: proto/message.js"

echo ""
echo "🎉 Protobuf 编译完成！"

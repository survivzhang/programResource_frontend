# 构建阶段
FROM node:18-alpine as builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制所有源代码
COPY . .

# 构建项目
RUN npm run build

# 生产阶段
FROM nginx:alpine

# 复制构建结果（注意这里改为 dist 目录，因为是 Vite 的默认输出目录）
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# nginx 端口
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
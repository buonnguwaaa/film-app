FROM node:22

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json để cài đặt dependencies trước
COPY package*.json ./

# Cài đặt tất cả dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Xây dựng ứng dụng
RUN npm run build

# Cài đặt serve để phục vụ ứng dụng
RUN npm install -g serve

# Mở cổng 5173 cho ứng dụng
EXPOSE 5173

# Lệnh để chạy ứng dụng với serve
CMD ["serve", "-s", "dist", "-l", "5173"]
# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# ติดตั้ง dependencies
COPY package*.json ./
RUN npm install

# คัดลอก source code
COPY . .

# Build TypeScript -> dist
RUN npm run build

# Stage 2: Production
FROM node:22-alpine AS production
WORKDIR /app

# คัดลอก dist และ package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# ติดตั้ง production dependencies
RUN npm install

EXPOSE 5076
CMD ["node", "dist/src/main.js"]

# backend/Dockerfile
FROM node:alpine

WORKDIR /app

COPY package*.json /app

RUN npm ci

COPY . /app

EXPOSE 5000

CMD ["node", "server.js"]

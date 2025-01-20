FROM node:lts-alpine:latest AS builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY /build .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
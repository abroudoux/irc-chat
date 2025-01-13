import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const PORT = 3000;
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
  debug: true,
});

io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

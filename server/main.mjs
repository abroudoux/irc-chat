import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());

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

  const defaultRoom = "hello";
  socket.join(defaultRoom);
  console.log(`User with ID: ${socket.id} joined room: ${defaultRoom}`);

  socket.emit("joined_room", { roomName: defaultRoom });

  socket.on("join_room", (roomName) => {
    socket.join(roomName);
    console.log(`User with ID: ${socket.id} joined room: ${roomName}`);
  });

  socket.on("get_rooms", () => {
    const rooms = [...io.sockets.adapter.rooms.keys()].filter(
      (room) => !io.sockets.adapter.sids.get(socket.id)?.has(room)
    );
    socket.emit("rooms_list", rooms);
  });

  socket.on("send_message", (data) => {
    console.log(`Message received from ${data.username}: ${data.message}`);
    socket.broadcast.emit("receive_message", data);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on *:${PORT}`);
});

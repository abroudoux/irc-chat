import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

import UserService from "./src/services/user.services.mjs";
import RoomService from "./src/services/room.services.mjs";

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

const userService = new UserService();
const roomService = new RoomService();

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  roomService.addRoom("hello");

  socket.on("join_hello_room", (username) => {
    socket.join("hello");

    userService.addUser(username);

    console.log(`${username} joined the hello room`);

    io.to("hello").emit("user_joined", username);
  });

  socket.on("send_message", (data) => {
    socket.emit("receive_message", data);
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on *:${PORT}`);
});

app.get(`/users/username/:username`, (req, res) => {
  // const { username } = req.params;
  // const userExists = connectedUsers.has(username);
  // return res.json({ isUsernameAvailable: userExists });
  return res.json({ isUsernameAvailable: false });
});

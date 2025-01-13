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

const connectedUsers = new Set();

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_hello_room", (username) => {
    connectedUsers.add(username);
    socket.join("hello");

    io.to("hello").emit(
      "update_user_list",
      Array.from(connectedUsers.values())
    );
  });

  socket.on("disconnect", () => {
    connectedUsers.delete(socket.id);

    io.to("hello").emit(
      "update_user_list",
      Array.from(connectedUsers.values())
    );

    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on *:${PORT}`);
});

app.get(`/users/username/:username`, (req, res) => {
  const { username } = req.params;
  const userExists = connectedUsers.has(username);
  return res.json({ isUsernameAvailable: userExists });
});

app.get(`/rooms`, (req, res) => {});
app.post(`/rooms`, (req, res) => {});

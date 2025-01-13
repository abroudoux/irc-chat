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

const rooms = new Set();

app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

app.post("/rooms", (req, res) => {
  console.log("Request body:", req.body);
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "Room name is required." });
  if (rooms.has(name))
    return res.status(409).json({ error: "Room already exists." });

  rooms.add(name);
  res.status(201).json({ message: "Room created successfully." });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log(`Message received from ${data.username}: ${data.message}`);
    socket.broadcast.emit("receive_message", data);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on *:${PORT}`);
});

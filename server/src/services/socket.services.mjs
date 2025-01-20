import { Server } from "socket.io";

import UserService from "./user.services.mjs";

export default class SocketService {
  io;
  userService;

  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
      },
    });

    this.initialize();
    this.userService = new UserService();
  }

  initialize() {
    this.io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on("join_hello_room", (username) => {
        this.joinRoom(socket, "hello", username);
        const message = `Hello ${username}, welcome to the Hello room!`;
        this.io.to("hello").emit("joined_hello_room", message);
      });

      socket.on("join_room", (username, roomName) => {
        this.joinRoom(socket, username, roomName);
      });

      socket.on("send_message", (data) => {
        this.handleMessage(socket, data);
      });

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }

  joinRoom(socket, data) {
    const { username, roomName } = data;
    socket.join(roomName);
    console.log(`User ${username} joined the ${roomName} room`);
    this.emitUserJoinedRoom(roomName, username);
  }

  emitUserJoinedRoom(roomName, username) {
    this.io.to(roomName).emit("joined_room", username);
  }

  handleMessage(socket, data) {
    console.log("Message received on server:", data);
    socket.emit("receive_message", data);
    socket.broadcast.emit("receive_message", data);
  }
}

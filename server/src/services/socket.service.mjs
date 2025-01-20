import { Server } from "socket.io";

export default class SocketService {
  io;

  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
      },
    });

    this.initialize();
  }

  initialize() {
    this.io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on("join_room", (data) => {
        this.joinRoom(socket, data);
      });

      socket.on("send_message", (data) => {
        this.sendMessage(data.author, data.roomName, data.content);
      });

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }

  joinRoom(socket, data) {
    const { username, roomName } = data;
    socket.join(roomName);
    this.emitUserJoinedRoom(roomName, username);
  }

  emitUserJoinedRoom(roomName, username) {
    this.io.to(roomName).emit("joined_room", username);
  }

  sendMessage(author, roomName, content) {
    this.io
      .to(roomName)
      .emit("receive_message", { author: author, content: content });
  }
}

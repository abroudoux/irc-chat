import { Server } from "socket.io";

export default class SocketService {
  io;
  usersConnected;

  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
      },
    });

    this.init();
    this.usersConnected = [];
  }

  init() {
    this.io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on("join_room", (data) => {
        this.joinRoom(socket, data);
      });

      socket.on("send_message", (data) => {
        this.sendMessage(data.author, data.roomName, data.content);
      });

      socket.on("disconnect", () => {
        this.usersConnected = this.usersConnected.filter(
          (user) => user.socketId !== socket.id
        );
      });
    });
  }

  joinRoom(socket, data) {
    if (this.userAlreadyExists(data.username)) {
      this.emitUserAlreadyExists(socket, data);
      return;
    }

    const { username, roomName } = data;
    socket.join(roomName);
    this.emitUserJoinedRoom(roomName, username);

    this.usersConnected.push({ username, roomName, socketId: socket.id });
  }

  userAlreadyExists(username) {
    return this.usersConnected.some((user) => user.username === username);
  }

  emitUserAlreadyExists(socket, data) {
    socket.emit("user_already_exists", data.username);
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

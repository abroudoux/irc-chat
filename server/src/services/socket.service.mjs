import { Server } from "socket.io";

import RoomService from "./room.service.mjs";

export default class SocketService {
  io;
  connectedUsers;
  roomService;

  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
      },
    });

    this.initialize();
    this.connectedUsers = {};
    this.roomService = new RoomService();
  }

  initialize() {
    this.io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on("join_room", (data) => {
        console.log(this.connectedUsers);

        if (this.checkIfUserAlreadyExists(data.username)) {
          socket.emit("user_already_exists", { userAlreadyExists: true });
          return;
        }

        this.connectedUsers[data.username] = socket.id;
        this.joinRoom(socket, data.username, data.roomName);
        console.log(this.connectedUsers);
      });

      socket.on("send_message", (data) => {
        this.sendMessage(data.author, data.roomName, data.content);
      });

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        for (const username in this.connectedUsers) {
          if (this.connectedUsers[username] === socket.id) {
            delete this.connectedUsers[username];
            break;
          }
        }
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

  checkIfUserAlreadyExists(username) {
    return username in this.connectedUsers;
  }

  sendMessage(author, roomName, content) {
    this.io.to(roomName).emit("receive_message", { author, content });
  }
}

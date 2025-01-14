import { Server } from "socket.io";

class SocketService {
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

      socket.on("join_hello_room", (username) => {
        this.joinRoom(socket, "hello", username);
      });

      socket.on("join_room", (roomName, username) => {
        this.joinRoom(socket, roomName, username);
      });

      socket.on("send_message", (data) => {
        this.handleMessage(socket, data);
      });

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }

  joinRoom(socket, roomName, username) {
    socket.join(roomName);
    console.log(`${username} joined the ${roomName} room`);
    this.io.to(roomName).emit("joined_room", username);
  }

  handleMessage(socket, data) {
    console.log("Message received on server:", data);
    socket.emit("receive_message", data);
    socket.broadcast.emit("receive_message", data);
  }
}

export default SocketService;

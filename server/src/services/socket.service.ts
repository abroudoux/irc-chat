import { Server, Socket, DefaultEventsMap } from "socket.io";
import http from "http";

import type { UserConnected } from "../utils/types";
import RoomService from "./room.service";
import UserService from "./user.service";

export default class SocketService {
  public io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  private usersConnected: UserConnected[];
  private roomService: RoomService;
  private userService: UserService;

  public constructor(
    server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
  ) {
    this.io = new Server(server, {
      cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
      },
    });

    this.init();
    this.usersConnected = [];
    this.roomService = RoomService.getInstance();
    this.userService = UserService.getInstance();
  }

  private init() {
    this.io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on("join_room", (data) => {
        this.joinRoom(socket, data);
      });

      socket.on("send_message", (data) => {
        this.sendMessage(data.author, data.roomName, data.content);
      });

      socket.on("disconnect", () => {
        const user = this.usersConnected.find(
          (user) => user.socketId === socket.id
        );
        if (user) {
          this.emitUserLeftRoom(user.roomName, user.username);
          this.usersConnected = this.usersConnected.filter(
            (u) => u.socketId !== socket.id
          );
          console.log(`User disconnected: ${socket.id}`);
          console.log("Updated users connected:", this.usersConnected);
        }
      });
    });
  }

  joinRoom(socket: Socket, data: any) {
    if (this.userAlreadyExists(data.username)) {
      this.emitUserAlreadyExists(socket, data);
      return;
    }

    const { username, roomName } = data;
    socket.join(roomName);
    this.emitUserJoinedRoom(roomName, username);
    const userToAdd: UserConnected = {
      username,
      roomName,
      socketId: socket.id,
    };

    this.usersConnected.push(userToAdd);
  }

  userAlreadyExists(username: string) {
    return this.usersConnected.some((user) => user.username === username);
  }

  emitUserAlreadyExists(socket: Socket, data: any) {
    socket.emit("user_already_exists", data.username);
  }

  emitUserJoinedRoom(roomName: string, username: string) {
    this.io.to(roomName).emit("user_joined_room", username);
  }

  emitUserLeftRoom(roomName: string, username: string) {
    this.io.to(roomName).emit("user_left_room", username);
  }

  sendMessage(author: string, roomName: string, content: string) {
    this.io
      .to(roomName)
      .emit("receive_message", { author: author, content: content });
  }
}

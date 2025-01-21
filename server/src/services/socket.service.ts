import { Server, Socket, DefaultEventsMap } from "socket.io";
import type { User } from "@irc-chat/shared/types";
import http from "http";

import RoomService from "./room.service";
import UserService from "./user.service";

export default class SocketService {
  public io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  private roomService: RoomService;
  private userService: UserService;

  public constructor(
    server: http.Server<
      typeof http.IncomingMessage,
      typeof http.ServerResponse
    >,
    origins: string[]
  ) {
    this.io = new Server(server, {
      cors: {
        origin: origins,
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
      },
    });

    this.init();
    this.roomService = RoomService.getInstance();
    this.userService = UserService.getInstance();
  }

  private init() {
    this.io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      const user = socket.on("create_user", (username: string) => {
        this.createUser(socket, username);
      });
      if (!user) {
        return;
      }

      socket.on("join_room", (data) => {
        this.joinRoom(socket, data);
      });

      socket.on("send_message", (data) => {
        this.sendMessage(data.author, data.roomName, data.content);
      });

      socket.on("disconnect", () => {
        // const user = this.usersConnected.find(
        //   (user) => user.socketId === socket.id
        // );
        // if (user) {
        //   this.emitUserLeftRoom(user.roomName, user.username);
        //   this.usersConnected = this.usersConnected.filter(
        //     (u) => u.socketId !== socket.id
        //   );
        //   console.log(`User disconnected: ${socket.id}`);
        //   console.log("Updated users connected:", this.usersConnected);
        // }
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }

  private createUser(socket: Socket, username: string): User | null {
    const user = this.userService.createUser(socket.id, username);
    if (!user) {
      this.emitUserAlreadyExists(socket, username);
      console.error(`User ${username} already exists`);
      return null;
    }

    console.log("user created from createUser SocketService", user);

    return user;
  }

  joinRoom(socket: Socket, data: any) {
    const { username, roomName } = data;
    const user = this.userService.createUser(socket.id, username);
    if (!user) {
      this.emitUserAlreadyExists(socket, username);
      console.error(`User ${username} already exists`);
      return;
    }

    socket.join(roomName);
    this.emitUserJoinedRoom(roomName, username);

    this.roomService.createRoom(roomName);
    this.roomService.addUserToRoom(roomName, user);
    this.roomService.logAllRooms();
    this.roomService.logUsersFromRoom(roomName);
  }

  emitUserAlreadyExists(socket: Socket, username: string) {
    socket.emit("user_already_exists", username);
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

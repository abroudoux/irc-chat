import { Server, Socket, DefaultEventsMap } from "socket.io";
import http from "http";

import type { User } from "@irc-chat/shared/types";

import RoomService from "./room.service";
import UserService from "./user.service";

export default class SocketService {
  private io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  private roomService: RoomService;
  private userService: UserService;
  private userConnected: User | null;

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
    this.userConnected = null;
  }

  public getUserConnected(): User {
    if (!this.userConnected) {
      throw new Error("No user connected");
    }

    return this.userConnected;
  }

  private init() {
    this.io.on("connection", (socket: Socket) => {
      socket.on("create_user", (username: string) => {
        this.userConnected = this.createUser(socket, username);
        console.log("User created:", this.userConnected);
      });

      socket.on("join_room", (roomName: string) => {
        this.joinRoom(socket, roomName);
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
    const usernameAlreadyUsed: boolean =
      this.userService.isUsernameAlreadyUsed(username);

    if (usernameAlreadyUsed) {
      this.emitUserAlreadyExists(socket, username);
      console.error(`User ${username} already exists`);
      return null;
    }

    const user: User = this.userService.createUser(socket.id, username);
    return user;
  }

  private joinRoom(socket: Socket, roomName: string) {
    socket.join(roomName);
    this.emitUserJoinedRoom(roomName, this.getUserConnected().username);

    this.roomService.createRoom(roomName);
    this.roomService.addUserToRoom(roomName, this.getUserConnected());
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

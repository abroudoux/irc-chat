import { Server, Socket, DefaultEventsMap } from "socket.io";
import http from "http";

import type { User } from "@irc-chat/shared/types";

import RoomService from "./room.service";
import UserService from "./user.service";

export default class SocketService {
  private io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  private userConnected: User | null;
  private userService: UserService;
  private roomService: RoomService;

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
    this.userService = new UserService();
    this.roomService = new RoomService();
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
        console.log(`User ${this.getUserConnected().username} created.`);
      });

      socket.on("join_room", (roomName: string) => {
        this.joinRoom(socket, roomName);
        console.log(
          `User ${this.getUserConnected().username} joined room ${roomName}.`
        );
      });

      socket.on("send_message", (roomName: string, message: string) => {
        this.emitMessage(roomName, message);
        console.log(
          `User ${
            this.getUserConnected().username
          } sent a message to room ${roomName}: ${message}`
        );
      });

      socket.on("disconnect", () => {
        this.roomService.removeUserFromRooms(this.getUserConnected().id);
        this.userService.removeUser(this.getUserConnected().id);

        this.emitUserLeftRoom(this.getUserConnected().username);
        this.userConnected = null;
        console.log("User disconnected.");
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

  private emitUserAlreadyExists(socket: Socket, username: string) {
    socket.emit("user_already_exists", username);
  }

  private joinRoom(socket: Socket, roomName: string) {
    socket.join(roomName);
    this.emitUserJoinedRoom(roomName);
    this.roomService.createRoom(roomName);
    this.roomService.addUserToRoom(roomName, this.getUserConnected());
  }

  private emitMessage(roomName: string, content: string) {
    this.io.to(roomName).emit("receive_message", {
      author: this.getUserConnected().username,
      content: content,
    });
  }

  private emitUserJoinedRoom(roomName: string) {
    this.io
      .to(roomName)
      .emit("user_joined_room", this.getUserConnected().username);
  }

  private emitUserLeftRoom(roomName: string) {
    this.io
      .to(roomName)
      .emit("user_left_room", this.getUserConnected().username);
  }
}

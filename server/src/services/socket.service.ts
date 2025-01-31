import { Server, Socket, DefaultEventsMap } from "socket.io";
import http from "http";

import type { User } from "@irc-chat/shared/types";

import RoomService from "./room.service";
import UserService from "./user.service";

export default class SocketService {
  private io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  private user: User | null;
  private userService: UserService;
  private roomService: RoomService;

  public constructor(
    server: http.Server<
      typeof http.IncomingMessage,
      typeof http.ServerResponse
    >,
    origins: string[],
    userService: UserService,
    roomService: RoomService
  ) {
    this.io = new Server(server, {
      cors: {
        origin: origins,
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
      },
    });

    this.userService = userService;
    this.roomService = roomService;
    this.user = null;
  }

  public getUserConnected(): User {
    if (!this.user) {
      throw new Error("No user connected.");
    }

    return this.user;
  }

  private setUser(user: User): void {
    this.user = user;
    console.log(`User ${user.username} connected to the server.`);
  }

  public init(user: User): void {
    this.setUser(user);

    this.io.on("connection", (socket: Socket) => {
      socket.on("user_connected", (username: string) => {
        console.log(`User ${username} connected to the server.`);
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
        this.user = null;
        console.log("User disconnected.");
      });
    });
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

import { Server, Socket, DefaultEventsMap } from "socket.io";
import http from "http";

import RoomService from "./room.service";
import UserService from "./user.service";

export default class SocketService {
  private io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
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
  }

  public init(): void {
    this.io.on("connection", (socket: Socket) => {
      socket.on("join_room", (username: string, roomName: string) => {
        this.joinRoom(username, socket, roomName);
      });

      socket.on("leave_room", (username: string, roomName: string) => {
        socket.leave(roomName);
        this.emitMessage("System", roomName, `${username} left the room.`);
      });

      socket.on(
        "send_message",
        (username: string, roomName: string, message: string) => {
          console.log(
            `Received message from ${username} in room ${roomName}: ${message}`
          );
          this.emitMessage(username, roomName, message);
        }
      );

      socket.on("disconnect_user", (username: string) => {
        this.disctonnectUSer(username, socket.id);
      });
    });
  }

  private joinRoom(username: string, socket: Socket, roomName: string) {
    const rooms = Array.from(socket.rooms);
    if (!rooms.includes(roomName)) {
      socket.join(roomName);
      const newMessage: string = `${username} joined the room.`;
      this.emitMessage("System", roomName, newMessage);
      this.roomService.createRoom(roomName);
      this.roomService.addUserToRoom(roomName, username, socket.id);
    }
  }

  private emitMessage(username: string, roomName: string, content: string) {
    this.io.to(roomName).emit("receive_message", {
      author: username,
      content: content,
    });
    console.log(
      `Message emited from ${username} in room ${roomName}: ${content}`
    );
  }

  private disctonnectUSer(username: string, userId: string) {
    this.userService.removeUser(username, userId);
    console.log(`User ${username} - ${userId} disconnected.`);
  }
}

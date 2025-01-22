import { Socket, io } from "socket.io-client";

import { Message } from "@/utils/interfaces";

export default class SocketService {
  public static instance: SocketService = new SocketService();
  private socketUrl: string;
  private socket: Socket;

  public constructor() {
    this.socketUrl = "http://localhost:3000";
    this.socket = io(this.socketUrl);
  }

  public static getInstance(): SocketService {
    return this.instance;
  }

  public getSocketUrl(): string {
    return this.socketUrl;
  }

  public getSocket(): Socket {
    return this.socket;
  }

  public createUser(username: string): void {
    this.socket.emit("create_user", username);
    console.log(`User ${username} created.`);
  }

  public joinRoom(roomName: string): void {
    this.socket.emit("join_room", roomName);
    console.log(`User joined room ${roomName}.`);
  }

  public onReceiveMessage(callback: (message: Message) => void): void {
    this.socket.on("receive_message", (message) => {
      callback(message);
      console.log(`User ${message.author} sent a message: ${message.content}`);
    });
  }

  public sendMessage(roomName: string, message: string): void {
    this.socket.emit("send_message", roomName, message);
    console.log(`User sent a message to room ${roomName}: ${message}`);
  }

  public onUserJoined(callback: (user: string) => void): void {
    this.socket.on("user_joined_room", (user) => {
      callback(user);
      console.log(`User ${user} joined the room.`);
    });
  }

  public onUserAlreadyExists(callback: (user: string) => void): void {
    this.socket.on("user_already_exists", (user) => {
      callback(user);
      console.error(`User ${user} already exists.`);
    });
  }

  public onUserLeft(callback: (user: string) => void): void {
    this.socket.on("user_left_room", (user) => {
      callback(user);
      console.log(`User ${user} left the room.`);
    });
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  public offFromRoom(roomName: string): void {
    this.socket.off(roomName);
  }
}

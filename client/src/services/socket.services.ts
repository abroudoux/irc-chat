import { Socket, io } from "socket.io-client";

import { Message } from "@/utils/interfaces";

export default class SocketService {
  public static instance: SocketService = new SocketService();
  private socket: Socket;
  private socketUrl: string = "http://localhost:3000";

  public constructor() {
    this.socket = io(this.socketUrl);
  }

  public static getInstance(): SocketService {
    return this.instance;
  }

  public getSocket(): Socket {
    return this.socket;
  }

  public getSocketUrl(): string {
    return this.socketUrl;
  }

  public createUser(username: string): void {
    this.socket.emit("create_user", username);
  }

  public joinRoom(roomName: string): void {
    this.socket.emit("join_room", roomName);
  }

  public onReceiveMessage(callback: (message: Message) => void): void {
    this.socket.on("receive_message", (message) => {
      callback(message);
    });
  }

  public sendMessage(roomName: string, message: string): void {
    this.socket.emit("send_message", roomName, message);
  }

  public onUserJoined(callback: (user: string) => void): void {
    this.socket.on("user_joined_room", (user) => {
      callback(user);
    });
  }

  public onUserAlreadyExists(callback: (user: string) => void): void {
    this.socket.on("user_already_exists", (user) => {
      console.log("oups");
      callback(user);
    });
  }

  public onUserLeft(callback: (user: string) => void): void {
    this.socket.on("user_left_room", (user) => {
      callback(user);
    });
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  public offFromRoom(roomName: string): void {
    this.socket.off(roomName);
  }
}

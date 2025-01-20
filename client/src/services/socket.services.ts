import { Socket, io } from "socket.io-client";

import { Message } from "@/utils/interfaces";

export default class SocketService {
  public socket: Socket;
  public static instance: SocketService = new SocketService();
  private socketUrl: string = "http://localhost:3000";

  public constructor() {
    this.socket = io(this.socketUrl);
  }

  public getSocketUrl(): string {
    return this.socketUrl;
  }

  public joinRoom(username: string, roomName: string): void {
    this.socket.emit("join_room", { username, roomName });
  }

  public onReceiveMessage(callback: (message: Message) => void): void {
    this.socket.on("receive_message", (message) => {
      callback(message);
    });
  }

  public sendMessage(roomName: string, author: string, content: string): void {
    const message: Message = {
      author: author,
      content: content,
    };
    this.socket.emit("send_message", {
      roomName: roomName,
      author: message.author,
      content: message.content,
    });
  }

  public onUserJoined(callback: (user: string) => void): void {
    this.socket.on("user_joined_room", (user) => {
      callback(user);
    });
  }

  public onUserAlreadyExists(callback: (user: string) => void): void {
    this.socket.on("user_already_exists", (user) => {
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

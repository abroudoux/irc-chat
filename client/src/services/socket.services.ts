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

  public joinHelloRoom(username: string): void {
    console.log("Joining hello room");
    this.socket.emit("join_hello_room", username);
  }

  public joinRoom(username: string, roomName: string): void {
    console.log(`Joining ${roomName} room`);
    this.socket.emit("join_room", { username, roomName });
  }

  public onReceiveMessage(callback: (message: Message) => void): void {
    this.socket.on("receive_message", (message) => {
      callback(message);
    });
  }

  public onReceiveLogs(callback: (log: string) => void): void {
    this.socket.on("receive_logs", (log) => {
      callback(log);
    });
  }

  public sendMessage(username: string, message: string): void {
    this.socket.emit("send_message", { author: username, content: message });
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  public onUserJoined(callback: (users: string) => void): void {
    this.socket.on("joined_hello_room", (user) => {
      callback(user);
    });
  }
}

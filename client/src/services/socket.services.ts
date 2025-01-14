import { Socket, io } from "socket.io-client";

import { Message } from "@/utils/interfaces";

export default class SocketService {
  public socket: Socket;
  public static instance: SocketService = new SocketService();

  public constructor() {
    this.socket = io("http://localhost:3000");
  }

  public static getInstance(): SocketService {
    return this.instance;
  }

  public joinHelloRoom(username: string): void {
    this.socket.emit("join_hello_room", username);
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
}

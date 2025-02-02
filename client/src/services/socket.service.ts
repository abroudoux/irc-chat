import { Socket, io } from "socket.io-client";

import { Message } from "@/utils/interfaces";

export default class SocketService {
  public static instance: SocketService = new SocketService();
  private socketUrl: string;
  private socket: Socket;
  private username: string;
  private currentRoom: string | null = null;

  private constructor() {
    this.socketUrl = "http://localhost:3000";
    this.socket = io(this.socketUrl);
    this.username = "";
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

  public getUsername(): string {
    return this.username;
  }

  public setUserName(username: string): void {
    this.username = username;
  }

  public getCurrentRoom(): string | null {
    return this.currentRoom;
  }

  public setCurrentRoom(roomName: string): void {
    this.currentRoom = roomName;
  }

  public connect(): void {
    this.socket.connect();
  }

  public joinRoom(roomName: string): void {
    if (this.currentRoom !== roomName) {
      if (this.currentRoom) {
        this.offFromRoom(this.currentRoom);
      }
      this.currentRoom = roomName;
      this.socket.emit("join_room", this.getUsername(), roomName);
    }
  }

  public onReceiveMessage(callback: (message: Message) => void): void {
    this.socket.on("receive_message", (message) => {
      console.log(
        `Received message from ${message.author}: ${message.content}`
      );
      callback(message);
    });
  }

  public sendMessage(
    username: string,
    roomName: string,
    message: string
  ): void {
    console.log(`Sending message to room ${roomName}: ${message}`);
    this.socket.emit("send_message", username, roomName, message);
  }

  public onUserLeft(callback: (user: string) => void): void {
    this.socket.on("user_left_room", (user) => {
      callback(user);
      console.log(`User ${user} left the room.`);
    });
  }

  public disconnect(): void {
    this.socket.emit("disconnect_user", this.getUsername());
    this.socket.disconnect();
  }

  public offFromRoom(roomName: string): void {
    if (this.currentRoom === roomName) {
      this.socket.emit("leave_room", this.getUsername(), roomName);
      this.currentRoom = null;
    }
  }
}

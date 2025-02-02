import http from "http";
import { Express } from "express";

import Application from "./application";
import SocketService from "../services/socket.service";
import HttpService from "../services/http.service";
import UserService from "../services/user.service";
import RoomService from "../services/room.service";

export default class Server {
  private clientUrl: string;
  private application: Application;
  public server: http.Server;
  private userService: UserService;
  private roomService: RoomService;
  private socketService: SocketService;
  private httpService: HttpService;

  public constructor(clientUrl: string) {
    this.clientUrl = clientUrl;
    this.application = new Application();
    this.server = http.createServer(this.application.getApp());
    this.userService = new UserService();
    this.roomService = new RoomService();
    this.socketService = new SocketService(
      this.server,
      [this.clientUrl],
      this.userService,
      this.roomService
    );
    this.socketService.init();
    this.httpService = new HttpService(this.userService, this.roomService);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    const application: Express = this.application.getApp();

    application.get("/api/users", (req, res) => {
      this.httpService.getUsers(req, res);
    });

    application.get("/api/users/:username/rooms", (req, res) => {
      this.httpService.getRoomsOfUser(req, res);
    });

    application.get("/api/users/:roomName", (req, res) => {
      this.httpService.getUsersInRoom(req, res);
    });

    application.get("/api/rooms", (req, res) => {
      this.httpService.getRooms(req, res);
    });

    application.post("/api/rooms/create/:roomName", (req, res) => {
      this.httpService.createRoom(req, res);
    });

    application.delete("/api/rooms/delete/:roomName", (req, res) => {
      this.httpService.deleteRoom(req, res);
    });

    application.get("/api/users/:username", (req, res) => {
      this.httpService.isUsernameAlreadyUsed(req, res);
    });

    application.get("/api/auth/:username", (req, res) => {
      this.httpService.connectUser(req, res);
      const user = this.httpService.getUserConnected();
    });
  }

  public listen(port: number) {
    this.server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  }
}

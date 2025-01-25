import { Express } from "express";
import http from "http";

import SocketService from "../services/socket.service";

export default class Server {
  public server: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >;
  private clientUrl: string;
  private socketService: SocketService;

  public constructor(application: Express, clientUrl: string) {
    this.clientUrl = clientUrl;
    this.server = http.createServer(application);
    this.socketService = new SocketService(this.server, [this.clientUrl]);
  }

  public listen(port: number) {
    this.server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  }
}

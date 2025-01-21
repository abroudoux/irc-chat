import express, { Express, Request, Response } from "express";
import http from "http";
import cors from "cors";

import SocketService from "./services/socket.service";

const PORT = 3000;
const app: Express = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const _ = new SocketService(server);

app.get("/hello", (_: Request, res: Response) => {
  res.send("Hello World");
});

server.listen(PORT, () => {
  console.log(`Server is listening on *:${PORT}`);
});

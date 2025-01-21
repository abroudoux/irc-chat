import express, { Express } from "express";
import http from "http";
import cors from "cors";

import SocketService from "./services/socket.service";

const PORT: number = 3000;
const CLIENT_URL: string = "http://localhost:5173";
const app: Express = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const _ = new SocketService(server, [CLIENT_URL]);

server.listen(PORT, () => {
  console.log(`Server is listening on *:${PORT}`);
});

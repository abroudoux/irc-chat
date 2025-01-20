import express from "express";
import http from "http";
import cors from "cors";

import SocketService from "./src/services/socket.service.mjs";

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const _ = new SocketService(server);

server.listen(PORT, () => {
  console.log(`Server is listening on *:${PORT}`);
});

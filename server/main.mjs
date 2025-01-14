import express from "express";
import http from "http";
import cors from "cors";

import UserService from "./src/services/user.services.mjs";
import RoomService from "./src/services/room.services.mjs";
import SocketService from "./src/services/socket.services.mjs";

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const socketService = new SocketService(server);

server.listen(PORT, () => {
  console.log(`Server is listening on *:${PORT}`);
});

app.get(`/users/username/:username`, (req, res) => {
  // const { username } = req.params;
  // const userExists = connectedUsers.has(username);
  // return res.json({ isUsernameAvailable: userExists });
  return res.json({ isUsernameAvailable: false });
});

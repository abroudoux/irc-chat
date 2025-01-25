import Server from "./classes/server";

const PORT: number = 3000;
const CLIENT_URL: string = "http://localhost:5173";

const server: Server = new Server(CLIENT_URL);

server.listen(PORT);

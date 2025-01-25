import Application from "./classes/application";
import Server from "./classes/server";

const PORT: number = 3000;
const CLIENT_URL: string = "http://localhost:5173";

const application: Application = new Application();
const server: Server = new Server(application.getApp(), CLIENT_URL);

server.listen(PORT);

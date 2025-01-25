import express, { Express, Router } from "express";
import cors from "cors";

export default class Application {
  private app: Express;
  private apiRouter: Router;

  public constructor() {
    this.app = express();
    this.apiRouter = Router();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    this.apiRouter.get("/users", this.getUsers);
    this.apiRouter.post("/users", this.createUser);
    this.app.use("/api", this.apiRouter);
  }

  private getUsers(req: express.Request, res: express.Response): void {
    res.json({ users: "users" });
  }

  private createUser(req: express.Request, res: express.Response): void {
    res.json({ message: "Utilisateur créé" });
  }

  public getApp(): Express {
    return this.app;
  }

  public listen(port: number, callback?: () => void): void {
    this.app.listen(port, callback);
  }
}

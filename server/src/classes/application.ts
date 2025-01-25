import express, { Express } from "express";
import cors from "cors";

export default class Application {
  private application: Express;

  public constructor() {
    this.application = express();
    this.initializeMiddlewares();
  }

  public getApp(): Express {
    return this.application;
  }

  private initializeMiddlewares(): void {
    this.application.use(cors());
    this.application.use(express.json());
  }
}

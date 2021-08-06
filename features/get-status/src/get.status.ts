import express from "express";
import { IFeature } from "@sebastian/interfaces";

export class GetStatus implements IFeature {
  // TODO: Extract express to http module
  constructor(private readonly port: number) {}

  public async init(): Promise<void> {
    const server = express();
    server.get("/", (req, res) => {
      res.send("I'm alive. Everything should be ok.");
    });
    server.listen(this.port, () => {
      console.log("Server has been started");
    });
  }
}

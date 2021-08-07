import { Exception } from "@sebastian/errors";
import { connect } from "mongoose";
import { LeagueOfLegendsUsersRepo } from "./collections/league-of-legends-users";
import { MongoDBConfig } from "./types";

export class MongoDBClient {
  private static instance: MongoDBClient;

  public readonly leagueOfLegendsUsersRepo!: LeagueOfLegendsUsersRepo;

  constructor(private readonly config: MongoDBConfig) {
    if (MongoDBClient.instance) {
      return MongoDBClient.instance;
    }

    this.leagueOfLegendsUsersRepo = new LeagueOfLegendsUsersRepo();
    MongoDBClient.instance = this;
  }

  public async connect(): Promise<void> {
    try {
      await connect(this.config.url, {
        user: this.config.username,
        pass: this.config.password,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      return Exception(err);
    }
  }
}

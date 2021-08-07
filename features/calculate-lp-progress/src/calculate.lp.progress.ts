import { IFeature } from "@sebastian/interfaces";
import { doEither } from "@sebastian/packages/eithers";
import { MongoDBClient } from "@sebastian/packages/mongodb-client";
import { RiotClient } from "@sebastian/packages/riot-client";
import { Sebastian } from "@sebastian/packages/sebastian";
import { Client } from "discord.js";
import { Right } from "monet";
import { CronJobPullLp } from "./cron.job.pull.lp";

export class CalculateLpProgress implements IFeature {
  constructor(
    private readonly sebastian: Sebastian,
    private readonly discordClient: Client,
    private readonly cronJobPull: CronJobPullLp,
    private readonly riotClient: RiotClient,
    private readonly mongoDbClient: MongoDBClient
  ) {}

  public async init(): Promise<void> {
    this.discordClient.on("message", async (message) => {
      if (await this.sebastian.isRequest(message.content, message.channel)) {
        if (this.sebastian.request.isWatchRule(message.content)) {
          const request = this.sebastian.request.parse(message.content);
          if (request.watch.place.toLowerCase() === "league of legends") {
            for (const username of request.watch.targets) {
              const result = await doEither<any, any>(async (run) => {
                const encryptedUsername = run(
                  await this.riotClient.summonerQueries.getEncryptedUserIdByUserName(username)
                );
                const lp = run(await this.riotClient.summonerQueries.getLPByEncryptedUserId(encryptedUsername));
                run(
                  await this.mongoDbClient.leagueOfLegendsUsersRepo.create({
                    encryptedUsername: encryptedUsername,
                    lp,
                    username: username,
                  })
                );
                await this.cronJobPull.createCronJob({ discordUsername: username, encryptedUsername });
                return Right(undefined);
              });
              if (result.isLeft()) {
                throw result.left();
              }
            }
          }
        }
      }
    });
  }
}

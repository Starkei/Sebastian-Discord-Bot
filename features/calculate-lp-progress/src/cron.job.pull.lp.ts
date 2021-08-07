import { Client, DMChannel, NewsChannel, TextChannel } from "discord.js";
import { Right } from "monet";
import { CompactValidationError } from "@sebastian/errors";
import { CronJobClient } from "@sebastian/packages/cron-job-client";
import { ICronJob } from "@sebastian/packages/cron-job-client/types";
import { doEither } from "@sebastian/packages/eithers";
import { MongoDBClient } from "@sebastian/packages/mongodb-client";
import { LolUserNotFoundError } from "@sebastian/packages/mongodb-client/collections/league-of-legends-users/errors";
import { RiotClient } from "@sebastian/packages/riot-client";
import { RiotWrongCredentialsError } from "@sebastian/packages/riot-client/errors";
import { NotFoundEncryptedUserIDError } from "@sebastian/packages/riot-client/summoner-queries";
import { Sebastian } from "@sebastian/packages/sebastian";
import { PullLpConfig, PullLpDependencies } from "../types";
import { AsyncEither } from "@sebastian/types";
import { CronJobAlreadyExistsError } from "@sebastian/packages/mongodb-client/collections/cron-jobs/errors";
import { hardTextChannelFromClientById } from "@sebastian/hard-fetchers";

export class CronJobPullLp implements ICronJob {
  public readonly name: string = "CronJobPullLp";
  public readonly configuration: { infinity: boolean; time: number | Date };

  private readonly channelPromise: Promise<TextChannel | DMChannel | NewsChannel>;

  constructor(
    config: PullLpConfig,
    discordClient: Client,
    private readonly sebastian: Sebastian,
    private readonly cronJobClient: CronJobClient,
    private readonly riotClient: RiotClient,
    private readonly mongoDbClient: MongoDBClient
  ) {
    this.configuration = {
      infinity: config.infinity,
      time: config.time,
    };
    this.channelPromise = hardTextChannelFromClientById(discordClient, config.lolChannelId);
  }

  public async createCronJob(dependencies: PullLpDependencies): Promise<void> {
    const result = await doEither<CronJobAlreadyExistsError, void>(async (run) => {
      const timeInMs =
        typeof this.configuration.time === "number" ? this.configuration.time : this.configuration.time.getTime();

      const id = run(
        await this.cronJobClient.persistCronJob({
          dependencies,
          managerName: this.name,
          infinity: this.configuration.infinity,
          timeInMs,
        })
      );

      const callback = async (): Promise<void> => {
        const result = await this.doJob(dependencies);
        if (result.isLeft()) {
          throw result.left();
        }
      };

      run(await this.cronJobClient.schedule({ infinity: this.configuration.infinity, callback, timeInMs, jobId: id }));
      return Right(undefined);
    });
    if (result.isLeft()) {
      throw result.left();
    }
  }

  private async doJob(
    dependencies: PullLpDependencies
  ): AsyncEither<
    LolUserNotFoundError | RiotWrongCredentialsError | NotFoundEncryptedUserIDError | CompactValidationError,
    void
  > {
    return doEither(async (run) => {
      const oldLp = run(
        await this.mongoDbClient.leagueOfLegendsUsersRepo.getLpByEncryptedUserId(dependencies.encryptedUsername)
      );
      const lp = run(await this.riotClient.summonerQueries.getLPByEncryptedUserId(dependencies.encryptedUsername));
      const progress = lp - oldLp;
      const progressText = progress < 0 ? `-${progress}Lp` : progress > 0 ? `+${progress}Lp` : `${progress}Lp`;
      const channel = await this.channelPromise;

      const directProgress = this.sebastian.directSpeech
        .makeProgress(dependencies.discordUsername, progressText)
        .dot()
        .complete();

      const politeProgress = this.sebastian.politenessSpeech
        .makeProgress(progress < 0 ? "негативный" : progress > 0 ? "положительный" : "нейтральный", directProgress)
        .dot()
        .complete();
      await channel.send(politeProgress);
      await this.mongoDbClient.leagueOfLegendsUsersRepo.update(
        { encryptedUsername: dependencies.encryptedUsername },
        { lp }
      );
      return Right(undefined);
    });
  }
}

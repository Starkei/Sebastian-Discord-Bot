import { Exception } from "@sebastian/errors";
import { AsyncEither } from "@sebastian/types";
import { Right } from "monet";
import { MongoDBClient } from "../mongodb-client";
import { CronJobAlreadyExistsError } from "../mongodb-client/collections/cron-jobs/errors";
import { CronJobEntity } from "../mongodb-client/collections/cron-jobs/models";
import { CronJobScheduleConfig, ICronJob } from "./types";

export class CronJobClient {
  private readonly managers: Map<string, ICronJob> = new Map();

  constructor(private readonly mongoDbClient: MongoDBClient) {}

  public async schedule(config: CronJobScheduleConfig): AsyncEither<CronJobAlreadyExistsError, void> {
    if (config.infinity) {
      setInterval(config.callback, config.timeInMs);
    } else {
      setTimeout(async () => {
        await config.callback();
        await this.purgeCronJob(config.jobId);
      }, config.timeInMs);
    }
    return Right(undefined);
  }

  public async restore(): Promise<void> {
    // TODO: Add transaction
    const jobs = await this.mongoDbClient.cronJobsRepo.getAll();
    for (const job of jobs) {
      const manager = this.managers.get(job.managerName);
      if (!manager) {
        return Exception(`Manager ${job.managerName} is not registered`);
      }
      await this.mongoDbClient.cronJobsRepo.delete({ _id: job._id });
      await manager.createCronJob(job.dependencies, this);
    }
  }

  public register(managerName: string, instance: ICronJob): void {
    this.managers.set(managerName, instance);
  }

  public persistCronJob(job: Omit<CronJobEntity, "_id">): AsyncEither<CronJobAlreadyExistsError, string> {
    return this.mongoDbClient.cronJobsRepo.create(job);
  }

  public purgeCronJob(id: string): Promise<void> {
    return this.mongoDbClient.cronJobsRepo.delete({ _id: id });
  }
}

import { Exception } from "@sebastian/errors";
import { AsyncEither } from "@sebastian/types";
import { Right } from "monet";
import { doEither } from "../eithers";
import { MongoDBClient } from "../mongodb-client";
import { CronJobAlreadyExistsError } from "../mongodb-client/collections/cron-jobs/errors";
import { CronJobEntity } from "../mongodb-client/collections/cron-jobs/models";
import { CronJobDependencies, CronJobScheduleConfig, ICronJob } from "./types";

export class CronJobClient {
  private readonly managers: Map<string, { instance: ICronJob; dependencies: CronJobDependencies }> = new Map();

  constructor(private readonly mongoDbClient: MongoDBClient) {}

  public async schedule(config: CronJobScheduleConfig): AsyncEither<CronJobAlreadyExistsError, void> {
    return doEither(async (run) => {
      const { callback, infinity, managerName, time } = config;
      const manager = this.managers.get(managerName);
      if (manager === undefined) {
        return Exception(`Manager ${managerName} is not registered`);
      }

      const timeInMs = typeof time === "number" ? time : time.getTime();
      const id = run(
        await this.persistCronJob({ dependencies: manager.dependencies, infinity, managerName, timeInMs })
      );
      if (infinity) {
        setInterval(callback, timeInMs);
      } else {
        setTimeout(async () => {
          await callback();
          this.purgeCronJob(id);
        }, timeInMs);
      }
      return Right(undefined);
    });
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
      await manager.instance.createCronJob(manager.dependencies);
    }
  }

  public register(
    managerName: string,
    instance: ICronJob,
    dependencies: Omit<CronJobDependencies, "infinity" | "time">
  ): void {
    this.managers.set(managerName, { instance, dependencies: { ...dependencies, ...instance.configuration } });
  }

  private persistCronJob(job: Omit<CronJobEntity, "_id">): AsyncEither<CronJobAlreadyExistsError, string> {
    return this.mongoDbClient.cronJobsRepo.create(job);
  }

  private purgeCronJob(id: string): Promise<void> {
    return this.mongoDbClient.cronJobsRepo.delete({ _id: id });
  }
}

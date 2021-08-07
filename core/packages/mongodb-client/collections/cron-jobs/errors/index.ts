import { FilterQuery } from "mongoose";
import { CronJobEntity } from "../models";

export class CronJobNotFoundError extends Error {
  constructor(filter?: FilterQuery<CronJobEntity>) {
    super(`Cron job not found. Details: ${filter}`);
  }
}

export class CronJobAlreadyExistsError extends Error {
  constructor(entity: CronJobEntity) {
    super(`Cron job already exists. Details: ${entity}`);
  }
}

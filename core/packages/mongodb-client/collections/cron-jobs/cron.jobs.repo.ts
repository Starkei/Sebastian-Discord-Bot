import { FilterQuery } from "mongoose";
import { CommonRepo } from "../common.repo";
import { CronJobAlreadyExistsError, CronJobNotFoundError } from "./errors";
import { CronJobEntity, CronJobModel } from "./models";

export class CronJobsRepo extends CommonRepo<CronJobEntity, CronJobNotFoundError, CronJobAlreadyExistsError> {
  constructor() {
    super(CronJobModel);
  }

  protected makeNotFoundError(filter?: FilterQuery<CronJobEntity>): CronJobNotFoundError {
    return new CronJobNotFoundError(filter);
  }

  protected makeAlreadyExistsError(entity: CronJobEntity): CronJobAlreadyExistsError {
    return new CronJobAlreadyExistsError(entity);
  }
}

import { model, Schema } from "mongoose";
import { CronJobDependencies } from "@sebastian/packages/cron-job-client/types";

export interface CronJobEntity {
  _id: string;
  infinity: boolean;
  timeInMs: number;
  managerName: string;
  dependencies: CronJobDependencies;
}

const schema = new Schema<CronJobEntity>({
  infinity: { type: Boolean, required: true },
  timeInMs: { type: Number, required: true },
  managerName: { type: String, required: true },
  dependencies: { any: Object },
});

export const CronJobModel = model<CronJobEntity>("CronJob", schema);

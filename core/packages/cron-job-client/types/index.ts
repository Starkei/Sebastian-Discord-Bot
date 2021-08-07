import { CronJobClient } from "../cron.job.client";

export type ICronJobCallback = () => Promise<void>;

export interface ICronJob {
  readonly configuration: {
    infinity: boolean;
    time: number | Date;
  };
  createCronJob(dependencies: CronJobDependencies, cronJobClient?: CronJobClient): Promise<void>;
}

export type CronJobDependencies = {
  infinity: boolean;
  time: number | Date;
  [key: string]: number | string | boolean | Date;
};

export type CronJobScheduleConfig = {
  infinity: boolean;
  time: number | Date;
  managerName: string;
  callback: ICronJobCallback;
};

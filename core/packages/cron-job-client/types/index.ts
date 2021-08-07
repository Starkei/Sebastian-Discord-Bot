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
  [key: string]: number | string | boolean | Date;
};

export type CronJobScheduleConfig =
  | {
      infinity: false;
      timeInMs: number;
      callback: ICronJobCallback;
      jobId: string;
    }
  | {
      infinity: true;
      timeInMs: number;
      callback: ICronJobCallback;
    };

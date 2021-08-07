import { CronJobDependencies } from "@sebastian/packages/cron-job-client/types";

export type PullLpDependencies = CronJobDependencies & {
  discordUsername: string;
  encryptedUsername: string;
};

export type CalculateLpProgressConfig = {
  generalChannelId: string;
};

export type PullLpConfig = {
  lolChannelId: string;
  infinity: true;
  time: number;
};

import { assert } from "console";
import { PullLpConfig } from "../features/calculate-lp-progress/types";

export function collectCronJobPullLpConfig(): PullLpConfig {
  const lolChannelId: string = String(process.env.PULL_LP_CHANNEL_ID);
  assert(lolChannelId !== "undefined", "League of legends channel id is not defined");

  const time: number = Number(process.env.PULL_LP_PERIOD_IN_MS);
  assert(!Number.isFinite(time), "Pull lp period time is is not defined");

  return {
    infinity: true,
    lolChannelId,
    time,
  };
}

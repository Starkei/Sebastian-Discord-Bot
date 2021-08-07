import { assert } from "console";
import { Client } from "discord.js";
import { config } from "dotenv";
import { resolve } from "path/posix";
import { FeatureFactory } from "@sebastian/packages/feature-factory";
import { Sebastian } from "@sebastian/packages/sebastian";
import { MongoDBClient } from "@sebastian/packages/mongodb-client";
import { CronJobClient } from "@sebastian/packages/cron-job-client/cron.job.client";
import { CalculateLpProgress, CronJobPullLp } from "./features/calculate-lp-progress";
import { RiotClient } from "@sebastian/packages/riot-client";
import { Exception } from "@sebastian/errors";
import {
  collectMongoDbConfig,
  collectOnStartupGreetingConfig,
  collectRiotClientConfig,
  collectSexualContextMoverConfig,
} from "./config-collect-methods";
import { GetStatus } from "./features/get-status/src/get.status";
import { SexualContextMover, StartupGreeting } from "./features";

config({ path: resolve(".env") });

const discordClientSecret: string | undefined = process.env.DISCORD_TOKEN;
assert(discordClientSecret, "Discord client secret isn't set");

const port: number = Number(process.env.PORT);
assert(!Number.isFinite(port), "Port is not defined");

async function startApp() {
  const client = new Client();

  const mongoDbClient = new MongoDBClient(collectMongoDbConfig());

  const riotClient = new RiotClient(collectRiotClientConfig());

  await client.login(discordClientSecret);

  await mongoDbClient.connect();

  if (!(await riotClient.verifyApiToken())) {
    return Exception(`Token is expired`);
  }

  const cronJobClient = new CronJobClient(mongoDbClient);

  const cronJobPullLp = new CronJobPullLp(
    { infinity: true, time: 1000 * 60 * 60 * 24, lolChannelId: "778922860596953089" },
    client,
    new Sebastian(),
    cronJobClient,
    riotClient,
    mongoDbClient
  );

  cronJobClient.register(cronJobPullLp.name, cronJobPullLp);

  cronJobClient.restore();

  const features = new FeatureFactory([
    new SexualContextMover(new Sebastian(), client, collectSexualContextMoverConfig()),
    new StartupGreeting(client, collectOnStartupGreetingConfig()),
    new GetStatus(port),
    new CalculateLpProgress(new Sebastian(), client, cronJobPullLp, riotClient, mongoDbClient),
  ]);
  await features.init();
}

startApp().catch((err) => {
  console.log(err);
  process.exit(1);
});

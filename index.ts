import { assert } from "console";
import { Client } from "discord.js";
import { config } from "dotenv";
import { resolve } from "path/posix";
import { FeatureFactory } from "@sebastian/packages/feature-factory";
import { Sebastian } from "@sebastian/packages/sebastian";
import {
  collectMongoDbConfig,
  collectOnStartupGreetingConfig,
  collectSexualContextMoverConfig,
} from "./config-collect-methods";
import { SexualContextMover, StartupGreeting } from "./features";
import { GetStatus } from "./features/get-status/src/get.status";
import { MongoDBClient } from "@sebastian/packages/mongodb-client";
import { CronJobClient } from "@sebastian/packages/cron-job-client/cron.job.client";

config({ path: resolve(".env") });

const discordClientSecret: string | undefined = process.env.DISCORD_TOKEN;
assert(discordClientSecret, "Discord client secret isn't set");

const port: number = Number(process.env.PORT);
assert(!Number.isFinite(port), "Port is not defined");

async function startApp() {
  const client = new Client();

  const mongoDbClient = new MongoDBClient(collectMongoDbConfig());

  await client.login(discordClientSecret);

  await mongoDbClient.connect();

  const cronJobClient = new CronJobClient(mongoDbClient);
  //cronJobClient.register("TestManager", manager, {});

  cronJobClient.restore();

  const features = new FeatureFactory([
    new SexualContextMover(new Sebastian(), client, collectSexualContextMoverConfig()),
    new StartupGreeting(client, collectOnStartupGreetingConfig()),
    new GetStatus(port),
  ]);
  await features.init();
}

startApp().catch((err) => {
  console.log(err);
  process.exit(1);
});

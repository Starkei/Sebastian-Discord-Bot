import { assert } from "console";
import { Client } from "discord.js";
import { config } from "dotenv";
import { resolve } from "path/posix";
import { FeatureFactory } from "@sebastian/packages/feature-factory";
import { Sebastian } from "@sebastian/packages/sebastian";
import { collectOnStartupGreetingConfig, collectSexualContextMoverConfig } from "./config-collect-methods";
import { SexualContextMover, StartupGreeting } from "./features";

config({ path: resolve(".env") });

const discordClientSecret: string | undefined = process.env.DISCORD_TOKEN;
assert(discordClientSecret, "Discord client secret isn't set");

async function startApp() {
  const client = new Client();
  await client.login(discordClientSecret);
  const features = new FeatureFactory([
    new SexualContextMover(new Sebastian(), client, collectSexualContextMoverConfig()),
    new StartupGreeting(client, collectOnStartupGreetingConfig()),
  ]);
  await features.init();
}

startApp().catch((err) => {
  console.log(err);
  process.exit(1);
});

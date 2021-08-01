import { assert } from "console";
import { Client } from "discord.js";
import { config } from "dotenv";
import { resolve } from "path/posix";
import { FeatureFactory, Sebastian } from "./core";
import { SexualContextMover, StartupGreeting } from "./features";

config({ path: resolve(".env") });

const discordClientSecret: string | undefined = process.env.DISCORD_TOKEN;
assert(discordClientSecret, "Discord client secret isn't set");

async function startApp() {
  const client = new Client();
  await client.login(discordClientSecret);
  const features = new FeatureFactory([
    new SexualContextMover(new Sebastian(), client, {
      apologizeTimeInMs: 5000,
      emojiIdentifier: "%F0%9F%91%80",
      sexualChannelId: "870964799578710036",
    }),
    new StartupGreeting(client, {
      generalChannelId: "699215654057803809",
      greetingTimeInMs: 20000,
    }),
  ]);
  await features.init();
}

startApp().catch((err) => {
  console.log(err);
  process.exit(1);
});

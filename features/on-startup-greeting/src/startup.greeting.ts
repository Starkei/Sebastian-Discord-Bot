import { v4 as uuid } from "uuid";
import { Client, DMChannel, NewsChannel, TextChannel } from "discord.js";
import { IFeature } from "../../../core/interfaces";
import { OnStartupGreetingConfig } from "../types";
import { hardTextChannelFromClientById } from "@sebastian/hard-fetchers";

export class StartupGreeting implements IFeature {
  private readonly channelPromise: Promise<TextChannel | DMChannel | NewsChannel>;
  constructor(private readonly client: Client, private readonly config: OnStartupGreetingConfig) {
    this.channelPromise = hardTextChannelFromClientById(client, config.generalChannelId);
  }

  public async init(): Promise<void> {
    this.client.on("ready", () => this.onStartupGreet());
  }

  private async onStartupGreet(): Promise<void> {
    console.log(`Session has been started ${uuid()}`);
    const channel = await this.channelPromise;
    const greetingMessage = await channel.send(`Доброго времени суток, я снова здесь`);
    setTimeout(async () => {
      await greetingMessage.channel.messages.delete(greetingMessage);
    }, this.config.greetingTimeInMs);
  }
}

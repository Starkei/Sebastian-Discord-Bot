import { Client, DMChannel, MessageReaction, NewsChannel, TextChannel } from "discord.js";
import { IFeature } from "../../../core/interfaces";
import { hardTextChannelFromClientById, Sebastian } from "../../../core";
import { SexualContextMoverConfig } from "../types";

export class SexualContextMover implements IFeature {
  private sexualChannelPromise: Promise<TextChannel | DMChannel | NewsChannel>;

  constructor(
    private readonly sebastian: Sebastian,
    private readonly client: Client,
    private readonly config: SexualContextMoverConfig
  ) {
    this.sexualChannelPromise = hardTextChannelFromClientById(this.client, this.config.sexualChannelId);
  }

  public async init(): Promise<void> {
    this.client.on("messageReactionAdd", (reaction) => this.onReactionAdd(reaction));
  }

  private async onReactionAdd(reaction: MessageReaction): Promise<void> {
    const channel = await this.sexualChannelPromise;
    const emojiIdentifier = reaction.emoji.identifier;
    if (
      emojiIdentifier !== this.config.emojiIdentifier ||
      reaction.message.channel.id === this.config.sexualChannelId
    ) {
      return;
    }

    const content = reaction.message.content;
    const authorName = reaction.message.author.username;
    const attachments = Array.from(reaction.message.attachments.values());
    const sebastianDirectSpeech = this.sebastian.directSpeech.makeDirectSpeech(authorName, content).complete();
    const sebastianApologize = this.sebastian.politenessSpeech.makeActionMorePolite("переместить это").complete();
    const apologizeMessage = await reaction.message.channel.send(sebastianApologize);
    setTimeout(async () => {
      await channel.send({ content: sebastianDirectSpeech, files: attachments });
      await reaction.message.delete();
      await apologizeMessage.delete();
    }, this.config.apologizeTimeInMs);
  }
}

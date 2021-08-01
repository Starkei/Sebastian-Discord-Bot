import { InvalidChannelTypeError } from "@sebastian/errors";
import { Channel, DMChannel, NewsChannel, TextChannel } from "discord.js";

export function hardMapFromChannel(channel: Channel): TextChannel | DMChannel | NewsChannel {
  if (channel.isText()) {
    return channel;
  }
  throw new InvalidChannelTypeError("text", channel.type);
}

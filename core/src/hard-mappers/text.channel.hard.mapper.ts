import { Channel, DMChannel, NewsChannel, TextChannel } from "discord.js";
import { InvalidChannelTypeError } from "../../errors";

export function hardMapFromChannel(channel: Channel): TextChannel | DMChannel | NewsChannel {
  if (channel.isText()) {
    return channel;
  }
  throw new InvalidChannelTypeError("text", channel.type);
}

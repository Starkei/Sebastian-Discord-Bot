import { ChannelNotFoundError } from "@sebastian/errors";
import { Client, DMChannel, NewsChannel, TextChannel } from "discord.js";
import { hardMapFromChannel } from "../hard-mappers";

export async function hardTextChannelFromClientById(
  client: Client,
  channelId: string
): Promise<TextChannel | DMChannel | NewsChannel> {
  const channel = client.channels.cache.get(channelId);
  if (channel) {
    return hardMapFromChannel(channel);
  }
  return hardFetchTextChannelFromClientById(client, channelId);
}

export async function hardFetchTextChannelFromClientById(
  client: Client,
  channelId: string
): Promise<TextChannel | DMChannel | NewsChannel> {
  const channel = await client.channels.fetch(channelId);
  if (channel) {
    return hardMapFromChannel(channel);
  }
  throw new ChannelNotFoundError(channelId);
}

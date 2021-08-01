import { RiotClientConfig } from "@sebastian/packages/riot-client";
import { assert } from "console";
import { OnStartupGreetingConfig } from "../features/on-startup-greeting";
import { SexualContextMoverConfig } from "../features/sexual-context-moving";

export function collectRiotClientConfig(): RiotClientConfig {
  const apiBaseUrl: string = String(process.env.RIOT_API_BASE_URL);
  assert(apiBaseUrl !== "undefined", "Api base url is not defined");

  const apiToken: string = String(process.env.RIOT_TOKEN);
  assert(apiToken !== "undefined", "Api token is not defined");

  const getEncryptedUserIdByUserNameEndpoint: string = String(process.env.GET_ENCRYPTED_USER_ID_BY_USER_NAME_ENDPOINT);
  assert(
    getEncryptedUserIdByUserNameEndpoint !== "undefined",
    "Get encrypted user id by user name endpoint is not defined"
  );

  const getUserLPbyEncryptedUserId: string = String(process.env.GET_USER_LP_BY_ENCRYPTED_USER_ID);
  assert(getUserLPbyEncryptedUserId !== "undefined", "Get user LP by encrypted user id is not defined");

  return {
    apiBaseUrl,
    apiToken,
    getEncryptedUserIdByUserNameEndpoint,
    getUserLPbyEncryptedUserId,
  };
}

export function collectSexualContextMoverConfig(): SexualContextMoverConfig {
  const apologizeTimeInMs: number = Number(process.env.APOLOGIZE_TIME_IN_MS);
  assert(!Number.isFinite(apologizeTimeInMs), "Apologize time in ms is not defined");

  const emojiIdentifier: string = String(process.env.SEXUAL_EMOJI_IDENTIFIER);
  assert(emojiIdentifier !== "undefined", "Emoji identifier is not defined");

  const sexualChannelId: string = String(process.env.SEXUAL_CHANNEL_ID);
  assert(sexualChannelId !== "undefined", "Sexual channel id is not defined");

  return {
    apologizeTimeInMs,
    emojiIdentifier,
    sexualChannelId,
  };
}

export function collectOnStartupGreetingConfig(): OnStartupGreetingConfig {
  const generalChannelId: string = String(process.env.GENERAL_CHANNEL_ID);
  assert(generalChannelId !== "undefined", "General channel id is not defined");

  const greetingTimeInMs: number = Number(process.env.GREETING_TIME_IN_MS);
  assert(!Number.isFinite(greetingTimeInMs), "General channel id is not defined");

  return { generalChannelId, greetingTimeInMs };
}

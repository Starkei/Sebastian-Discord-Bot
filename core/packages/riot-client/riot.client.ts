import { RiotHttpClient } from "./riot.http.client";
import { SummonerQueries, SummonerQueriesConfig } from "./summoner-queries";
import { RiotClientConfig, RiotHttpClientConfig } from "./types";

export class RiotClient {
  public readonly summonerQueries: SummonerQueries;
  constructor(config: RiotClientConfig) {
    const httpClient = new RiotHttpClient(mapToRiotHttpClientConfig(config));
    this.summonerQueries = new SummonerQueries(httpClient, mapToSummonerQueryConfig(config));
  }
}

function mapToRiotHttpClientConfig(config: RiotClientConfig): RiotHttpClientConfig {
  return {
    apiToken: config.apiToken,
    baseUrl: config.apiBaseUrl,
  };
}

function mapToSummonerQueryConfig(config: RiotClientConfig): SummonerQueriesConfig {
  return {
    getEncryptedUserIdByUserNameEndpoint: config.getEncryptedUserIdByUserNameEndpoint,
    getUserLPbyEncryptedUserId: config.getUserLPbyEncryptedUserId,
  };
}

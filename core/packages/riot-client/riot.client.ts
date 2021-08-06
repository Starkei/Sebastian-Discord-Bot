import { RiotHttpClient } from "./riot.http.client";
import { SummonerQueries, SummonerQueriesConfig } from "./summoner-queries";
import { RiotClientConfig, RiotHttpClientConfig } from "./types";

export class RiotClient {
  private readonly httpClient: RiotHttpClient;

  public readonly summonerQueries: SummonerQueries;

  constructor(config: RiotClientConfig) {
    this.httpClient = new RiotHttpClient(mapToRiotHttpClientConfig(config));
    this.summonerQueries = new SummonerQueries(this.httpClient, mapToSummonerQueryConfig(config));
  }

  public verifyApiToken() {
    return this.httpClient.verifySession();
  }
}

function mapToRiotHttpClientConfig(config: RiotClientConfig): RiotHttpClientConfig {
  return {
    apiToken: config.apiToken,
    baseUrl: config.apiBaseUrl,
    verificationUrl: config.verificationUrl,
  };
}

function mapToSummonerQueryConfig(config: RiotClientConfig): SummonerQueriesConfig {
  return {
    getEncryptedUserIdByUserNameEndpoint: config.getEncryptedUserIdByUserNameEndpoint,
    getUserLPbyEncryptedUserId: config.getUserLPbyEncryptedUserId,
  };
}

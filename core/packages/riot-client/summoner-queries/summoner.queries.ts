import { CompactValidationError } from "@sebastian/errors";
import { AsyncEither } from "@sebastian/types";
import { EncryptedSummonerId, LeaguePoints, SummonerQueriesConfig, SummonerUserName } from "./types";
import { RiotWrongCredentialsError } from "../errors";
import { NotFoundEncryptedUserIDError, NotFoundSummonerNameError } from "./errors";
import { hardMapToEncryptedSummonerId, hardMapToLeaguePoints } from "./hard-mappers";
import { RiotHttpClient } from "../riot.http.client";

export class SummonerQueries {
  constructor(private readonly httpClient: RiotHttpClient, private readonly config: SummonerQueriesConfig) {}

  public async getEncryptedUserIdByUserName(
    userName: SummonerUserName
  ): AsyncEither<RiotWrongCredentialsError | NotFoundSummonerNameError | CompactValidationError, EncryptedSummonerId> {
    const url = `${this.config.getEncryptedUserIdByUserNameEndpoint}/${encodeURIComponent(userName)}`;
    const response = await this.httpClient.get(url);
    return await hardMapToEncryptedSummonerId(response, userName);
  }

  public async getLPByEncryptedUserId(
    encryptedUserId: EncryptedSummonerId
  ): AsyncEither<RiotWrongCredentialsError | NotFoundEncryptedUserIDError | CompactValidationError, LeaguePoints> {
    const url = `${this.config.getUserLPbyEncryptedUserId}/${encodeURIComponent(encryptedUserId)}`;
    const response = await this.httpClient.get(url);
    return hardMapToLeaguePoints(response, encryptedUserId);
  }
}

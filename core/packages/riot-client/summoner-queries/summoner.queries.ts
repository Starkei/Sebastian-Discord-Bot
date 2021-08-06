import { CompactValidationError, Exception } from "@sebastian/errors";
import { AsyncEither } from "@sebastian/types";
import { EncryptedSummonerId, LeaguePoints, SummonerQueriesConfig, SummonerUserName } from "./types";
import { RiotWrongCredentialsError } from "../errors";
import { NotFoundEncryptedUserIDError, NotFoundSummonerNameError } from "./errors";
import { hardMapToEncryptedSummonerId, hardMapToLeaguePoints } from "./hard-mappers";
import { RiotHttpClient } from "../riot.http.client";

export class SummonerQueries {
  private readonly tierMap: Map<string, number> = new Map();
  private readonly maxLpPerRank: number;

  constructor(private readonly httpClient: RiotHttpClient, private readonly config: SummonerQueriesConfig) {
    this.maxLpPerRank = 100;
    const tiersCount = 4;
    const rankNames = ["iron", "bronze", "gold", "platinum", "diamond", "master", "grandmaster", "challenger"];
    this.tierMap = rankNames.reduce<Map<string, number>>(
      (map, rankName, index) => map.set(rankName, this.maxLpPerRank * index * tiersCount),
      new Map()
    );
  }

  public async getEncryptedUserIdByUserName(
    userName: SummonerUserName
  ): AsyncEither<RiotWrongCredentialsError | NotFoundSummonerNameError | CompactValidationError, EncryptedSummonerId> {
    const url = `${this.config.getEncryptedUserIdByUserNameEndpoint}/${encodeURIComponent(userName)}`;
    const response = await this.httpClient.get(url);
    return hardMapToEncryptedSummonerId(response, userName);
  }

  public async getLPByEncryptedUserId(
    encryptedUserId: EncryptedSummonerId
  ): AsyncEither<RiotWrongCredentialsError | NotFoundEncryptedUserIDError | CompactValidationError, LeaguePoints> {
    const url = `${this.config.getUserLPbyEncryptedUserId}/${encodeURIComponent(encryptedUserId)}`;
    const response = await this.httpClient.get(url);
    return hardMapToLeaguePoints(response, encryptedUserId).map((data) => {
      const tierLps = this.tierMap.get(data.tier.toLocaleLowerCase());
      if (!tierLps) {
        return Exception(`Wrong rank name`);
      }
      const rankLps = this.maxLpPerRank * data.rank;
      const totalLps = data.lp + rankLps + tierLps;
      return totalLps;
    });
  }
}

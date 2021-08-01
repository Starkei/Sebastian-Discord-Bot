import { EncryptedSummonerId, SummonerUserName } from "../types";

export class NotFoundSummonerNameError extends Error {
  constructor(summonerName: SummonerUserName) {
    super(`Summoner name not found. Details: ${summonerName}`);
  }
}

export class NotFoundEncryptedUserIDError extends Error {
  constructor(encryptedUserId: EncryptedSummonerId) {
    super(`Encrypted summoner id not found. Details ${encryptedUserId}`);
  }
}

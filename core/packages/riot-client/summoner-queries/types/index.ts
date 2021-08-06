export type SummonerQueriesConfig = {
  getEncryptedUserIdByUserNameEndpoint: string;
  getUserLPbyEncryptedUserId: string;
};

// TODO: Provide more specific types info, because strings and numbers telling nothing
export type SummonerRankData = {
  rank: number;
  tier: string;
  lp: number;
};

export type EncryptedSummonerId = string;
export type SummonerUserName = string;
export type LeaguePoints = number;

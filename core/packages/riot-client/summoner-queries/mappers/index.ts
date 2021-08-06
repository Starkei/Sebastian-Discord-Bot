import { SummonerDto } from "../models";
import { SummonerRankData } from "../types";

export function mapToSummonerRankData(dto: SummonerDto): SummonerRankData {
  return {
    lp: dto.leaguePoints,
    rank: dto.rank,
    tier: dto.tier,
  };
}

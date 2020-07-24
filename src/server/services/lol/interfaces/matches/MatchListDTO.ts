import {MatchReferenceDTO} from "./MatchReferenceDTO"

export interface MatchListDTO{
    startIndex: number;
    totalGames: number;
    endIndex: number;
    matches: MatchReferenceDTO[];
}

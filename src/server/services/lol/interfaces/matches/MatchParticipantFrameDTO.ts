import {MatchPositionDTO} from "./MatchPositionDTO"
export interface MatchParticipantFrameDTO{
    participantId: number;
    minionsKilled: number;
    teemScore: number;
    dominionScore: number;
    totalGold: number;
    level: number;
    xp: number;
    currentGold: number;
    position: MatchPositionDTO;
    jungleMinionsKilled: number;
}


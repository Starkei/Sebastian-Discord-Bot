import {ParticipantIdentityDTO} from "./ParticipantIdentityDTO" 
import {TeamStatsDTO} from "../TeamStatsDTO"
import {ParticipatnDTO} from "../ParticipantDTO"

export interface MatchDTO{

    gameId: number;
    participantIdentities: 	ParticipantIdentityDTO[];
    queueId: number;
    gameType: string;
    gameDuration : number;
    teams:	TeamStatsDTO[];
    platformId: string;
    gameCreation : number;
    seasonId : number;
    gameVersion: string;
    mapId : number;
    gameMode: string;
    participants : ParticipatnDTO[];

}

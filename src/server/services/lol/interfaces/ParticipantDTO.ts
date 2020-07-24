import {ParticipantStatsDTO} from "./ParticipantStatsDTO"
import {ParticipantTimeLineDTO} from "./ParticipantTimeLineDTO"
import {MasteryDTO} from "./MasteryDTO"
import {RuneDTO} from "./RuneDTO"

export interface ParticipatnDTO{
    participantId : number;
    championId : number;
    runes : RuneDTO[];
    stats : ParticipantStatsDTO;
    teamId : number;
    timeline : ParticipantTimeLineDTO;
    spell1Id : number;
    spell2Id : number;
    highestAchievedSeasonTier : string;
    masteries : MasteryDTO[];
}

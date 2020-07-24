import {MatchParticipantFrameDTO} from "./MatchParticipantFrameDTO"
import {MatchEventDTO} from "./MatchEventDTO"

export interface MatchFrameDTO{
    participantFrames: Map<string, MatchParticipantFrameDTO>;
    events: MatchEventDTO[];
    timestamp: number;
}

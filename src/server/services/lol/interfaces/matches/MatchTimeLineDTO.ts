import {MatchFrameDTO} from "./MatchFrameDTO"

export interface MatchTimeLineDTO{
    frames: MatchFrameDTO[];
    frameInterval: number;
}

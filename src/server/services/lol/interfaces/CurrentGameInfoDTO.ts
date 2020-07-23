import {BannedChampionDTO} from "./BannedChampionDTO"
import {Observer} from "./Observer"

export interface CurrentGameInfoDTO{
    gameId: number;
    gameType: string;
    gameStartTime: number;
    mapId: number;
    gameLength: number;
    platformId: string;
    gameMode: string;
    bannedChampions: BannedChampionDTO[];
    gameQueueConfigId: number;
    observers: Observer;
    participants: [];
}

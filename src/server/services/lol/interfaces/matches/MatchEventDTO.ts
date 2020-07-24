import {MatchPositionDTO} from "./MatchPositionDTO"

export type MatchEventTypes = "CHAMPION_KILL"| "WARD_PLACED"| "WARD_KILL"| "BUILDING_KILL"| "ELITE_MONSTER_KILL"| "ITEM_PURCHASED"| "ITEM_SOLD"| "ITEM_DESTROYED"| "ITEM_UNDO"| "SKILL_LEVEL_UP"| "ASCENDED_EVENT"| "CAPTURE_POINT"| "PORO_KING_SUMMON";

export interface MatchEventDTO {
    laneType: string;
    skillSlot: number;
    ascendedType: string;
    creatorId: number;
    afterId: number;
    eventType: string;
    type: MatchEventTypes;
    levelUpType: string;
    wardType: string;
    participantId: number;
    towerType: string;
    itemId: number;
    beforeID: number;
    pointCaptured: string;
    monsterType: string;
    monsterSubType: string;
    teamId: number;
    position: MatchPositionDTO;
    killerId: number;
    timestamp: number;
    assistingParticipantIds: number[];
    buildingType: string;
    victimId: number;
}

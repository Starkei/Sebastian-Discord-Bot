export interface ParticipantTimeLineDTO{
	participantId : number;
	csDiffPerMinDeltas : Map<string, number>;
	damageTakenPerMinDeltas : Map<string, number>;
	role : string;
	damageTakenDiffPerMinDeltas : Map<string, number>;
	xpPerMinDeltas : Map<string, number>;
    xpDiffPerMinDeltas : Map<string, number>;
    lane : string;
    creepsPerMinDeltas : Map<string, number>;
    goldPerMinDeltas : Map<string, number>;
}

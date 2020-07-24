import {TeamBansDTO} from "./TeamBansDTO"

export interface TeamStatsDTO{
    towerKills : number 
    riftHeraldKills : number 
    firstBlood: boolean 
    inhibitorKills : number 
    bans: TeamBansDTO[];
    firstBaron: boolean 
    firstDragon: boolean 
    dominionVictoryScore : number 
    dragonKills : number 
    baronKills : number 
    firstInhibitor: boolean 
    firstTower: boolean 
    vilemawKills : number 
    firstRiftHerald: boolean 
    teamId : number 
    win: string 
}

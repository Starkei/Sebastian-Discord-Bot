import https, {RequestOptions} from "https"
import {IncomingMessage} from "http"
import {SummonerDTO} from "./interfaces/SummonerDTO"
import {CurrentGameParticipant} from "./interfaces/CurrentGameParticipant"
import { MatchListDTO, MatchTimeLineDTO } from "./interfaces/matches"

export class RiotService {
    
    private readonly API_URL: string;
    private readonly END_POINT_SUMMONER_BY_USER_NAME: string = "/lol/summoner/v4/summoners/by-name/";
    private readonly END_POINT_MATCH_BY_ENCRYPTED_SUMMONER_ID: string = "/lol/spectator/v4/active-games/by-summoner/"; 
    private readonly END_POINT_MATCH_LIST_BY_ENCRYPTED_ACCOUNT_ID: string = " /lol/match/v4/matchlists/by-account/";
    private readonly END_POINT_MATCH_LINE_BY_MATCH_ID: string = "/lol/match/v4/timelines/by-match/";

    private readonly options: RequestOptions = {
        headers: {
            "X-Riot-Token" : process.env.RIOT_API_KEY
        }
    }

    constructor(private readonly url: string, private readonly region: string){
        this.API_URL = this.url.replace("https://", `https://${this.region}.`); 
    }
    
    public getMatchByGameId(gameId: string) {

    }

    public getMatchLineByGameId(gameId: string) : Promise<MatchTimeLineDTO>{
        return new Promise((resolve, reject) => {
            https.get(`${this.API_URL}${this.END_POINT_MATCH_LINE_BY_MATCH_ID}${gameId}`, this.options, (res: IncomingMessage) => {
                let data: string = "";
                res.on("data", (chunk: string) => {
                    data += chunk;
                });
                res.on("end", () => {
                    const matchTimeLineDTO: MatchTimeLineDTO = JSON.parse(data);
                    resolve(matchTimeLineDTO);
                })
            })
            .on("error", reject);
        }); 
    }

    public getMatchListByEncryptedAccountId(encryptedAccountId: string) : Promise<MatchListDTO>{
        return new Promise((resolve, reject) => {
            https.get(`${this.API_URL}${this.END_POINT_MATCH_LIST_BY_ENCRYPTED_ACCOUNT_ID}${encryptedAccountId}`, this.options, (res: IncomingMessage) => {
                let data: string = "";

                res.on("data", (chunk: string) => {
                    data += chunk;    
                });

                res.on("end", () => {
                   const matchListDTO: MatchListDTO = JSON.parse(data);
                   resolve(matchListDTO);
                });
            }).on("error", reject);
        });
    }

    //After this request should be timeoute 1 second 
    public async getMatchListOfParticipants(participants: CurrentGameParticipant[]): Promise<Map<CurrentGameParticipant, MatchListDTO>>{
        const mapParticipantsMatchList: Map<CurrentGameParticipant, MatchListDTO> = new Map<CurrentGameParticipant, MatchListDTO>();
        for (const participant of participants){
            //2 * 10 requests. Gap 20 per second and 100 requests per minute
            const encryptedAccountId: string = (await this.getSummonerByUserName(participant.summonerName)).accountId;
            const matchListDTO: MatchListDTO = await this.getMatchListByEncryptedAccountId(encryptedAccountId);
            mapParticipantsMatchList.set(participant, matchListDTO);
        }
        return mapParticipantsMatchList;
    }
    
    public getGameParticipantsByEncryptedSummonerID(encryptedSummonerId: string) : Promise<CurrentGameParticipant[]>{
        return new Promise<CurrentGameParticipant[]>((resolve, reject) => {
            https.get(`${this.API_URL}${this.END_POINT_MATCH_BY_ENCRYPTED_SUMMONER_ID}${encryptedSummonerId}`, this.options, (res: IncomingMessage) => {
                let data: string = "";
                res.on("data", (chunk: string) => {
                    data += chunk;
                });

                res.on("end", () => {
                    const participants: CurrentGameParticipant[] = JSON.parse(data).participants;
                    resolve(participants);
                })

            }).on("error", reject);
        }); 
    }

    public getSummonerByUserName(userName: string) : Promise<SummonerDTO> {
        return new Promise<SummonerDTO>((resolve, reject) => {

            https.get(`${this.API_URL}${this.END_POINT_SUMMONER_BY_USER_NAME}${userName}`, this.options, (res: IncomingMessage) => {

                let data: string = ""; 

                res.on("data", (chunk: string) => {
                    data += chunk;
                })

                res.on("end", () => {
                    const summoner: SummonerDTO = JSON.parse(data);
                    resolve(summoner);
                })
            }).on("error", reject);
        }); 
    }
}

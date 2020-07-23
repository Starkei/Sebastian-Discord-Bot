import https, {RequestOptions} from "https"
import {IncomingMessage} from "http"
import {SummonerDTO} from "./interfaces/SummonerDTO"
import {CurrentGameParticipant} from "./interfaces/CurrentGameParticipant"

export class RiotService {
    
    private readonly API_URL: string;
    private readonly END_POINT_SUMMONER_BY_USER_NAME: string = "/lol/summoner/v4/summoners/by-name/";
    private readonly END_POINT_MATCH_BY_ENCRYPTED_SUMMONER_ID: string = "/lol/spectator/v4/active-games/by-summoner/"; 
    private readonly options: RequestOptions = {
        headers: {
            "X-Riot-Token" : process.env.RIOT_API_KEY
        }
    }

    constructor(private readonly url: string, private readonly region: string){
        this.API_URL = this.url.replace("https://", `https://${this.region}.`); 
    }
    
    public async getGameParticipantsByEncryptedSummonerID(encryptedSummonerId: string) : Promise<CurrentGameParticipant[]>{
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

    public async getSummonerByUserName(userName: string) : Promise<SummonerDTO> {
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

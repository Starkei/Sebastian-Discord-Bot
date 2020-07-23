import {Message} from "discord.js"
import { ICommand } from "../ICommand"
import {RiotService, SummonerDTO} from "../../services/lol/RiotService"

export class GetCurrentMatchCommand implements ICommand{
    
    private readonly userName: string;

    constructor(public readonly params: string[], private message: Message, private readonly riotService: RiotService){
        this.userName = params.join(" ");
    }

    async exec(){
        try{
            const summoner: SummonerDTO = await this.riotService.getSummonerByUserName(this.userName);
            this.message.reply(JSON.stringify(summoner)); 
        }catch(err){
            this.message.reply(err);
        }
    }
}

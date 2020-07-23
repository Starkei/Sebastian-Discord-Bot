import { Message } from "discord.js"
import {ICommand, GetCurrentMatchCommand, IParsedCommand} from "../command"
import {RiotService} from "../services/lol/RiotService"

export interface Global{
    message: Message; 
}

export class CommandBuilder{
    private static riotService: RiotService = new RiotService("https://api.riotgames.com", "ru");
    public static build(parsedCommand: IParsedCommand, global: Global): ICommand{
        switch(parsedCommand.name){
            case "currentmatch" : return new GetCurrentMatchCommand(parsedCommand.params, global.message, CommandBuilder.riotService);
            default : return {
                params: [],
                exec: () => null 
            }
        }
    }
}

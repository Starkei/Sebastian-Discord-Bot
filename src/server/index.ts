import {config} from "dotenv"
import {Client, Message} from "discord.js"

import {ICommand, CommandBuilder, CommandParser, IParsedCommand} from "./command"

config();

const client: Client = new Client();
client.on("message", (message: Message) : void => {
    const parsedCommands: IParsedCommand[] = CommandParser.parseToCommands(message.content);
    const commands: ICommand[] = parsedCommands.map( (parsedCommand: IParsedCommand): ICommand => CommandBuilder.build(parsedCommand, {message}));
    commands.forEach((command: ICommand) => command.exec());
})

client.login(process.env.BOT_TOKEN);

console.log("Bot has been started");

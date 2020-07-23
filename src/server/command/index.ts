export {ICommand} from "./ICommand"
export {GetCurrentMatchCommand} from "./lol/GetCurrentMatchCommand"
export {CommandBuilder} from "./CommandBuilder"

export interface IParsedCommand{
    name: string;
    params: string[];
}

export const PREFIX: string = "!";

export class CommandParser{

    private static getCommandName(source: string) : string[]{
        source = source.trim();
        let indexOfSpace: number = source.indexOf(" ");
        if (indexOfSpace < 0)
            indexOfSpace = source.length - 1;
        const cmdName: string = source.slice(0, indexOfSpace).toLowerCase();
        source = source.slice(indexOfSpace, source.length).trimLeft();
        return [cmdName, source];
    }

    private static getCommandParams(source: string): string[]{
        return source.split(/ +/g);
    }

    private static parseToCommand(source: string): IParsedCommand {
        const [cmdName, unparsedParams] = CommandParser.getCommandName(source);
        const cmdParams: string[] = CommandParser.getCommandParams(unparsedParams);
        return {name: cmdName, params: cmdParams};
    }

    public static parseToCommands(source: string): IParsedCommand[]{
        const indexOfPrefix: number = source.indexOf(PREFIX);
        if (indexOfPrefix < 0) return [];

        source = source.slice(indexOfPrefix, source.length);

        const unparsedCommands: string[] = source.split(new RegExp(` *${PREFIX} *`)).filter((unparsedCommand: string): boolean => unparsedCommand.length !== 0);
        const listOfCommands: IParsedCommand[] = unparsedCommands.map(CommandParser.parseToCommand);

        return listOfCommands;
    }
}

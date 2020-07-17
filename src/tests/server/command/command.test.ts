import { CommandParser, IParsedCommand, PREFIX} from "../../../server/command"

describe("CommandBuilder", () => {
    describe("method parseToCommands", () => {

        test("should be exists", () => {
            expect(CommandParser.parseToCommands).toBeDefined();
        });
        
        test("should return empty array of commands, when take empty string", () => {
            expect(CommandParser.parseToCommands("")).toEqual([]);
        });

        test("should return multiple commands with multiple args", () => {
            const cmdString: string = `${PREFIX}command1 arg1 arg2 ${PREFIX}command2 arg1 arg2 arg3`;
            const shouldReturn: IParsedCommand[] = [
                {
                    name: "command1",
                    params: [
                        "arg1",
                        "arg2"
                    ]
                },
                {
                    name: "command2",
                    params: [
                        "arg1",
                        "arg2",
                        "arg3"
                    ]
                }
            ];
            expect(CommandParser.parseToCommands(cmdString)).toEqual(shouldReturn);
        })
        test("should return command with multiple args", () => {
            const cmdString: string = `${PREFIX}command1 arg1 arg2`;
            const shouldReturn: IParsedCommand[] = [
                { 
                    name: "command1", 
                    params: [ 
                        "arg1", 
                        "arg2" 
                    ] 
                }
            ];
            expect(CommandParser.parseToCommands(cmdString)).toEqual(shouldReturn);
        });

        test("should avoid spaces in given string", () => {
            const cmdString: string = `            ${PREFIX}  music  test   lalal   `;
            const shouldReturn: IParsedCommand[] = [
                {
                    name: "music",
                    params: [
                        "test", 
                        "lalal"
                    ]
                }
            ];
            expect(CommandParser.parseToCommands(cmdString)).toEqual(shouldReturn);
        });

        test("should ignore register in command naming in giver string", () => {
            const cmdString: string = `${PREFIX} MuSiC SomEUrlKH@23121llla`;
            const shouldReturn: IParsedCommand[] = [
                {
                    name: "music",
                    params: [
                        "SomEUrlKH@23121llla"
                    ]
                }
            ];
            expect(CommandParser.parseToCommands(cmdString)).toEqual(shouldReturn);
        });
    }) 
})

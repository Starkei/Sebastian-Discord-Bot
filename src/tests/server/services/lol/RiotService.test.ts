import {config} from "dotenv"
config();
import {RiotService, SummonerDTO} from "../../../../server/services/lol/RiotService"


describe("RiotService", () => {
    
    test("should be created", () => {
        const riotService: RiotService = new RiotService("https://api.riotgames.com", "ru");
        expect(riotService).toBeDefined();
    });

    const riotService: RiotService = new RiotService("https://api.riotgames.com", "ru");
    describe("method getSummonerByUserName", () => {
        test("should be exists", () => {
            expect(riotService.getSummonerByUserName).toBeDefined();
        });

        test("should return SummonerDTO or send error", async () => {
            
            const actualSummonerName: string = "I am Starrk";
            const actualSummonerDTO: SummonerDTO = {
               accountId: "pTd5YhUSHJdf8_nSsiV_4vlrBRFYW7e1H5hCENdyoS3ZUpY",
               id: "Ne5wo5h2dWF2TyfndgEt7eWs0gp0XlQkoebDJqKjuq5VtQ",
               name: "I am Starrk",
               profileIconId: 3502,
               puuid: "6m8-_QujcpIJdEbCVwsLbQ0PHmLU-T1nDuVROvSRqlHtJsTnsD2qe6Z5cxeuC1BloMHxPk4_Gj0YvQ",
               revisionDate: 1594489042000,
               summonerLevel: 147,
            }
            const summonerDTO: SummonerDTO = await riotService.getSummonerByUserName(actualSummonerName);
            expect(summonerDTO).toEqual(actualSummonerDTO);

        })

    })
})

import { DMChannel, NewsChannel, TextChannel } from "discord.js";
import { SebastianRequest } from "./requests";
import { SebastianDirectSpeech, SebastianPolitenessSpeech } from "./speech";
import { SebastianIndirectSpeech } from "./speech/indirect-speech";

export class Sebastian {
  public readonly name: string = "Себастиан";
  public readonly directSpeech: SebastianDirectSpeech;
  public readonly politenessSpeech: SebastianPolitenessSpeech;
  public readonly indirectSpeech: SebastianIndirectSpeech;
  public readonly request: SebastianRequest;
  constructor() {
    this.directSpeech = new SebastianDirectSpeech();
    this.politenessSpeech = new SebastianPolitenessSpeech();
    this.indirectSpeech = new SebastianIndirectSpeech();
    this.request = new SebastianRequest(this.name);
  }

  public async isRequest(content: string, channel: TextChannel | DMChannel | NewsChannel): Promise<boolean> {
    if (content.includes(this.name.toLocaleLowerCase() + ", ")) {
      const hope: string = this.politenessSpeech.makeHope().comma().complete();
      const full: string = this.indirectSpeech.youLearnItSoon().dot().complete();
      await channel.send(
        `${hope}${full}Кто-то вас должен научить вежливости. Мое имя пишется с большой буквы как и у всех!`
      );
      return false;
    }
    if (content.includes(this.name + ", ")) {
      return this.request.isRequestCorrect(content);
    }
    return false;
  }
}

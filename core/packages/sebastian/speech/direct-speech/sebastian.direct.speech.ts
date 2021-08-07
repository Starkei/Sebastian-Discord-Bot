import { SebastianSpeech } from "../speech";

export class SebastianDirectSpeech extends SebastianSpeech {
  constructor() {
    super();
  }

  public makeQuote(directName: string, quote: string): this {
    this.phrase = this.phrase + `${directName} сказал, "${quote}"`;
    return this;
  }

  public makeProgress(directName: string, progress: string): this {
    this.phrase = this.phrase + `${directName} имеет следующий прогресс ${progress}`;
    return this;
  }
}

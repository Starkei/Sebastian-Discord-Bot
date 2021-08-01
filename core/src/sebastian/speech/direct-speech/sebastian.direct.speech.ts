import { SebastianSpeech } from "../speech";

export class SebastianDirectSpeech extends SebastianSpeech {
  constructor() {
    super();
  }

  public makeDirectSpeech(directName: string, quote: string): this {
    this.phrase = this.phrase + `${directName} сказал, "${quote}"`;
    return this;
  }
}

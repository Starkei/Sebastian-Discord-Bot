import { SebastianSpeech } from "../speech";

export class SebastianIndirectSpeech extends SebastianSpeech {
  constructor() {
    super();
  }

  public youLearnItSoon(isStartFromCapital: boolean = true): this {
    const sentence: string = "";
    if (isStartFromCapital) {
      this.phrase = this.phrase + sentence;
    } else {
      this.phrase = this.phrase + sentence.toLowerCase();
    }
    return this;
  }
}

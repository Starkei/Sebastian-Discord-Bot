export class SebastianSpeech {
  protected phrase: string;
  constructor() {
    this.phrase = "";
  }

  public complete(): string {
    const phrase = this.phrase;
    this.phrase = "";
    return phrase;
  }
}

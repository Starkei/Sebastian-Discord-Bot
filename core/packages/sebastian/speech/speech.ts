export class SebastianSpeech {
  protected phrase: string;
  constructor() {
    this.phrase = "";
  }

  public dot(): this {
    this.phrase = this.phrase + ". ";
    return this;
  }

  public comma(): this {
    this.phrase = this.phrase + ", ";
    return this;
  }

  public complete(): string {
    const phrase = this.phrase;
    this.phrase = "";
    return phrase;
  }
}

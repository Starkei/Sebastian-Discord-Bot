import { SebastianSpeech } from "../speech";

export class SebastianPolitenessSpeech extends SebastianSpeech {
  constructor() {
    super();
  }

  public makeActionMorePolite(actionName: AllowedActionNames): this {
    this.phrase = this.phrase + `Извините, но мне необходимо ${actionName}`;
    return this;
  }
}

type AllowedActionNames = "переместить это";

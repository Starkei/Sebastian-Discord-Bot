import { SebastianDirectSpeech, SebastianPolitenessSpeech } from "./speech";

export class Sebastian {
  public readonly directSpeech: SebastianDirectSpeech;
  public readonly politenessSpeech: SebastianPolitenessSpeech;
  constructor() {
    this.directSpeech = new SebastianDirectSpeech();
    this.politenessSpeech = new SebastianPolitenessSpeech();
  }
}

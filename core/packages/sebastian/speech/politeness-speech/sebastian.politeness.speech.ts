import { SebastianSpeech } from "../speech";

export class SebastianPolitenessSpeech extends SebastianSpeech {
  constructor() {
    super();
  }

  public makeActionMorePolite(actionName: AllowedActionNames): this {
    this.phrase = this.phrase + `Извините, но мне необходимо ${actionName}`;
    return this;
  }

  public makeCongratulations(): this {
    this.phrase = this.phrase + `Примите мои искренние поздравления`;
    return this;
  }

  public makeDeplore(): this {
    this.phrase = this.phrase + `Мне очень жаль`;
    return this;
  }

  public makeHope(hope: HopeMessage = "Надеюсь"): this {
    this.phrase = this.phrase + `${hope}`;
    return this;
  }

  public itWillChange(startFromCapital: boolean = true): this {
    const sentense = `Это скоро изменится`;
    if (startFromCapital) {
      this.phrase = this.phrase + sentense;
    } else {
      this.phrase = this.phrase + sentense.toLowerCase();
    }
    return this;
  }

  public makeProgress(positive: EventAssessment, progress: string): this {
    switch (positive) {
      case "положительный":
        this.makeCongratulations().comma();
        break;
      case "негативный":
        this.makeDeplore().comma();
        break;
      case "нейтральный":
        this.makeHope().comma().itWillChange(false);
        break;
    }
    this.phrase = this.phrase + `${progress}`;
    return this;
  }
}
type HopeMessage = "Надеюсь";

type EventAssessment = "положительный" | "негативный" | "нейтральный";

type AllowedActionNames = "переместить это";

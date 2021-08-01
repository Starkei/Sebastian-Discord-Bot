import { IFeature } from "../../interfaces";

export class FeatureFactory implements IFeature {
  constructor(private readonly features: IFeature[]) {}
  public async init(): Promise<void> {
    for (const feature of this.features) {
      await feature.init();
    }
  }
}

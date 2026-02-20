import { StepRange } from './step-range';
import { RecipeBuilder } from './recipe-builder';

export class EspressoConfigurator {
  private readonly strength: StepRange = new StepRange({
    min: 1,
    max: 7,
    step: 1,
    initial: 4
  });
  private readonly water: StepRange = new StepRange({
    min: 80,
    max: 160,
    step: 20,
    initial: 120
  });

  constructor(private readonly builder: RecipeBuilder) {
    this.sync();
  }

  increaseStrength(): void {
    this.strength.increase();
    this.sync();
  }

  decreaseStrength(): void {
    this.strength.decrease();
    this.sync();
  }

  increaseWater(): void {
    this.water.increase();
    this.sync();
  }

  decreaseWater(): void {
    this.water.decrease();
    this.sync();
  }

  private sync(): void {
    this.builder
      .setCoffeeBeansAmountGrams(this.mapStrengthToBeans(this.strength.current))
      .setWaterAmountMl(this.water.current);
  }

  private mapStrengthToBeans(level: number): number {
    // простое соответствие UI → домен
    return 12 + level * 2; // 1→14g, 7→26g
  }
}
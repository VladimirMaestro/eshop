import { RecipeBuilder } from './recipe-builder';
import { StepRange } from './step-range';

export class AmericanoConfigurator {
  private readonly strength: StepRange = new StepRange({
    min: 1,
    max: 5,
    step: 1,
    initial: 3
  });
  private readonly water: StepRange = new StepRange({
    min: 120,
    max: 300,
    step: 30,
    initial: 180
  });

  constructor(private readonly builder: RecipeBuilder) {
    this.syncWithRecipeBuilder();
  }

  increaseStrength(): void {
    this.strength.increase();
    this.syncWithRecipeBuilder();
  }

  decreaseStrength(): void {
    this.strength.decrease();
    this.syncWithRecipeBuilder();
  }

  increaseWater(): void {
    this.water.increase();
    this.syncWithRecipeBuilder();
  }

  decreaseWater(): void {
    this.water.decrease();
    this.syncWithRecipeBuilder();
  }

  private syncWithRecipeBuilder(): void {
    this.builder
      .setCoffeeBeansAmountGrams(this.mapStrengthToBeans(this.strength.current))
      .setWaterAmountMl(this.water.current);
  }

  private mapStrengthToBeans(level: number): number {
    return 10 + level * 3;
  }
}
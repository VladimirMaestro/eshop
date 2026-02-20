import { Recipe } from "../domain/recipe";

export class RecipeBuilder {
  private waterAmountMl: number = null;
  private targetTemperatureC: number = null;
  private coffeeBeansAmountGrams: number = null;

  setWaterAmountMl(amountMl: number): this {
    this.waterAmountMl = amountMl;
    return this;
  }

  setTargetTemperatureC(tempC: number): this {
    this.targetTemperatureC = tempC;
    return this;
  }

  setCoffeeBeansAmountGrams(amountGrams: number): this {
    this.coffeeBeansAmountGrams = amountGrams;
    return this;
  }

  build(): Recipe {
    if (
      this.waterAmountMl === null ||
      this.targetTemperatureC === null ||
      this.coffeeBeansAmountGrams === null
    ) {
      throw new Error('Recipe is incomplete');
    }

    const recipe: Recipe = new Recipe(
      this.waterAmountMl,
      this.targetTemperatureC,
      this.coffeeBeansAmountGrams
    );
    this.reset();
    return recipe;
  }

  private reset(): void {
    this.waterAmountMl = null;
    this.targetTemperatureC = null;
    this.coffeeBeansAmountGrams = null;
  }
}

import { RecipeBuilder } from './recipe-builder';
import { EspressoConfigurator } from './espresso-configurator';
import { AmericanoConfigurator } from './americano-configurator';
import { CoffeeMachine } from "../application/coffee-machine";
import { DomainError, DomainValidationError } from "../domain/errors/errors";

export class ControlPanel {
  private builder: RecipeBuilder;
  private configurator: any;

  constructor(private readonly coffeeMachine: CoffeeMachine) {}

  createEspresso(): void {
    console.log('[UI] Espresso button pressed');
    this.builder = new RecipeBuilder();
    this.builder.setTargetTemperatureC(80);
    this.configurator = new EspressoConfigurator(this.builder);
  }

  createAmericano(): void {
    console.log('[UI] Americano button pressed');
    this.builder = new RecipeBuilder();
    this.builder.setTargetTemperatureC(80);
    this.configurator = new AmericanoConfigurator(this.builder);
  }

  increaseWater(): void {
    console.log('[UI] Increase water');
    this.configurator.increaseWater();
  }

  decreaseWater(): void {
    console.log('[UI] Decrease water');
    this.configurator.decreaseWater();
  }

  increaseStrength(): void {
    console.log('[UI] Increase strength');
    this.configurator.increaseStrength();
  }

  decreaseStrength(): void {
    console.log('[UI] Decrease strength');
    this.configurator.decreaseStrength();
  }

  prepareCoffee(): void {
    console.log('[UI] Prepare coffee button pressed');
    try {
      const recipe = this.builder.build();
      this.coffeeMachine.prepare(recipe);
    } catch (error) {
      if (error instanceof DomainValidationError) {
        console.log('[UI] Invalid recipe:', error.message);
        return;
      }
      if (error instanceof DomainError) {
        console.log('[UI] Cannot prepare coffee:', error.message);
        return;
      }
      throw error;
    }
  }
}

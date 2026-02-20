import { WaterContainer } from "./ports/out/water-container";
import { BeanContainer } from "./ports/out/bean-container";
import { Grinder } from "../domain/grinder";
import { Heater } from "../domain/heater";
import { CoffeeReceiver } from "./ports/out/coffee-receiver";
import { Recipe } from "../domain/recipe";
import { DomainError } from "../domain/errors/errors";
import { Coffee } from "../domain/coffee";

export class CoffeeMachine {
    constructor(
        private readonly waterContainer: WaterContainer,
        private readonly beanContainer: BeanContainer,
        private readonly grinder: Grinder,
        private readonly heater: Heater,
        private readonly receiver: CoffeeReceiver
    ) {}

    prepare(recipe: Recipe): void {
        console.log('[Machine] Starting coffee preparation');

        try {
            console.log('[Machine] Taking water from water tank');
            const water = this.waterContainer.take(recipe.waterAmountMl);

            console.log('[Machine] Taking coffee beans from bean container');
            const beans = this.beanContainer.take(recipe.coffeeBeansAmountGrams);

            console.log('[Machine] Grinding coffee beans');
            const groundCoffee = this.grinder.grind(beans);

            console.log('[Machine] Heating water');
            const hotWater = this.heater.heat(water, recipe.targetTemperatureC);

            console.log('[Machine] Extracting coffee');
            const strength = groundCoffee.amountGrams / hotWater.amountMl;

            const coffee = new Coffee(
                hotWater.amountMl,
                hotWater.temperatureC,
                strength
            );

            console.log('[Machine] Sending coffee to receiver');
            this.receiver.receive(coffee);

            console.log('[Machine] Coffee preparation finished');
        } catch (error) {
            if (error instanceof DomainError) {
                console.log('[Machine] Domain error occurred:', error.message);
                throw error;
            }
            console.log('[Machine] Unexpected error occurred');
            throw error;
        }
    }
}

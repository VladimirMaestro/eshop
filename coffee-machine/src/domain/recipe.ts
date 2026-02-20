import { InvalidCoffeeBeansAmountError, InvalidTargetTemperatureError, InvalidWaterAmountError } from "./errors/errors";

export class Recipe {
    constructor(
        public readonly waterAmountMl: number,
        public readonly targetTemperatureC: number,
        public readonly coffeeBeansAmountGrams: number
    ) {
        if (waterAmountMl <= 0) {
            throw new InvalidWaterAmountError(waterAmountMl);
        }
        if (coffeeBeansAmountGrams <= 0) {
            throw new InvalidCoffeeBeansAmountError(coffeeBeansAmountGrams);
        }
        if (targetTemperatureC < 60 || targetTemperatureC > 100) {
            throw new InvalidTargetTemperatureError(targetTemperatureC);
        }
    }
}

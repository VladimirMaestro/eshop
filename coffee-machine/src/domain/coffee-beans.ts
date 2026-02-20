import { InvalidCoffeeBeansError } from "./errors/errors";

export class CoffeeBeans {
    public readonly amountGrams: number = 0;

    constructor(amountGrams: number) {
        if (amountGrams < 0) {
            throw new InvalidCoffeeBeansError('amount cannot be negative');
        }
        this.amountGrams = amountGrams;
    }
}

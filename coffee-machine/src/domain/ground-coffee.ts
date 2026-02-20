import { InvalidGroundCoffeeError } from "../errors";

export  class GroundCoffee {
    constructor(
        public readonly amountGrams: number
    ) {
        if (amountGrams <= 0) {
            throw new InvalidGroundCoffeeError('amount must be positive');
        }
    }
}

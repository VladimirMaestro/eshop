import { InvalidCoffeeError } from "./errors/errors";

export class Coffee {
    constructor(
        public readonly amountMl: number,
        public readonly temperatureC: number,
        public readonly strength: number
    ) {
        if (amountMl <= 0) {
            throw new InvalidCoffeeError('amount must be positive');
        }
        if (temperatureC < 0) {
            throw new InvalidCoffeeError('temperature cannot be negative');
        }
        if (strength <= 0) {
            throw Error('Coffee strength must be positive');
        }
    }
}

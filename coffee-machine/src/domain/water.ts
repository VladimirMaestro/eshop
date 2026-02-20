import { InvalidWaterError } from "./errors/errors";

export  class Water {
    public readonly amountMl: number = 0;
    public readonly temperatureC: number = 0;

    constructor(amountMl: number, temperatureC: number) {
        if (amountMl <= 0) {
            throw new InvalidWaterError('amount must be positive');
        }
        if (temperatureC < 0 || temperatureC > 100) {
            throw new InvalidWaterError('temperature must be between 0 and 100 °C');
        }
        this.amountMl = amountMl;
        this.temperatureC = temperatureC;
    }
}

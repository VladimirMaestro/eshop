import { WaterContainer } from "../application/ports/out/water-container";
import { Water } from "../domain/water";
import { NotEnoughWaterError } from "../domain/errors/errors";

export class WaterTank implements WaterContainer {
    private maxAmountMl: number = 1500;
    private water: Water = new Water(0, 0);

    take(amountMl: number): Water {
        console.log(`[WaterTank] Requesting ${amountMl} ml of water`);

        if (amountMl > this.water.amountMl) {
            throw new NotEnoughWaterError(
                amountMl,
                this.water.amountMl
            );
        }

        this.water = new Water(
            this.water.amountMl - amountMl,
            this.water.temperatureC
        );

        console.log(`[WaterTank] Remaining water: ${this.water.amountMl} ml`);

        return new Water(amountMl, this.water.temperatureC);
    }

    add(other: Water): void {
        console.log(`[WaterTank] Adding ${other.amountMl} ml of water`);
        const availableSpace = this.maxAmountMl - this.water.amountMl;
        const amountMlToAdd = Math.min(other.amountMl, availableSpace);

        const resultAmountMl = this.water.amountMl + amountMlToAdd;
        const mixedResultTemp =
            (this.water.amountMl * this.water.temperatureC +
                other.amountMl * other.temperatureC) / resultAmountMl;

        this.water = new Water(resultAmountMl, mixedResultTemp);

        console.log(
            `[WaterTank] Water level: ${this.water.amountMl} ml at ${this.water.temperatureC.toFixed(
                1
            )} °C`
        );
    }
}

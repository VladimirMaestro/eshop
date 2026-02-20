import { CoffeeBeans } from "../domain/coffee-beans";
import { NotEnoughBeansError } from "../domain/errors/errors";

export class PlasticBeanContainer {
    private maxAmountGrams: number = 500;
    private beans: CoffeeBeans = new CoffeeBeans(0);

    take(amountGrams: number): CoffeeBeans {
        console.log(`[BeanContainer] Requesting ${amountGrams} g of beans`);
        if (amountGrams > this.beans.amountGrams) {
            throw new NotEnoughBeansError(
                amountGrams,
                this.beans.amountGrams
            );
        }
        this.beans = new CoffeeBeans(this.beans.amountGrams - amountGrams);
        console.log(`[BeanContainer] Remaining beans: ${this.beans.amountGrams} g`);
        return new CoffeeBeans(amountGrams);
    }

    add(other: CoffeeBeans): void {
        console.log(`[BeanContainer] Adding ${other.amountGrams} g of beans`);
        const availableSpace = this.maxAmountGrams - this.beans.amountGrams;
        const amountGramsToAdd = Math.min(other.amountGrams, availableSpace);
        this.beans = new CoffeeBeans(this.beans.amountGrams + amountGramsToAdd);
        console.log(`[BeanContainer] Bean level: ${this.beans.amountGrams} g`);
    }
}

import { CoffeeBeans } from "./coffee-beans";
import { GroundCoffee } from "./ground-coffee";

export class Grinder {
    grind(beans: CoffeeBeans): GroundCoffee {
        console.log(`[Grinder] Grinding ${beans.amountGrams} g of coffee beans`);
        return new GroundCoffee(beans.amountGrams);
    }
}

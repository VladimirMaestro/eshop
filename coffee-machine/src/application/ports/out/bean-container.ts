import { CoffeeBeans } from "../../../domain/coffee-beans";

export interface BeanContainer {
    take(amountGrams: number): CoffeeBeans;
    add(other: CoffeeBeans): void;
}

import { Coffee } from "../../../domain/coffee";

export interface CoffeeReceiver {
    receive(coffee: Coffee): void;
}

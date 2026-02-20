import { Coffee } from "../domain/coffee";
import { CoffeeReceiver } from "../application/ports/out/coffee-receiver";

export class Cup implements CoffeeReceiver {
    receive(coffee: Coffee): void {
        console.log('☕ Coffee is ready!');
        console.log(`Amount: ${coffee.amountMl} ml`);
        console.log(`Temperature: ${coffee.temperatureC} °C`);
        console.log(`Strength: ${coffee.strength.toFixed(2)}`);
    }
}

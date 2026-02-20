import { Water } from "./water";

export  class Heater {
    heat(water: Water, targetTemperatureC: number): Water {
        console.log(`[Heater] Heating water to ${targetTemperatureC} °C`);
        return new Water(water.amountMl, targetTemperatureC);
    }
}

import { Water } from "../../../domain/water";

export interface WaterContainer {
    take(amountMl: number): Water;
    add(other: Water): void;
}

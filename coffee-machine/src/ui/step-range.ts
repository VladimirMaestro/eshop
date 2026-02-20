import { StepRangeParams } from "./models/step-range-params";

export class StepRange {
  private value: number;
  private readonly min: number;
  private readonly max: number;
  private readonly step: number;

  constructor(params: StepRangeParams) {
    this.min = params.min;
    this.max = params.max;
    this.step = params.step;
    this.value = this.clamp(params.initial);
  }

  increase(): void {
    this.value = this.clamp(this.value + this.step);
  }

  decrease(): void {
    this.value = this.clamp(this.value - this.step);
  }

  get current(): number {
    return this.value;
  }

  private clamp(value: number): number {
    return Math.max(this.min, Math.min(this.max, value));
  }
}

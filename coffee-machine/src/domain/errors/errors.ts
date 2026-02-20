export abstract class DomainError extends Error {
    protected constructor(message: string) {
        super(message);
        this.name = (this.constructor as any).name;
    }
}

export abstract class DomainValidationError extends DomainError {
    protected constructor(message: string) {
        super(message);
    }
}

export class InvalidCoffeeError extends DomainValidationError {
    constructor(message: string) {
        super(`[Invalid Coffee]: ${message}`);
    }
}

export class InvalidWaterError extends DomainValidationError {
    constructor(message: string) {
        super(`[Invalid Water]: ${message}`);
    }
}

export class InvalidCoffeeBeansError extends DomainValidationError {
    constructor(message: string) {
        super(`[Invalid CoffeeBeans]: ${message}`);
    }
}

export class NotEnoughWaterError extends DomainError {
    constructor(requested: number, available: number) {
        super(
            `Not enough water: requested ${requested} ml, available ${available} ml`
        );
    }
}

export class NotEnoughBeansError extends DomainError {
    constructor(requested: number, available: number) {
        super(
            `Not enough coffee beans: requested ${requested} g, available ${available} g`
        );
    }
}

export class InvalidWaterAmountError extends DomainValidationError {
    constructor(amount: number) {
        super(`Invalid water amount: ${amount} ml`);
    }
}

export class InvalidCoffeeBeansAmountError extends DomainValidationError {
    constructor(amount: number) {
        super(`Invalid coffee beans amount: ${amount} g`);
    }
}

export class InvalidTargetTemperatureError extends DomainValidationError {
    constructor(temp: number) {
        super(`Invalid target temperature: ${temp} °C`);
    }
}

export class InvalidGroundCoffeeError extends DomainValidationError {
    constructor(message: string) {
        super(`Invalid ground coffee: ${message}`);
    }
}

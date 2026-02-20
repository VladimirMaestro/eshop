





// UI
/*
  UI — пошаговый
  пользователь может:
    - сначала выбрать тип
    - потом воду
    - потом температуру
  Builder — это адаптер между человеческим вводом и строгим доменом. Терпит «полусобранные» состояния.

  👉 Выбрать тип напитка
  👉 Настроить параметры (крепость / вода)
  👉 Нажать «Приготовить»
*/
// class RecipeBuilder {
//     private waterAmountMl: number = null;
//     private targetTemperatureC: number = null;
//     private coffeeBeansAmountGrams: number = null;
//
//     setWaterAmountMl(amountMl: number): this {
//         this.waterAmountMl = amountMl;
//         return this;
//     }
//
//     setTargetTemperatureC(tempC: number): this {
//         this.targetTemperatureC = tempC;
//         return this;
//     }
//
//     setCoffeeBeansAmountGrams(amountGrams: number): this {
//         this.coffeeBeansAmountGrams = amountGrams;
//         return this;
//     }
//
//     build(): Recipe {
//         if (
//             this.waterAmountMl === null ||
//             this.targetTemperatureC === null ||
//             this.coffeeBeansAmountGrams === null
//         ) {
//             throw new Error('Recipe is incomplete');
//         }
//
//         const recipe: Recipe = new Recipe(
//             this.waterAmountMl,
//             this.targetTemperatureC,
//             this.coffeeBeansAmountGrams
//         );
//         this.reset();
//         return recipe;
//     }
//
//     private reset(): void {
//         this.waterAmountMl = null;
//         this.targetTemperatureC = null;
//         this.coffeeBeansAmountGrams = null;
//     }
// }
//
// interface StepRangeParams {
//     min: number;
//     max: number;
//     step: number;
//     initial: number;
// }
//
// class StepRange {
//     private value: number;
//     private readonly min: number;
//     private readonly max: number;
//     private readonly step: number;
//
//     constructor(params: StepRangeParams) {
//         this.min = params.min;
//         this.max = params.max;
//         this.step = params.step;
//         this.value = this.clamp(params.initial);
//     }
//
//     increase(): void {
//         this.value = this.clamp(this.value + this.step);
//     }
//
//     decrease(): void {
//         this.value = this.clamp(this.value - this.step);
//     }
//
//     get current(): number {
//         return this.value;
//     }
//
//     private clamp(value: number): number {
//         return Math.max(this.min, Math.min(this.max, value));
//     }
// }
//
// class EspressoConfigurator {
//     private readonly strength: StepRange = new StepRange({
//         min: 1,
//         max: 7,
//         step: 1,
//         initial: 4
//     });
//     private readonly water: StepRange = new StepRange({
//         min: 80,
//         max: 160,
//         step: 20,
//         initial: 120
//     });
//
//     constructor(private readonly builder: RecipeBuilder) {
//         this.sync();
//     }
//
//     increaseStrength(): void {
//         this.strength.increase();
//         this.sync();
//     }
//
//     decreaseStrength(): void {
//         this.strength.decrease();
//         this.sync();
//     }
//
//     increaseWater(): void {
//         this.water.increase();
//         this.sync();
//     }
//
//     decreaseWater(): void {
//         this.water.decrease();
//         this.sync();
//     }
//
//     private sync(): void {
//         this.builder
//             .setCoffeeBeansAmountGrams(this.mapStrengthToBeans(this.strength.current))
//             .setWaterAmountMl(this.water.current);
//     }
//
//     private mapStrengthToBeans(level: number): number {
//         // простое соответствие UI → домен
//         return 12 + level * 2; // 1→14g, 7→26g
//     }
// }
//
//
// class AmericanoConfigurator {
//     private readonly strength: StepRange = new StepRange({
//         min: 1,
//         max: 5,
//         step: 1,
//         initial: 3
//     });
//     private readonly water: StepRange = new StepRange({
//         min: 120,
//         max: 300,
//         step: 30,
//         initial: 180
//     });
//
//     constructor(private readonly builder: RecipeBuilder) {
//         this.syncWithRecipeBuilder();
//     }
//
//     increaseStrength(): void {
//         this.strength.increase();
//         this.syncWithRecipeBuilder();
//     }
//
//     decreaseStrength(): void {
//         this.strength.decrease();
//         this.syncWithRecipeBuilder();
//     }
//
//     increaseWater(): void {
//         this.water.increase();
//         this.syncWithRecipeBuilder();
//     }
//
//     decreaseWater(): void {
//         this.water.decrease();
//         this.syncWithRecipeBuilder();
//     }
//
//     private syncWithRecipeBuilder(): void {
//         this.builder
//             .setCoffeeBeansAmountGrams(this.mapStrengthToBeans(this.strength.current))
//             .setWaterAmountMl(this.water.current);
//     }
//
//     private mapStrengthToBeans(level: number): number {
//         return 10 + level * 3;
//     }
// }
//
//
// class ControlPanel {
//     private builder: RecipeBuilder;
//     private configurator: any;
//
//     constructor(private readonly coffeeMachine: CoffeeMachine) {}
//
//     createEspresso(): void {
//         console.log('[UI] Espresso button pressed');
//         this.builder = new RecipeBuilder();
//         this.builder.setTargetTemperatureC(80);
//         this.configurator = new EspressoConfigurator(this.builder);
//     }
//
//     createAmericano(): void {
//         console.log('[UI] Americano button pressed');
//         this.builder = new RecipeBuilder();
//         this.builder.setTargetTemperatureC(80);
//         this.configurator = new AmericanoConfigurator(this.builder);
//     }
//
//     increaseWater(): void {
//         console.log('[UI] Increase water');
//         this.configurator.increaseWater();
//     }
//
//     decreaseWater(): void {
//         console.log('[UI] Decrease water');
//         this.configurator.decreaseWater();
//     }
//
//     increaseStrength(): void {
//         console.log('[UI] Increase strength');
//         this.configurator.increaseStrength();
//     }
//
//     decreaseStrength(): void {
//         console.log('[UI] Decrease strength');
//         this.configurator.decreaseStrength();
//     }
//
//     prepareCoffee(): void {
//         console.log('[UI] Prepare coffee button pressed');
//         try {
//             const recipe = this.builder.build();
//             this.coffeeMachine.prepare(recipe);
//         } catch (error) {
//             if (error instanceof DomainValidationError) {
//                 console.log('[UI] Invalid recipe:', error.message);
//                 return;
//             }
//             if (error instanceof DomainError) {
//                 console.log('[UI] Cannot prepare coffee:', error.message);
//                 return;
//             }
//             throw error;
//         }
//     }
// }


// --- Infrastructure / composition root ---

// Containers (физическое состояние машины)
import { ControlPanel } from "./ui/control-panel";
import { CoffeeMachine } from "./application/coffee-machine";
import { WaterContainer } from "./application/ports/out/water-container";
import { WaterTank } from "./infrastructure/water-tank";
import { Grinder } from "./domain/grinder";
import { Heater } from "./domain/heater";
import { CoffeeReceiver } from "./application/ports/out/coffee-receiver";
import { Cup } from "./infrastructure/cup";
import { BeanContainer } from "./application/ports/out/bean-container";
import { PlasticBeanContainer } from "./infrastructure/plastic-bean-container";
import { CoffeeBeans } from "./domain/coffee-beans";
import { Water } from "./domain/water";

const waterTank = new WaterTank();
const cup = new Cup();
const plasticBeanContainer = new PlasticBeanContainer();

// Наполняем машину ресурсами
waterTank.add(new Water(1000, 20));        // 1 литр воды, комнатная температура
plasticBeanContainer.add(new CoffeeBeans(300));   // 300 г зёрен


// CoffeeMachine dependencies
const grinder = new Grinder();
const heater = new Heater();
const coffeeReceiver: CoffeeReceiver = cup;
const waterContainer: WaterContainer = waterTank;
const beanContainer: BeanContainer = plasticBeanContainer;

const coffeeMachine = new CoffeeMachine(
    waterContainer,
    beanContainer,
    grinder,
    heater,
    coffeeReceiver
);

// UI
const controlPanel = new ControlPanel(coffeeMachine);


// --- User scenario: Espresso ---
console.log('👉 User selects ESPRESSO');
controlPanel.createEspresso();

// Пользователь усиливает крепость (кнопка "+")
console.log('👉 Increase strength');
controlPanel.increaseStrength();
controlPanel.increaseStrength();

// Пользователь уменьшает воду
console.log('👉 Decrease water');
controlPanel.decreaseWater();

// Нажимает "Prepare"
console.log('👉 Prepare coffee');
controlPanel.prepareCoffee();


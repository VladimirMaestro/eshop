abstract class Animal {
    name: string;

   constructor(name: string) {
       this.name = name;
   }

    abstract speak(): void;
}

class Dog extends Animal {
    // Overriding
    speak() {
        console.log('Hau-hau');
    }
}

class Fish extends Animal {

    swim() {
        console.log('Swim swim');
    }

    speak() {
        console.log('...');
    }
}


const d: Animal = new Dog('Sharik');
const f: Animal = new Fish('Nemo');

if (d instanceof Dog) {
    console.log('YES');
} else {
    console.log('NO');
}

d.speak();

console.log(d);
console.log(f);


interface Person {
    name: string;
    age: number;
}

interface Human {
    name: string;
    speak: () => void
}

class User extends Animal implements Person, Human {
    public name: string;
    public age: number;

    constructor(name: string, age: number) {
        super(name);
        this.name = name;
        this.age = age;
    }

    speak(): void {
        console.log('Bla bla bla');
    }
}

const h: User = new User('Sam', 12);
const obj: Person = { name: '', age: 123 };


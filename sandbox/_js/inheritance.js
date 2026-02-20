// function Persone() {
//     this.name = 'Tolik';
// }

class Animal {
   name;

   constructor(name) {
       this.name = name;
   }

   speak() {}
}

class Dog extends Animal {
    // Overriding
    speak() {
        console.log('Hau-hau');
    }
}

class Fish extends Animal {}


const a = new Animal('Sharik');
const d = new Dog('Sharik');
const f = new Fish('Nemo');
a.speak();
d.speak();
f.speak();

console.log(d);
console.log(f);
const obj = { name: '', age: 12 };


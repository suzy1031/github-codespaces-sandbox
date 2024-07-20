// import * as math from "./module-pattern/math";

// console.log(math.default(7, 8));
// console.log(math.multiply(8, 9));
// console.log(math.subtract(10, 3));
// console.log(math.square(3));

// interface Role {
//   name: string;
//   age: number;
//   claim(): string;
// }

// class Student {
//   constructor(public name: string, public age: number) {}

//   claim() {
//     return `${this.name} is ${this.age}`;
//   }
// }

// class Teacher {
//   constructor(public name: string, public age: number) {}
//   claim() {
//     return `${this.name} is ${this.age}`;
//   }
// }

// class School {
//   claim(roleable: Role) {
//     return roleable.claim();
//   }
// }

// const student = new Student("bob", 20);
// const teacher = new Teacher("ben", 44);
// const school = new School();
// console.log(school.claim(student));
// console.log(school.claim(teacher));

// interface Animal {
//   type: "dog" | "cat";
//   bark?(): string;
//   meow?(): string;
// }
// class DogMan implements Animal {
//   type: "dog" = "dog";
//   bark() {
//     return "wannwan";
//   }
// }

// class CatMan implements Animal {
//   type: "cat" = "cat";
//   meow() {
//     return "nyan";
//   }
// }

// function isCat(animal: Animal): animal is CatMan {
//   return animal.type === "cat";
// }

// function makeSound(animal: Animal) {
//   if (animal.type === "dog" && animal.bark) {
//     console.log(animal.bark());
//   }
//   if (isCat(animal)) {
//     console.log(animal.meow());
//   return 'none';
// }

// const dog = new DogMan();
// const cat = new CatMan();
// makeSound(dog);
// makeSound(cat);

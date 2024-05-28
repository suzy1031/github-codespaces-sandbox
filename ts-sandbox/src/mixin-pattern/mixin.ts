class Dog {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const dogFunctionality = {
  bark: () => console.log("Woof!"),
  wagTail: () => console.log("Wagging my tail!"),
  play: () => console.log("Playing!"),
};

Object.assign(Dog.prototype, dogFunctionality);

const pet1 = new Dog("Daisy");
console.log(pet1.name);
/**
 * .jsだと以下は実行できる-> /dist/index.js参照
 * .tsではDogクラスにObject.assignしたメソッドにアクセスすると型エラーでコンパイルできない
 */
// console.log(pet1.bark());
// console.log(pet1.play());

/**
 * ES6 クラスが導入される以前は、React のコンポーネントに機能を追加するためにミックスインがよく使われていました。
 * React チームは、現在はミックスインの使用を推奨していません。
 * ミックスインはコンポーネントを不要に複雑にしがちで、保守や再利用を困難にするためです。
 * React チームは代わりに高階コンポーネントの使用を推奨していましたが、これは現在ではフックにより置き換えられる場合が多いです。
 * ref: https://zenn.dev/morinokami/books/learning-patterns-1/viewer/mixin-pattern
 */

function name() {
  console.log(this.name);
}

let obj = { name: "Nick" };
//name.call(obj);

class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`${this.type} rabbit says: '${line}'`);
  }
}

let whiteRabbit = new Rabbit("White");
let blackRabbit = new Rabbit("Black");
//rabbit.speak("Hi");

let fastRabbit = new (class {
  speak(line) {
    console.log(`Fast rabbit says: '${line}'`);
  }
})();
//fastRabbit.speak("Yo");

Rabbit.prototype.teeth = "small";
//console.log(whiteRabbit.teeth);
whiteRabbit.teeth = "very small";
// console.log(whiteRabbit.teeth);
// console.log(blackRabbit.teeth);

let ages = new Map();
ages.set("Bob", 39);
ages.set("Dan", 18);
ages.set("John", 26);

class Matrix {
  constructor(width, height, element = (x, y) => undefined) {
    this.width = width;
    this.height = height;
    this.content = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.content[y * width + x] = element(x, y);
      }
    }
  }
  [Symbol.iterator]() {
    return new MatrixIterator(this);
  }
  get(x, y) {
    return this.content[y * this.width + x];
  }
  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }
}

class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }

  next() {
    if (this.y == this.matrix.height) return { done: true };

    let value = {
      x: this.x,
      y: this.y,
      value: this.matrix.get(this.x, this.y),
    };
    this.x++;
    if (this.x == this.matrix.height) {
      this.x = 0;
      this.y++;
    }
    return { value, done: false };
  }
}

//let matrix = new Matrix(2, 2, (x, y) => x + y);
// for (let { x, y, value } of matrix) {
//   console.log(x, y, value);
// }

class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }
  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

// let temp = new Temperature(22);
// console.log(temp.fahrenheit);
// temp.fahrenheit = 86;
// console.log(temp.celsius);

class SymmetricMatrix extends Matrix {
  constructor(size, element = (x, y) => undefined) {
    super(size, size, (x, y) => {
      if (x < y) return element(y, x);
      else return element(x, y);
    });
  }

  set(x, y, value) {
    super.set(x, y, value);
    if (x != y) {
      super.set(y, x, value);
    }
  }
}

let matrix = new SymmetricMatrix(5, (x, y) => `${x},${y}`);
// console.log(matrix.get(2, 3));
// console.log(matrix);

class A {
    doSmth() {
        console.log("doSmth");
    }
}
let a = new A();
A.prototype.name = "Nick";
console.log(a.name);

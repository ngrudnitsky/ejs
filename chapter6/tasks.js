//1

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vec) {
    return new Vec(this.x + vec.x, this.y + vec.y);
  }

  minus(vec) {
    return new Vec(this.x - vec.x, this.y - vec.y);
  }

  get length() {
    return Math.abs((x + y) / 2);
  }
}

//2,3
class Group {
  constructor() {
    this.group = new Map();
  }

  [Symbol.iterator]() {
      return this.group.keys()[Symbol.iterator]();
  }

  add(element) {
    return this.group.set(element, null);
  }

  delete(element) {
    return this.group.delete(element);
  }

  has(element) {
    return this.group.has(element);
  }

  getKeys() {
    return this.group.keys;
  }

  static from(object) {
    let group = new Group(this);
    for (const iterator of object) {
      group.add(iterator);
    }
    return group;
  }
}

let group = new Group();
group.add(1);
group.add(2);
group.add(3);
for (const element of group) {
    console.log(element);
}


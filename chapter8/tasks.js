//1

class MultiplicationUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() * 10 < 8) {
    throw new MultiplicationUnitFailure();
  }
  return a * b;
}

function tryHard() {
  for (;;) {
    try {
      console.log("trying");
      return primitiveMultiply(2, 5);
    } catch (e) {}
  }
}
//console.log(tryHard());

//2

const box = {
  locked: true,
  unlock() {
    this.locked = false;
  },
  lock() {
    this.locked = true;
  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  },
};

function withBoxUnlocked(pushContent) {
  if (!box.locked) {
    pushContent();
  } else {
    box.unlock();
    pushContent();
  }

  try {
    return content = box.content;
  } finally {
    if (!box.locked) {
      box.lock();
    }
  }
}

withBoxUnlocked(() => box.content.push("content"));

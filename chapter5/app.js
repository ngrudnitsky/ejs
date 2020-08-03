const SCRIPTS = require("./scripts");

function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test(element)) {
      passed.push(element);
    }
  }
  return passed;
}

function map(array, transform) {
  let mapped = [];
  for (let element of array) {
    mapped.push(transform(element));
  }
  return mapped;
}

function reduce(combine) {
  let current = this.pop();
  for (let element of this) {
    current = combine(current, element);
  }
  return current;
}
let filteredNames = map(
  filter(SCRIPTS, (f) => (f.direction = "ttb")),
  (e) => e.name
);
let filteredNamesByDefaultMethods = SCRIPTS.filter(
  (f) => (f.direction = "ttb")
).map((e) => e.name);
let sum = [1, 2, 3, 4].reduce((a, b) => a + b);
let defaultSum = [1, 2, 3, 4].reduce((a, b) => a + b);
//console.log(sum);
//console.log(defaultSum);

function characterCount(script) {
  return script.ranges.reduce((count, [from, to]) => {
    return count + to - from;
  }, 0);
}
// console.log(
//   SCRIPTS.reduce((a, b) => {
//     return characterCount(a) < characterCount(b) ? b : a;
//   })
// );

function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
}
// console.log(Math.round(average(SCRIPTS.filter(e => e.living).map(e => e.year))));
// console.log(Math.round(average(SCRIPTS.filter(e => !e.living).map(e => e.year))));

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    ) {
      return script;
    }
  }
  return null;
}

//console.log(characterScript(121));

function countBy(items, groupName) {
  let counts = [];
  for (const item of items) {
    let name = groupName(item);
    let known = counts.findIndex((e) => e.name == name);
    if (known == -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

//console.log(countBy([1,2,3,4,5], n => n > 2));

function textScripts(text) {
  let scripts = countBy(text, (char) => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : "none";
  }).filter(({ name }) => name != "none");
  let total = scripts.script.reduce((n, { count }) => n + count, 0);
  if (total == 0) return "No scripts found";

  return scripts
    .map(({ name, count }) => {
      return `${Math.round((count * 100) / total)}%${name}`;
    })
    .join(",");
}

let array = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9, 10],
];
function concutArray(array) {
  return array.reduce((a, b) => {
    return a.concat(b);
  });
}
//console.log(concutArray(array));

function loop(value, condition, renewal, body) {
  let i = value;
  while (condition(i)) {
    body(i);
    i = renewal(i);
  }
}

loop(
  0,
  (i) => i < 5,
  (i) => {
    return ++i;
  },
  (i) => console.log(i)
);
function every(array, condition) {
  for (const element of array) {
    if (!condition(element)) {
      return false;
    }
  }
  return true;
}

console.log(
  every(["ab", "av", "as", "f"], (e) => (e.indexOf("a") == -1 ? false : true))
);

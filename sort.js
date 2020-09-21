let randomArray = (length, max) =>
  [...(new Array(Math.floor(length)) + 5)].map(() =>
    Math.round(Math.random() * max)
  );

let array = randomArray(10, 50);
console.log(array);

for (let i = 1; i < 10; i++) {
  let value = array[i];
  let hole = i;
  while (hole > 0 && array[hole - 1] > value) {
    array[hole] = array[hole - 1];
    hole = hole - 1;
  }
  array[hole] = value;
}
console.log(array);

let randomArray = (length, max) =>
  [...(new Array(Math.floor(length)) + 5)].map(() =>
    Math.round(Math.random() * max)
  );

let array = randomArray(10, 50);
console.log(array);
let partition = (start_i, end_i) => {
  let pivot = array[end_i];
  let partition_i = start_i;
  for (let i = start_i; i <= end_i - 1; i++) {
    if (array[i] <= pivot) {
      array[partition_i] = [array[i], (array[i] = array[partition_i])][0];
      partition_i++;
    }
  }
  array[end_i] = [
    array[partition_i],
    (array[partition_i] = array[end_i]),
  ][0];
  return partition_i;
};

let quickSort = (start, end) => {
  if (start >= end) return;
  let partition_i = partition(start, end);
  quickSort(start, partition_i - 1);
  quickSort(partition_i + 1, end);
};
quickSort(0, 9);
console.log(array);

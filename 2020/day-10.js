const fs = require('fs');

function getData() {
  const arr = fs
    .readFileSync('2020/day-10.txt', 'utf-8')
    .split('\n')
    .map(Number)
    .sort((a, b) => a - b);
  const max = arr[arr.length - 1] + 3;
  return [0, ...arr, max];
}

// number of 1-jolt differences * number of 3-jolt differences
function getPartOneAnswer() {
  const data = getData();

  // map: { difference: count }
  const map = {};
  for (let i = 1; i < data.length; i++) {
    const difference = data[i] - data[i - 1];
    if (map[difference]) {
      map[difference]++;
    } else {
      map[difference] = 1;
    }
  }
  
  return map[1] * map[3];
}

// number of distinct adapter arrangements, knowing an adapter
// can take an input 1, 2, or 3 jolts lower than its rating
function getPartTwoAnswer() {
  // reverse array so we can count from the back
  const data = getData().reverse();

  // map: { number: permutationCount }
  const map = {};
  // set count for last iteration to 1
  map[data[0]] = 1;

  for (let i = 1; i < data.length; i++) {
    const permutationCount = data
      .filter((x) => x - data[i] >= 1 && x - data[i] <= 3)
      .reduce((acc, curr) => acc + map[curr], 0);

    map[data[i]] = permutationCount;
  }

  return map[0];
}

console.log('Part One', getPartOneAnswer());
console.log('Part Two', getPartTwoAnswer());

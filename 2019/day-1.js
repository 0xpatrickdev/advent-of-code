const fs = require('fs');

function getData() {
  return fs.readFileSync('2019/day-1.txt').toString().split('\n').map(Number);
}

// divide by 3, round down, subtract 2
function calculateFuel(num) {
  return parseInt(num / 3) - 2 || 0;
}

function getPartOneAnswer() {
  return getData().reduce((acc, curr) => {
    return acc + calculateFuel(curr)
  }, 0)
}

function getPartTwoAnswer() {
  let totalFuel = 0;

  for (item of getData()) {
    const moduleFuel = calculateFuel(item);
    let fuelFuel = 0;
    let remainingFuel = moduleFuel;

    while (calculateFuel(remainingFuel) > 0) {
      fuelFuel = fuelFuel + calculateFuel(remainingFuel);
      remainingFuel = calculateFuel(remainingFuel);
    }

    totalFuel = totalFuel + moduleFuel + fuelFuel;
  }

  return totalFuel;
}

console.log('Part One', getPartOneAnswer());
console.log('Part Two', getPartTwoAnswer());

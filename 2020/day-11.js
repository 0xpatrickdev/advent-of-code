const fs = require('fs');

// 2d array: [ [1, 2, 3], [4, 5, 6] ]
function getData() {
  return fs
    .readFileSync('2020/day-11.txt', 'utf-8')
    .split('\n')
    .map((x) => x.split(''));
}

// determine updated seat value
function updateSeat({ seatMap, y, x, maxOccupancy, checkAcrossFloor }) {
  if (seatMap[y][x] === '.') {
    return '.';
  }

  // part 2, refactored for early return for part1 (checkAcrossFloor = false)
  const findNext = (dY, dX, iteration = 1) => {
    const val = seatMap?.[y + dY * iteration]?.[x + dX * iteration];
    if (!checkAcrossFloor) return val;
    if (!val) return false;
    if (val === '.') return findNext(dY, dX, ++iteration);
    return val;
  };

  const occupied = [
    findNext(-1, -1),
    findNext(-1, 0),
    findNext(-1, 1),
    findNext(0, -1),
    findNext(0, 1),
    findNext(1, -1),
    findNext(1, 0),
    findNext(1, 1),
  ].filter((x) => x === '#').length;

  if (seatMap[y][x] === 'L') {
    return occupied === 0 ? '#' : 'L';
  }

  if (seatMap[y][x] === '#') {
    return occupied >= maxOccupancy ? 'L' : '#';
  }
}

function runProgram({ maxOccupancy = 4, checkAcrossFloor = false }) {
  const _seatMap = getData();
  const maxY = _seatMap.length;
  const maxX = _seatMap[0].length;
  let answer;

  function runIteration(seatMap) {
    const seatMapCopy = Array(maxY).fill().map((_) => Array(maxX).fill());

    for (let y = 0; y < maxY; y++) {
      for (let x = 0; x < maxX; x++) {
        seatMapCopy[y][x] = updateSeat({ seatMap, y, x, maxOccupancy, checkAcrossFloor });
      }
    }

    if (String(seatMapCopy) === String(seatMap)) {
      answer = seatMapCopy.flat().filter((x) => x === '#').length;
      return;
    } else {
      runIteration(seatMapCopy);
    }
  }

  runIteration(_seatMap);
  return answer;
}

function getPartOneAnswer() {
  return runProgram({ maxOccupancy: 4, checkAcrossFloor: false });
}

function getPartTwoAnswer() {
  return runProgram({ maxOccupancy: 5, checkAcrossFloor: true });
}

console.log('Part One', getPartOneAnswer());
console.log('Part Two', getPartTwoAnswer());

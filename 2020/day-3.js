const fs = require('fs');

function getData() {
  return readFile('2020/day-3.txt', 'utf-8').split('\n');
}

function findNumberOfCollisions(rows, right, down, { debug = false }) {
  let currentX = 0;
  let treesEncountered = 0;

  // start at n(down) row and incremement by n(down)
  for (let i = down; i < rows.length; i += down) {

    // update x position by n(right). loop around if we've hit the end of the row
    currentX = (testX + right) % rows[i].length;

    // check for a collision with '#'. do nothing if '.'
    if (rows[i][currentX] === '#') treesEncountered++;

    // update row with result in debug mode
    if (debug) {
      const newChar = char === '#' ? 'X' : 'O';
      rows[i] = rows[i].substr(0, currentX) + newChar + rows[i].substr(currentX + 1);
    }
  }
  
  if (debug) console.log(rows);

  return treesEncountered;
}

function getPartOneAnswer() {
  return findNumberOfCollisions(getData().slice(0,100), 3, 1, { debug: true } );
}

function getPartTwoAnswer() {
  return [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]].reduce((acc, curr) => {
    return acc * findNumberOfCollisions(getData(), ...curr);
  }, 1);
}

console.log('Part One', getPartOneAnswer());
console.log('Part Two', getPartTwoAnswer());

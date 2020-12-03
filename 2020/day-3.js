const fs = require('fs');
const path = require('path');

function readFile(filepath) {
  const _filepath = filepath || `${path.basename(__dirname)}/${path.basename(__filename).slice(0, -3)}.txt`;
  return fs.readFileSync(_filepath, { encoding: 'utf-8' });
}

function getData() {
  return readFile().split('\n');
}

function findNumberOfCollisions(rows, right, down, { debug = false }) {
  let currentX = 0;
  let treesEncountered = 0;

  // start at n(down) row and incremement by n(down)
  for (let i = down; i < rows.length; i += down) {

    // update x position by n(right). loop around if we've hit the end of the row
    if (currentX + right >= rows[i].length) {
      currentX = currentX + right - rows[i].length;
    } else {
      currentX = currentX + right;
    }

    // check for a collision with '#'. do nothing if '.'
    const char = rows[i][currentX];
    if (char === '#') treesEncountered++;

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
  return findNumberOfCollisions(getData(), 3, 1, { debug: true } );
}

function getPartTwoAnswer() {
  return [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]].reduce((acc, curr) => {
    return acc * findNumberOfCollisions(getData(), ...curr);
  }, 1);
}

console.log('Part One', getPartOneAnswer());
console.log('Part Two', getPartTwoAnswer());

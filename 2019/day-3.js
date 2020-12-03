const fs = require('fs');

function getData() {
  return fs.readFileSync('2019/day-3.txt', {encoding: 'utf-8'}).split('\n').map(x => x.split(','));
}

function getTestData() {
  return [
    ['R75','D30','R83','U83','L12','D49','R71','U7','L72'],
    ['U62','R66','U55','R34','D71','R55','D58','R83']
  ]
}

function getCoords(directions, targetCoordsForTotalSteps) {
  let coordinateSet = new Set();
  let currX = 0;
  let currY = 0;
  let totalSteps = 0;

  for (dir of directions) {
    const direction = dir.slice(0, 1);
    const distance = parseInt(dir.slice(1));

    for (let i = 0; i < distance; i++) {
      switch (direction) {
        case 'R':
          currY++;
          totalSteps++;
          break;
        case 'L':
          currY--;
          totalSteps++;
          break;
        case 'U':
          currX++;
          totalSteps++;
          break;
        case 'D':
          currX--;
          totalSteps++;
          break;
      }
      const coords = `${currX}, ${currY}`;
      // using early return for partTwo where we only want total number of steps
      if (targetCoordsForTotalSteps && coords === targetCoordsForTotalSteps) {
        return totalSteps;
      }
      coordinateSet.add(coords);
    }
  }

  return coordinateSet;
}

function getMatches() {
  const data = getData();
  const lineOneCoords = getCoords(data[0]);
  const lineTwoCoords = getCoords(data[1]);

  const matches = [...lineOneCoords].filter((x) => lineTwoCoords.has(x));

  return {
    matches,
    lines: [data[0], data[1]],
  }
}

// return closest manhattan distance to (0,0) where the lines intersect
function getPartOneAnswer() {
  const { matches } = getMatches();

  let minDistance;
  for (match of matches) {
    const [x, y] = match.split(',');
    const distance = Math.abs(x) + Math.abs(y);
    if (!minDistance || distance < minDistance) {
      minDistance = distance;
    }
  }

  return minDistance;
}

// return combined shortest distance travelled where the linest intersect
function getPartTwoAnswer() {
  const { matches, lines } = getMatches();

  let minDistance;
  for (match of matches) {
    const steps = getCoords(lines[0], match) + getCoords(lines[1], match);
    if (!minDistance || steps < minDistance) {
      minDistance = steps;
    }
  }

  return minDistance;
}

console.log('Part One', getPartOneAnswer());
console.log('Part Two', getPartTwoAnswer());

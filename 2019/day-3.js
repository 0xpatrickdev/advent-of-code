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

function getCoords(directions) {
  let coords = [];
  let currX = 0;
  let currY = 0;

  for (dir of directions) {
    const direction = dir.slice(0, 1);
    const distance = parseInt(dir.slice(1));
    
    for (let i = 0; i < distance; i++) {
      switch (direction) {
        case 'R':
          currY++;
          break;
        case 'L':
          currY--;
          break;
        case 'U':
          currX++;
          break;
        case 'D':
          currX--;
          break;
      }
      coords.push([currX, currY])
    }
  }

  return coords;
}

function getPartOneAnswer() {
  const data = getData();
  
  const lineOneCoords = getCoords(data[0]);  
  const lineTwoCoords = getCoords(data[1]).map(x => String(x));

  let matches = [];
  for (coords of lineOneCoords) {
    if (lineTwoCoords.indexOf(String(coords)) > -1) {
      matches.push(coords);
    }
  }

  let minDistance;
  for (match of matches) {
    const distance = Math.abs(match[0]) + Math.abs(match[1]);
    if(!minDistance || distance < minDistance) {
      minDistance = distance;
    }
  }  

  return minDistance;
}

console.log('Part One', getPartOneAnswer());


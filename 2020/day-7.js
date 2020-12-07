const fs = require('fs');

function getData() {
  return fs.readFileSync('2020/day-7.txt', 'utf-8').split('\n');
}

function getColorMap() {
  let colorMap = {};

  getData().forEach((x) => {
    const [color, rest] = x.split(' bags contain ');
    let children = {};
    // remove period at end, iterate over color count pairs
    for (c of rest.slice(0, -1).split(', ')) {
      if (c !== 'no other bags') {
        // -4 + trim() accounts for ' bag.' vs ' bags.'
        children[c.slice(2, -4).trim()] = Number(c.split(' ')[0]);
      }
    }
    colorMap[color] = children;
  });

  return colorMap;
}

function getPartOneAnswer() {
  const colorMap = getColorMap();

  let canHaveGold = new Set();

  const getParentBags = (color) => {
    Object.entries(colorMap).forEach(([_color, children]) => {
      if (children[color]) {
        canHaveGold.add(_color);
        getParentBags(_color);
      }
    });
  };

  getParentBags('shiny gold');

  return canHaveGold.size;
}

function getPartTwoAnswer() {
  const colorMap = getColorMap();

  let totalCount = 0;

  const getChildBags = (color, count) => {
    Object.entries(colorMap[color]).forEach(([color, _count]) => {
      totalCount += _count * count;
      if (Object.keys(colorMap[color]).length !== 0) {
        getChildBags(color, _count * count);
      }
    });
  };

  getChildBags('shiny gold', 1);

  return totalCount;
}

console.log('Part One', getPartOneAnswer());
console.log('Part Two', getPartTwoAnswer());

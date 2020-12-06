const fs = require('fs');

function getData() {
  return fs
    .readFileSync('20120/day-6.txt', 'utf-8')
    .split('\n\n')
    .map((x) => x.split('\n'));
}

function getPartOneAnswer() {
  const data = getData();
  let totalYes = 0;
  for (let i = 0; i < data.length; i++) {
    const uniqueAnswers = new Set();
    for (let j = 0; j < data[i].length; j++) {
      for (let k = 0; k < data[i][j].length; k++) {
        uniqueAnswers.add(data[i][j][k]);
      }
    }
    totalYes += uniqueAnswers.size;
  }
  return totalYes;
}

function getPartTwoAnswer() {
  const data = getData();
  let totalYes = 0;
  for (let i = 0; i < data.length; i++) {
    const answerMap = {};
    for (let j = 0; j < data[i].length; j++) {
      for (let k = 0; k < data[i][j].length; k++) {
        if (!answerMap[data[i][j][k]]) {
          answerMap[data[i][j][k]] = 1;
        } else {
          answerMap[data[i][j][k]] += 1;
        }
      }
    }
    const allYesCount = Object.values(answerMap).filter(
      (count) => count === data[i].length
    ).length;

    totalYes += allYesCount;
  }
  return totalYes;
}

console.log('Part One', getPartOneAnswer());
console.log('Part Two', getPartTwoAnswer());

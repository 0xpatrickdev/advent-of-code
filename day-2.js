const fs = require('fs');

function getData() {
  return fs.readFileSync('day-2.txt').toString().split('\n');
}

function formatData(arr) {
  return arr.map((x) => {
    const [minMax, letter, password] = x.split(' ');
    return {
      min: minMax.split('-')[0],
      max: minMax.split('-')[1],
      letter: letter.slice(0, 1),
      password,
    };
  });
}

function getPartOneAnswer() {
  const data = formatData(getData());
  let validPasswordCount = 0;

  for (let i = 0; i < data.length; i++) {
    const { min, max, letter, password } = data[i];
    const count = (password.match(new RegExp(letter, 'g')) || []).length;
    if (count >= min && count <= max) {
      validPasswordCount++;
    }
  }

  return validPasswordCount;
}

function getPartTwoAnswer() {
  const data = formatData(getData());
  let validPasswordCount = 0;

  for (let i = 0; i < data.length; i++) {
    const { min: first, max: second, letter, password } = data[i];
    const firstIsMatch = password.split('')[parseInt(first) - 1] === letter;
    const secondIsMatch = password.split('')[parseInt(second) - 1] === letter;

    if (Number(firstIsMatch) + Number(secondIsMatch) === 1) {
      validPasswordCount++;
    }
  }

  return validPasswordCount;
}

console.log('Part One', getPartOneAnswer());
console.log('Part Two', getPartTwoAnswer());

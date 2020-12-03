const fs = require('fs');

function getData() {
  return fs.readFileSync('2020/day-2.txt').toString().split('\n');
}

function formatData(arr) {
  return arr.map((x) => {
    const [minMax, letter, password] = x.split(' ');
    return {
      min: Number(minMax.split('-')[0]),
      max: Number(minMax.split('-')[1]),
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
    // ensure count of letter in password is min <= count <= max
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
    const firstIsMatch = password[first - 1] === letter;
    const secondIsMatch = password[second - 1] === letter;

    // cast bool's to numbers and only return if exactly one is true
    if (Number(firstIsMatch) + Number(secondIsMatch) === 1) {
      validPasswordCount++;
    }
  }

  return validPasswordCount;
}

console.log('Part One', getPartOneAnswer());
console.log('Part Two', getPartTwoAnswer());

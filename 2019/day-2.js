const fs = require('fs');

function getData() {
  return fs.readFileSync('2019/day-2.txt','utf-8').split(',').map(Number);
}

function getPartOneAnswer(key1Value = 12, key2Value = 2) {
  const data = getData();

  data[1] = key1Value;
  data[2] = key2Value;

  for (let i = 3; i < data.length; i+= 4) {    
    const opcode = data[i - 3];
    const targetIndex = data[i];
    switch (opcode) {
      case 1:
        // 1: add
        data[targetIndex] = data[data[i - 2]] + data[data[i - 1]];
        break;
      case 2:
        // 2: multiply
        data[targetIndex] = data[data[i - 2]] * data[data[i - 1]];
        break;
      case 99:
        // 99: end program now
        return data[0];
      default:
        throw new Error('inavlid opcode');
    }
  }
  return data[0];
}

function getPartTwoAnswer(targetOutput = 19690720) {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      if (getPartOneAnswer(noun, verb) === targetOutput) {
        return 100 * noun + verb;
      }
    }
  }
}

console.log('Part One', getPartOneAnswer());
console.log('Part Two', getPartTwoAnswer());

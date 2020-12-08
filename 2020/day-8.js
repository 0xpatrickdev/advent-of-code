const fs = require('fs');

function getData() {
  return fs
    .readFileSync('2020/day-8.txt', 'utf-8')
    .split('\n')
    .map((x) => ({
      operation: x.split(' ')[0],
      argument: x.split(' ')[1],
      executed: false,
    }));
}

function getPartOneAnswer(instructions = getData()) {
  let accumulator = 0;
  let pointer = 0;

  while (true) {
    // return if we've hit the last line
    if (!instructions[pointer]) {
      return { accumulator, endsLastLine: true };
    }

    const { operation, argument, executed } = instructions[pointer];
    // return if we've already executed a command before
    if (executed) return accumulator;
    instructions[pointer]['executed'] = true;

    switch (operation) {
      case 'acc':
        accumulator += Number(argument);
        pointer += 1;
        break;
      case 'jmp':
        pointer += Number(argument);
        break;
      case 'nop':
        pointer += 1;
        break;
      default:
        throw new Error('invalid operation');
    }
  }
}

function getPartTwoAnswer() {
  const instructions = getData();

  // edit one instruction to find the program that ends on the last line
  for (i in instructions) {
    const { operation } = instructions[i];
    if (operation !== 'acc') {
      const copy = getData();
      copy[i].operation = operation === 'nop' ? 'jmp' : 'nop';
      const { accumulator, endsLastLine } = getPartOneAnswer(copy);
      if (endsLastLine) return accumulator;
    }
  }
}

console.log('Part One', getPartOneAnswer());
console.log('Part Two', getPartTwoAnswer());

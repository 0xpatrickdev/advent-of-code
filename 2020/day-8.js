const fs = require('fs');

function getData() {
  return fs.readFileSync('2020/day-8.txt', 'utf-8').split('\n');
}

function getPartOneAnswer(instructions = getData()) {
  let accumulator = 0;
  let pointer = 0;
  const executed = new Set();

  while (true) {
    // return if we've hit the last line
    if (!instructions[pointer]) {
      return { accumulator, endsLastLine: true };
    }

    // return if we've already executed a command
    if (executed.has(pointer)) return accumulator;
    executed.add(pointer);

    const [operation, argument] = instructions[pointer].split(' ');

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

const flipOp = (op) => (op === 'nop' ? 'jmp' : 'nop');

function getPartTwoAnswer() {
  const instructions = getData();

  let prevPointer;
  // edit one instruction to find the program that ends on the last line
  for (i in instructions) {
    const [operation, argument] = instructions[i].split(' ');
    // only update if 'nop' or 'jmp'
    if (operation === 'acc') continue;
    // update operation(s) in place
    if (prevPointer) {
      const [prevOp, prevArg] = instructions[prevPointer].split(' ');
      instructions[prevPointer] = flipOp(prevOp) + ' ' + prevArg;
    }
    instructions[i] = flipOp(operation) + ' ' + argument;
    prevPointer = i;

    // check for when program ends on last line
    const { accumulator, endsLastLine } = getPartOneAnswer(instructions);
    if (endsLastLine) return accumulator;
  }
}

console.log('Part One', getPartOneAnswer());
console.log('Part Two', getPartTwoAnswer());

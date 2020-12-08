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

function getPartTwoAnswer() {
  const instructions = getData();

  // edit one instruction to find the program that ends on the last line
  for (i in instructions) {
    let instruction = instructions[i];
    // only update if 'nop' or 'jmp'
    if (instruction.includes('acc')) continue;

    // update jmp/nop operation in place
    if (instruction.includes('jmp')) {
      instructions[i] = instructions[i].replace('jmp', 'nop');
    } else { 
      instructions[i] = instructions[i].replace('nop', 'jmp');
    }
    // check for when program ends on last line
    const { accumulator, endsLastLine } = getPartOneAnswer(instructions);
    if (endsLastLine) return accumulator;

    // replace the updated instruction
    instructions[i] = instruction;
  }
}

console.log('Part One', getPartOneAnswer());
console.log('Part Two', getPartTwoAnswer());

const fs = require('fs');

function getData() {
  return fs.readFileSync('2020/day-9.txt', 'utf-8').split('\n').map(Number);
}

function hasTwoSum(nums, target) {
  let map = {};

  for (let i = 0; i < nums.length; i++) {
    let complement = target - nums[i];
    if (map[complement] > -1) {
      return true;
    }
    map[nums[i]] = i;
  }

  return false;
}

// find the only number that's not equal to the sum of 
// 2 of the precending 25 (preambleLength) numbers
function getPartOneAnswer(preambleLength = 25) {
  const data = getData();
  for (let i = preambleLength; i < data.length; i++) {
    const nums = data.slice(i - preambleLength, i);
    const target = data[i];
    if (!hasTwoSum(nums, target)) {
      return data[i];
    }
  }
}

// find a contiguous set of at least two numbers that sums to the
// answer from part 1. return the sum of the highest and lowest
function getPartTwoAnswer() {
  const data = getData();
  const target = getPartOneAnswer();

  let pointer = 0;
  let preambleLength = 2;

  while (pointer < data.length) {
    const nums = data.slice(pointer, pointer + preambleLength);
    const currSum = nums.reduce((acc, curr) => acc + curr, 0);
    if (currSum === target) {
      const sorted = nums.sort((a, b) => a - b);
      return sorted[0] + sorted[preambleLength - 1];
    } else if (currSum > target) {
      pointer += 1;
      preambleLength = 2;
    } else if (currSum < target) {
      preambleLength += 1;
    }
  }
}

console.log('Part One', getPartOneAnswer());
console.log('Part Two', getPartTwoAnswer());

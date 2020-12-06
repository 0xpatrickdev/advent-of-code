const fs = require('fs');

function getData() {
  return fs.readFileSync('2020/day-1.txt').toString().split('\n').map(x => parseInt(x));
}

function twoSum(nums, target) {
  let map = {};

  for (let i = 0; i < nums.length; i++) {
    let complement = target - nums[i];
    if (map[complement] > -1) {
      return [complement, nums[i]];
    }
    map[nums[i]] = i;
  }

  return null;
}

function threeSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    const res = twoSum(nums, complement);
    if (res) {
      return [res[0], res[1], nums[i]];
    }
  }
}

function getPartOneAnswer() {
  const nums = getData();
  const [first, second] = twoSum(nums, 2020);
  console.log('twoSum', first, second);
  return first * second;
}

function getPartTwoAnswer() {
  const nums = getData();
  const [first, second, third] = threeSum(nums, 2020);
  console.log('threeSum', first, second, third);
  return first * second * third;
}

console.log('Part One', getPartOneAnswer());
console.log('Part Two', getPartTwoAnswer());

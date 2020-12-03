function passwordIsValid(password) {
  const passwordArray = [...String(password)].map((x) => Number(x));

  let prevChar;
  let hasAdjacentDigits;

  for (char of passwordArray) {
    // 3) Two adjacent digits are the same (like 22 in 122345).
    if (prevChar === char ) {
      hasAdjacentDigits = true;
    }
    // 4) Going from left to right, the digits never decrease;
    // they only ever increase or stay the same (like 111123 or 135679).
    if (prevChar && char < prevChar) {
      return false;
    }

    prevChar = char;
  }
  return hasAdjacentDigits;
}

// how many different passwords meet the criteria
function getPartOneAnswer(range = [240298, 784956]) {
  // 1) It is a six-digit number.
  const isSixDigits = (num) => String(num).length === 6;
  if (!isSixDigits(range[0] || !isSixDigits(range[1]))) {
    throw new Error('invalid range provided');
  }

  let validPasswordCount = 0;
  // 2) The value is within the range given in your puzzle input.
  for (i = range[0] + 1; i < range[1]; i++) {
    if (passwordIsValid(i)) {
      validPasswordCount++;
    }
  }
  return validPasswordCount;
}

function getPartTwoAnswer() {

}

console.log('Part One', getPartOneAnswer());
// console.log('Part Two', getPartTwoAnswer());

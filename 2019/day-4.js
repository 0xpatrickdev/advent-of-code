function passwordIsValid(password, needsDoubleMatch = false) {
  const chars = [...String(password)].map((x) => Number(x));

  let prevChar;
  let hasAdjacentDigits;
  let currentAdjacentCount = 1;
  let hasDoubleMatch;

  for (let i = 0; i < chars.length; i++) {
    // 4) Going from left to right, the digits never decrease;
    // they only ever increase or stay the same (like 111123 or 135679).
    if (prevChar && chars[i] < prevChar) {
      return false;
    }
    // 3) Two adjacent digits are the same (like 22 in 122345).
    if (prevChar === chars[i]) {
      hasAdjacentDigits = true;
      currentAdjacentCount++;
    }
    // 5) the two adjacent matching digits are not part of a larger group of matching digits
    // 125559 is not valid because 5 repeats more than 2 times.
    if (prevChar !== chars[i]) {
      if (currentAdjacentCount === 2) {
        hasDoubleMatch = true;
      }
      currentAdjacentCount = 1;
    }

    // 5.2) check for doublematch on the last item
    if (i === chars.length - 1 && currentAdjacentCount === 2) {
      hasDoubleMatch = true;
    }

    prevChar = chars[i];
  }

  return needsDoubleMatch ? hasDoubleMatch : hasAdjacentDigits;
}

function findValidPasswordCount({ range, needsDoubleMatch = false }) {
  // 1) It is a six-digit number.
  const isSixDigits = (num) => String(num).length === 6;
  if (!isSixDigits(range[0] || !isSixDigits(range[1]))) {
    throw new Error('invalid range provided');
  }

  let validPasswordCount = 0;
  // 2) The value is within the range given in your puzzle input.
  for (i = range[0] + 1; i < range[1]; i++) {
    if (passwordIsValid(i, needsDoubleMatch)) {
      validPasswordCount++;
    }
  }
  return validPasswordCount;
}

function getPartOneAnswer() {
  return findValidPasswordCount({ range: [240298, 784956] });
}

function getPartTwoAnswer() {
  return findValidPasswordCount({ range: [240298, 784956], needsDoubleMatch: true });
}

console.log('Part One', getPartOneAnswer());
console.log('Part Two', getPartTwoAnswer());

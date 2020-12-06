const fs = require('fs');

function getData() {
  return fs.readFileSync('2020/day-5.txt', 'utf-8').split('\n');
}

function getMiddle(seatCode, len = 7, range = [0, 127]) {
  for (let i = 0; i < len; i++) {

    // midpoint between current range
    const mid = parseInt((range[1] - range[0] + 1) / 2);

    // lower half
    if (seatCode[i] === 'F' || seatCode[i] === 'L') {
      range = [range[0], range[1] - mid];
    } else {
      // upper half
      // B // R
      range = [range[0] + mid, range[1]];
    }
  }

  const isLower = seatCode[len] === 'F' || seatCode[len] === 'L';

  return isLower ? range[0] : range[1];
}

function getSeatId(seat = 'FBFBBFFRLR') {
  const row = getMiddle(seat.slice(0, 7), 7, [0, 127]);
  const column = getMiddle(seat.slice(-3), 3, [0, 7]);
  return row * 8 + column;
}

function getPartTwoAnswer() {
  const data = getData();
  const seats = data.map(getSeatId).sort((a, b) => a - b);

  for (let i = 1; i < seats.length; i++) {
    if (seats[i] - seats[i - 1] !== 1) {
      return seats[i] - 1;
    }
  }
}

function getPartOneAnswer() {
  const data = getData();
  let highest;

  for (d of data) {
    const seatId = getSeatId(d);
    if (!highest || seatId > highest) {
      highest = seatId;
    }
  }
  return highest;
}

console.log('Part One', getPartOneAnswer());
console.log('Part Two', getPartTwoAnswer());

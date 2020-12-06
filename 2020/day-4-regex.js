const fs = require('fs');

function readFile() {
  return fs.readFileSync('2020/day-4.txt', 'utf-8');
}

function getPassports() {
  return JSON.parse(
    `[{"${readFile()
      .replace(/\n\n/g, '"},{"')
      .replace(/\n/g, ' ')
      .replace(/ /g, '","')
      .replace(/:/g, '":"')}"}]`
  );
}

const validatorMap = {
  // 1920 - 2002
  byr: /^(19[2-9]\d|200[0-2])$/,
  // 2010 - 2020
  iyr: /^20(1\d|20)$/,
  // 2020 - 230
  eyr: /^20(2[0-9]|30)$/,
  // 150-193cm or 59-76in
  hgt: /^(1([5-8]\d|9[0-3])cm|(59|6\d|7[0-6])in)$/,
  // valid color hex
  hcl: /^#[a-f\d]{6}$/,
  // one of 7 eye colors
  ecl: /^(amb|blu|brn|gry|grn|hzl|oth)/,
  // exactly 9 digits
  pid: /^\d{9}$/,
};

const validatorKeys = Object.keys(validatorMap);

const hasValidField = (key, passport) => !!passport[key];

const matchesRegex = (key, val) => !!val.match(validatorMap[key]);

function getValidPassportCount(requiredOnly = false) {
  return getPassports().filter((p) =>
    validatorKeys.every((key) =>
      requiredOnly
        ? hasValidField(key, p)
        : hasValidField(key, p) && matchesRegex(key, p[key])
    )
  ).length;
}

function getPartOneAnswer() {
  return getValidPassportCount(true);
}

function getPartTwoAnswer() {
  return getValidPassportCount();
}

console.log('Part One', getPartOneAnswer());
console.log('Part Two', getPartTwoAnswer());

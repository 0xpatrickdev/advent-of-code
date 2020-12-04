const fs = require('fs');
const path = require('path');

function readFile(filepath) {
  const _filepath = filepath || `${path.basename(__dirname)}/${path.basename(__filename).slice(0, -3)}.txt`;
  return fs.readFileSync(_filepath, { encoding: 'utf-8' });
}

function getPassports() {
  return readFile()
    .split('\n\n')
    .map((x) =>
      x
        .replace(/\n/g, ' ')
        .split(' ')
        .reduce((acc, curr) => {
          const [key, value] = curr.split(':');
          acc[key] = value;
          return acc;
        }, {})
    );
}

const validFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'];
const hasValidFields = (passport) => {
  const nKeys = Object.keys(passport).length;
  return (
    nKeys === validFields.length ||
    (nKeys === validFields.length - 1 && !passport['cid'])
  );
};

const numberIsInRange = (num, low, high) => num >= low && num <= high;

const heightIsValid = (hgt) => {
  const unit = hgt.slice(-2);
  const val = hgt.slice(0, -2);

  if (!unit.match(/(cm|in)/)) return false;

  return unit === 'cm'
    ? numberIsInRange(Number(val), 150, 193)
    : numberIsInRange(Number(val), 59, 76);
};

const hairColorIsValid = (hcl) => {
  if (hcl[0] !== '#' || hcl.length !== 7) return false;
  return (hcl.slice(1).match(/[a-f0-9]/g) || []).length === 6;
};

const ecls = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);
const eyeColorIsValid = (ecl) => ecls.has(ecl);

const pidIsValid = (pid) => (pid.match(/[0-9]/g) || []).length === 9;

function getPartOneAnswer() {
  const passports = getPassports();
  return passports.filter((x) => hasValidFields(x)).length;
}

function getPartTwoAnswer() {
  const passports = getPassports();
  return passports.filter((x) => {
    const { byr, iyr, eyr, hgt, hcl, ecl, pid } = x;
    return (
      hasValidFields(x) &&
      numberIsInRange(Number(byr), 1920, 2002) &&
      numberIsInRange(Number(iyr), 2010, 2020) &&
      numberIsInRange(Number(eyr), 2020, 2030) &&
      heightIsValid(hgt) &&
      hairColorIsValid(hcl) &&
      eyeColorIsValid(ecl) &&
      pidIsValid(pid)
    );
  }).length;
}

console.log('Part One', getPartOneAnswer());
console.log('Part Two', getPartTwoAnswer());

const fs = require('fs');
const path = require('path');

function readFile(filepath) {
  const _filepath = filepath || `${path.basename(__dirname)}/${path.basename(__filename).slice(0, -3)}.txt`;
  return fs.readFileSync(_filepath, { encoding: 'utf-8'});
}

function getData() {
  return readFile().split('\n');
}

const validFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'];

function getPartOneAnswer() {;
  const data = getData();
  let passports = [];
  let passport = {};
  for (let i = 0; i < data.length; i++) {
    
    if (data[i].length === 0) {
      passports.push(passport);
      passport = {};
    } else {
      const args = data[i].split(' ');
      for (a of args) {
        const [key, value ] = a.split(':');
        passport[key] = value;
      }
    }
    
    if(i === data.length - 1) {
      passports.push(passport);
      passport = {};
    }
  }
  
  // let validPassportCount = 0;
  let validPassports = [];
  for (p of passports) {
    const nkeys = Object.keys(p).length;
    if( nkeys === validFields.length) {
      // validPassportCount++;
      validPassports.push(p);
    } else if ((nkeys === validFields.length - 1) && !p['cid']) {
      // validPassportCount++;
      validPassports.push(p);
    }
  }
  return validPassports;
}

function getPartTwoAnswer() {

  const firstPass = getPartOneAnswer();

  let validCount = 0;
  for (p of firstPass) {
    const { byr, iyr, eyr, hgt, hcl, ecl, pid } = p;
    
    let fail = false;

    if (Number(byr) < 1920 || Number(byr) > 2002 ) fail = true;

    if (Number(iyr) < 2010 || Number(iyr) > 2020 ) fail = true;

    if (Number(eyr) < 2020 || Number(eyr) > 2030 ) fail = true;

    const unit = hgt.slice(-2);
    const val = hgt.slice(0, -2);
    if (unit === 'cm') {
      if (Number(val) < 150 || Number(val) > 193 ) fail = true;
    } else if (unit === 'in') {
      if (Number(val) < 59 || Number(val) > 76 ) fail = true;
    } else {
      fail = true;
    }


    if (hcl[0] !== '#' || hcl.length !== 7) fail = true; 
    if ((hcl.slice(1).match(new RegExp(/[a-f0-9]/, 'g')) || []).length !== 6) fail = true;

    const ecls = new Set(['amb','blu','brn', 'gry', 'grn', 'hzl', 'oth']);
    if (!ecls.has(ecl)) fail = true;

    if ((pid.match(new RegExp(/[0-9]/, 'g')) || []).length !== 9) fail = true;

    
    if (!fail) validCount++;
  }
  return validCount;
}

console.log('Part One', getPartOneAnswer().length);
console.log('Part Two', getPartTwoAnswer());

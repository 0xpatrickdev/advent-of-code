const data = [3,225,1,225,6,6,1100,1,238,225,104,0,1102,46,47,225,2,122,130,224,101,-1998,224,224,4,224,1002,223,8,223,1001,224,6,224,1,224,223,223,1102,61,51,225,102,32,92,224,101,-800,224,224,4,224,1002,223,8,223,1001,224,1,224,1,223,224,223,1101,61,64,225,1001,118,25,224,101,-106,224,224,4,224,1002,223,8,223,101,1,224,224,1,224,223,223,1102,33,25,225,1102,73,67,224,101,-4891,224,224,4,224,1002,223,8,223,1001,224,4,224,1,224,223,223,1101,14,81,225,1102,17,74,225,1102,52,67,225,1101,94,27,225,101,71,39,224,101,-132,224,224,4,224,1002,223,8,223,101,5,224,224,1,224,223,223,1002,14,38,224,101,-1786,224,224,4,224,102,8,223,223,1001,224,2,224,1,223,224,223,1,65,126,224,1001,224,-128,224,4,224,1002,223,8,223,101,6,224,224,1,224,223,223,1101,81,40,224,1001,224,-121,224,4,224,102,8,223,223,101,4,224,224,1,223,224,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,1008,677,226,224,1002,223,2,223,1005,224,329,1001,223,1,223,107,677,677,224,102,2,223,223,1005,224,344,101,1,223,223,1107,677,677,224,102,2,223,223,1005,224,359,1001,223,1,223,1108,226,226,224,1002,223,2,223,1006,224,374,101,1,223,223,107,226,226,224,1002,223,2,223,1005,224,389,1001,223,1,223,108,226,226,224,1002,223,2,223,1005,224,404,1001,223,1,223,1008,677,677,224,1002,223,2,223,1006,224,419,1001,223,1,223,1107,677,226,224,102,2,223,223,1005,224,434,1001,223,1,223,108,226,677,224,102,2,223,223,1006,224,449,1001,223,1,223,8,677,226,224,102,2,223,223,1006,224,464,1001,223,1,223,1007,677,226,224,1002,223,2,223,1006,224,479,1001,223,1,223,1007,677,677,224,1002,223,2,223,1005,224,494,1001,223,1,223,1107,226,677,224,1002,223,2,223,1006,224,509,101,1,223,223,1108,226,677,224,102,2,223,223,1005,224,524,1001,223,1,223,7,226,226,224,102,2,223,223,1005,224,539,1001,223,1,223,8,677,677,224,1002,223,2,223,1005,224,554,101,1,223,223,107,677,226,224,102,2,223,223,1006,224,569,1001,223,1,223,7,226,677,224,1002,223,2,223,1005,224,584,1001,223,1,223,1008,226,226,224,1002,223,2,223,1006,224,599,101,1,223,223,1108,677,226,224,102,2,223,223,1006,224,614,101,1,223,223,7,677,226,224,102,2,223,223,1005,224,629,1001,223,1,223,8,226,677,224,1002,223,2,223,1006,224,644,101,1,223,223,1007,226,226,224,102,2,223,223,1005,224,659,101,1,223,223,108,677,677,224,1002,223,2,223,1006,224,674,1001,223,1,223,4,223,99,226];

function IntCodeComputer(data, input) {

  let pointer = 0;

  const handleOpcode = (opcode, i, paramCode) => {
    
    const args = String(paramCode).slice(0,-2).split('').reverse().map(Number);
    
    const param1 = paramCode && args[0] ? data[i + 1] : data[data[i + 1]];
    const param2 = paramCode && args[1] ? data[i + 2] : data[data[i + 2]];

    switch (opcode) {
      case 1:
        // 1: add
        data[data[i + 3]] = param1 + param2;
        // # args + 1
        pointer = 4;
        break;
      case 2:
        // 2: multiply
        data[data[i + 3]] = param1 * param2;
        // # args + 1
        pointer = 4;
        break;
      case 3:
        // 3: takes input as arg and stores @ param
        data[data[i + 1]] = input;
        // # args + 1
        pointer = 2;
        break;
      case 4:
        // 4: outputs value of param
        console.log(`DEBUG: ${data[data[i + 1]]}`);
        pointer = 2;
        break;
      case 99:
        // 99: end program now
        console.log('PROGRAM ENDED');
        return data[0];
      default:
        throw new Error('inavlid opcode');
      }
    return
  }


  const opCodes = new Set([1, 2, 3, 4, 99]);

  for (let i = 0; i < data.length; i+= pointer) {
    // console.log({i, pointer});
    const opcode = data[i];
    
    if (opCodes.has(opcode)) {
      const res = handleOpcode(opcode, i);
      // end program @ 99
      if (res) {
        return console.log(res);
      }
    } else {
      const newOpcode = Number(String(opcode).slice(-2));
      const res = handleOpcode(newOpcode, i, opcode);
      // end program @ 99
      if (res) {
        return console.log(res);
      }
    }
    
  }
}


IntCodeComputer(data, 1);
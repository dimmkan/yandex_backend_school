const fs = require('fs');

function getMinDataCenter(matrix, resets, dc_counts) {
  let min = resets[0] * matrix[0].filter(item => item === 1).length;
  let min_number = 1;
  for(let i = 1; i < dc_counts; i++) {
    const local_min = resets[i] * matrix[i].filter(item => item === 1).length;
    if(min > local_min) {
      min = local_min;
      min_number = i + 1;
    }
  }
  return min_number;
};

function getMaxDataCenter(matrix, resets, dc_counts) {
  let max = resets[0] * matrix[0].filter(item => item === 1).length;
  let max_number = 1;
  for(let i = 1; i < dc_counts; i++) {
    const local_max = resets[i] * matrix[i].filter(item => item === 1).length;
    if(max < local_max) {
      max = local_max;
      max_number = i + 1;
    }
  }
  return max_number;
}

const RE_EOL = /\r?\n/;
const text = fs.readFileSync('input.txt', "utf8");
const splitLines = text.split(RE_EOL);
const [dcCounts, serverCounts, lineCounts] = splitLines.shift().split(' ').map(item => ~~item);

const serversMatrix = Array(dcCounts).fill(1).map(() => Array(serverCounts).fill(1));
const resetArray = Array(dcCounts).fill(0);

for(let i = 0; i < lineCounts; i++) {
  const [command, ...args] = splitLines[i].split(' ');
  switch (command) {
    case 'DISABLE':
      serversMatrix[~~args[0] - 1][~~args[1] - 1] = 0;
      break;
    case 'RESET':
      serversMatrix[~~args[0] - 1].fill(1);
      resetArray[~~args[0] - 1] += 1;
      break;
    case 'GETMIN':
      console.log(getMinDataCenter(serversMatrix, resetArray, dcCounts));
      break;
    case 'GETMAX':
      console.log(getMaxDataCenter(serversMatrix, resetArray, dcCounts));
      break;
    default:
      break;
  }
}

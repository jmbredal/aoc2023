import { readLines } from '../utils.js';

const inputFile = 'input.txt';
const test1File = 'test.txt';

const numWins = ([time, distance]) => {
  const discriminant = time * time - 4 * (distance + 1);
  const root1 = (-time + Math.sqrt(discriminant)) / (2 * 1);
  const root2 = (-time - Math.sqrt(discriminant)) / (2 * 1);
  const min = Math.ceil(Math.abs(root1));
  const max = Math.floor(Math.abs(root2));

  return max - min + 1;
}

function solve1(input) {
  const [time, distance] = readLines(input)
    .map(l => l.split(/\s+/).slice(1).map(Number));

  return time.zip(distance).map(numWins).reduce((acc, curr) => acc * curr);
}

function solve2(input) {
  const [time, distance] = readLines(input)
    .map(l => +l.split(/\s+/).slice(1).join(''));

  return numWins([time, distance]);
};

console.log('-----------');
console.log(solve1(test1File));
console.log(solve1(inputFile));
console.log(solve2(test1File));
console.log(solve2(inputFile));

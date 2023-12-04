import { readLines } from '../utils.js';

const inputFile = 'input.txt';
const test1File = 'test1.txt';
const test2File = 'test2.txt';

const parse = (word) => {
  const index = +word.match(/Game (\d+)/)[1];

  const red = Array.from(word.matchAll(/(\d+) red/g)).map(a => +a[1]).max();
  const blue = Array.from(word.matchAll(/(\d+) blue/g)).map(a => +a[1]).max();
  const green = Array.from(word.matchAll(/(\d+) green/g)).map(a => +a[1]).max();

  return { index, red, blue, green };
}

const possible = game => {
  // only 12 red cubes, 13 green cubes, and 14 blue cubes
  return game.red <= 12 && game.green <= 13 && game.blue <= 14;
};

function solve1(input) {
  return readLines(input).map(parse).filter(possible).map(g => g.index).sum();
}

const power = (game) => {
  return game.red * game.green * game.blue;
}

function solve2(input) {
  return readLines(input).map(parse).map(power).sum();
}

console.log('-----------');
// console.log(solve1(test1File));
// console.log(solve1(inputFile));
console.log(solve2(test1File));
console.log(solve2(inputFile));

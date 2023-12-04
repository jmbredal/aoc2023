import { readLines } from '../utils.js';

const inputFile = 'input.txt';
const test1File = 'test1.txt';
const test2File = 'test2.txt';

const findNums = word => word.match(/\d/g);
const getFirstLast = numList => numList[0] + numList[numList.length - 1];

function solve1(input) {
  const words = readLines(input).map(findNums).map(getFirstLast).toNumbers().sum();

  return words;
}

const numDigits = '123456789'.split('');
const wordDigits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const getMatches = word => {
  const matches = getDigits(word, wordDigits)
    .concat(getDigits(word, numDigits))
    .sort((a, b) => a.index - b.index)
    .map(d => d.digit);

  return matches;
}

const getDigits = (word, digits) => {
  return digits.flatMap((wd, index) => {
    return [...word.matchAll(new RegExp(wd, 'gi'))].map((mo) => (
      { digit: '' + (index + 1), index: mo.index }
    ));
  });
}

function solve2(input) {
  return readLines(input).map(getMatches).map(getFirstLast).toNumbers().sum();
}

console.log('-----------');
console.log(solve2(test2File));
console.log(solve2(inputFile));

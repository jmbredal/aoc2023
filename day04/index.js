import { readLines } from '../utils.js';

const inputFile = 'input.txt';
const test1File = 'test1.txt';
const test2File = 'test2.txt';

const getScore = card => Math.pow(2, card.length - 1);
const parse = (line) => line.split(':')[1].split('|').map(l => l.trim().split(/\s+/).toNumbers());
const getWinning = card => [...new Set(card[0]).intersection(new Set(card[1]))];

function solve1(input) {
  return readLines(input).map(parse).map(getWinning).filter(x => x.length > 0).map(getScore).sum();
}

function solve2(input) {
  const cards = readLines(input)
    .map(parse)
    .map(getWinning)
    .map((x, index) => ({
      winningNums: x.length,
      index
    }));

  function count(card, counter) {
    counter++;

    const startIndex = card.index + 1;
    for (let index = startIndex; index < startIndex + card.winningNums; index++) {
      const _card = cards[index];
      if (_card) {
        counter = count(_card, counter);
      }
    }

    return counter;
  }

  return cards.map((c, i) => count(cards[i], 0)).sum();
};

console.log('-----------');
// console.log(solve1(test1File));
// console.log(solve1(inputFile));
console.log(solve2(test1File));
console.log(solve2(inputFile));

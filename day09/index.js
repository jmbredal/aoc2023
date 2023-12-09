import { readLines } from "../utils.js";

const inputFile = "input.txt";
const testFile = "test.txt";

const getDifferences = (sequence) =>
  sequence.reduce((seq, num, index, arr) => {
    if (index === arr.length - 1) return seq;
    seq.push(arr[index + 1] - num);
    return seq;
  }, []);

const getHistory = (sequence) => {
  const history = [sequence];
  while (!sequence.every((n) => n === 0)) {
    sequence = getDifferences(sequence);
    history.push(sequence);
  }

  return history;
};

const findNextValue = (history) => {
  return history
    .reverse()
    .map((h) => h.pop())
    .sum();
};

function solve1(input) {
  const sequences = readLines(input).map((l) => l.split(" ").map(Number));

  return sequences.map(getHistory).map(findNextValue).sum();
}

const findNextValue2 = (history) => {
  return history
    .reverse()
    .map((h) => h[0])
    .reduce((acc, curr, index, arr) => {
      if (index === arr.length - 1) return acc;
      acc = arr[index + 1] - acc;
      return acc;
    }, 0);
};

function solve2(input) {
  const sequences = readLines(input).map((l) => l.split(" ").map(Number));

  return sequences.map(getHistory).map(findNextValue2).sum();
}

console.log("-----------");
// console.log(solve1(testFile));
// console.log(solve1(inputFile));
console.log(solve2(testFile));
console.log(solve2(inputFile));

import { readSplitLines } from "../utils.js";

const inputFile = "input.txt";
const testFile = "test.txt";

function solve1(input) {
  const [path, rawNetwork] = readSplitLines(input);
  const network = rawNetwork.split("\n").reduce((map, node) => {
    const [key, left, right] = [
      ...node.match(/(\w{3}) =.+(\w{3}).+(\w{3})/),
    ].slice(1);

    map[key] = [left, right];
    return map;
  }, {});

  let index = 0;
  let target = "AAA";
  while (target != "ZZZ") {
    const instruction = path[index % path.length];
    target = instruction === "L" ? network[target][0] : network[target][1];
    index++;
  }

  return index;
}

function solve2(input) {}

console.log("-----------");
// console.log(solve1(testFile));
// console.log(solve1(inputFile));
console.log(solve2(testFile));
// console.log(solve2(inputFile));

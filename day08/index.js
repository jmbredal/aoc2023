import { readSplitLines } from "../utils.js";

const inputFile = "input.txt";
const testFile = "test.txt";

function createNetwork(rawNetwork) {
  return rawNetwork.split("\n").reduce((map, node) => {
    const [key, left, right] = [
      ...node.match(/(\w{3}) =.+(\w{3}).+(\w{3})/),
    ].slice(1);

    map[key] = [left, right];
    return map;
  }, {});
}

const findSteps = (target, path, network) => {
  let index = 0;
  while (target != "ZZZ") {
    const instruction = path[index % path.length];
    target = instruction === "L" ? network[target][0] : network[target][1];
    index++;
  }

  return index;
};

const findSteps2 = (target, path, network) => {
  let index = 0;
  while (target[2] !== "Z") {
    const instruction = path[index % path.length];
    target = instruction === "L" ? network[target][0] : network[target][1];
    index++;
  }

  return index;
};

function solve1(input) {
  const [path, rawNetwork] = readSplitLines(input);
  const network = createNetwork(rawNetwork);

  return findSteps("AAA", path, network);
}

function gcd(a, b) {
  if (b == 0) return a;
  return gcd(b, a % b);
}

// Returns LCM of array elements
function findlcm(arr) {
  // Initialize result
  const n = arr.length;
  let ans = arr[0];

  // ans contains LCM of arr[0], ..arr[i]
  // after i'th iteration,
  for (let i = 1; i < n; i++) ans = (arr[i] * ans) / gcd(arr[i], ans);

  return ans;
}

function solve2(input) {
  const [path, rawNetwork] = readSplitLines(input);
  const network = createNetwork(rawNetwork);

  const targets = Object.keys(network).filter((k) => k[2] === "A");
  const mapSteps = (target) => findSteps2(target, path, network);
  const paths = targets.map(mapSteps);

  return findlcm(paths);
}

console.log("-----------");
// console.log(solve1(testFile));
console.log(solve1(inputFile));
console.log(solve2(testFile));
console.log(solve2(inputFile));

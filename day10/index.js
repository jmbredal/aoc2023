import { readLines } from "../utils.js";

const inputFile = "input.txt";
const testFile = "test.txt";

const getStartPoint = (map) =>
  map.reduce((start, line, y) => {
    const x = line.indexOf("S");
    if (x > -1) {
      return [x, y];
    }
    return start;
  }, []);

const getVector = (point1, point2) => {
  return [point2[0] - point1[0], point2[1] - point1[1]];
}

const addVector = (point, vector) => {
  return [point[0] + vector[0], point[1] + vector[1]];
}

const traverse = (previousPoint, currentPoint, map) => {
  const x = currentPoint[0];
  const y = currentPoint[1];
  const tile = map[y][x];

  const previousDir = getVector(currentPoint, previousPoint);

  const vectors = {
    "-": [[-1, 0], [1, 0]],
    "|": [[0, -1], [0, 1]],
    "F": [[0, 1], [1, 0]],
    "L": [[0, -1], [1, 0]],
    "J": [[-1, 0], [0, -1]],
    "7": [[0, 1], [-1, 0]],
  }

  const isNotPreviousDir = v => !(v[0] === previousDir[0] && v[1] === previousDir[1]);
  const newVector = vectors[tile].filter(isNotPreviousDir)[0];
  const newPoint = addVector(currentPoint, newVector);

  return newPoint;
}

function solve1(input) {
  const map = readLines(input);
  const startPoint = getStartPoint(map);

  // Kickstart search down
  let previousPoint = startPoint;
  let current = addVector(startPoint, [0, 1]);
  let counter = 1;

  while (map[current[1]][current[0]] !== 'S') {
    const next = traverse(previousPoint, current, map);
    previousPoint = current;
    current = next;
    counter++;
  }

  return counter / 2;
}

function solve2(input) { }

console.log("-----------");
console.log(solve1(testFile));
console.log(solve1(inputFile));
// console.log(solve2(testFile));
// console.log(solve2(inputFile));

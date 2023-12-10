import { start } from "repl";
import { readLines } from "../utils.js";

const inputFile = "input.txt";
const testFile = "test.txt";

class Point {}

const getStartPoint = (map) =>
  map.reduce((start, line, y) => {
    const x = line.indexOf("S");
    if (x > -1) {
      return [x, y];
    }
    return start;
  }, []);

const getRelativePoint = (position, vector) => {
  return [position[0] + vector[0], position[1] + vector[1]];
};

const getValue = (point, map) => {
  const x = point[0];
  const y = point[1];
  return map[y][x];
};

const getExits = (position, map) => {
  const exits = [];
  const west = "-LF";
  const east = "-7J";
  const north = "|F7";
  const south = "|JL";

  const eastPoint = getRelativePoint(position, [1, 0], map);
  const eastValue = getValue(eastPoint, map);
  const westPoint = getRelativePoint(position, [-1, 0], map);
  const westValue = getValue(westPoint, map);
  const northPoint = getRelativePoint(position, [0, -1], map);
  const northValue = getValue(northPoint, map);
  const southPoint = getRelativePoint(position, [0, 1], map);
  const southValue = getValue(southPoint, map);
  if (east.includes(eastValue)) exits.push(eastPoint);
  if (west.includes(westValue)) exits.push(westPoint);
  if (north.includes(northValue)) exits.push(northPoint);
  if (south.includes(southValue)) exits.push(southPoint);

  return exits;
};

const pointToString = (point) => `${point[0]}:${point[1]}`;

const buildLoop = (map, startPoint) => {
  let position = startPoint;
  const visited = [pointToString(startPoint)];
  // choose one
  let current = getExits(position, map)[0];
  const path = [];

  console.log(visited, current);

  while (true) {
    visited.push(pointToString(current));
    const exits = getExits(current, map).filter(
      (e) => !visited.includes(pointToString(e))
    );
    console.log(exits);
    // if (!exit) break;
    // current = exit;
    // path.push(pointToString(exit));
    break;
  }

  return path;
};

function solve1(input) {
  const map = readLines(input);
  const startPoint = getStartPoint(map);
  const loop = buildLoop(map, startPoint);

  return loop;
}

function solve2(input) {}

console.log("-----------");
console.log(solve1(testFile));
// console.log(solve1(inputFile));
// console.log(solve2(testFile));
// console.log(solve2(inputFile));

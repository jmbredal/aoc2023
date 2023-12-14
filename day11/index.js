import { readLines } from "../utils.js";

const rotateRight = (map) => {
  return map[0].split('').map((val, index) => map.map(row => row[index]).reverse().join(''));
}

const getExpandingRows = (map) => {
  return map.map((line, index) => {
    if (!line.includes('#')) return index;
  }).filter(x => x > -1);
}

const getExpandingColumns = (map) => {
  return rotateRight(map).map((line, index) => {
    if (!line.includes('#')) return index;
  }).filter(x => x > -1);
}

const findGalaxies = (line, y) => {
  return Array.from(line).reduce((indexes, char, x) => {
    if (char === "#") indexes.push([x, y]);
    return indexes;
  }, []);
}

const getCombinations = (galaxy, index, galaxies) => galaxies.slice(index + 1).map(galaxy2 => [galaxy, galaxy2]);

const getDistance = (pair, factor, expandingColumns, expandingRows) => {
  const [galaxyA, galaxyB] = pair;
  const [x1, y1] = galaxyA;
  const [x2, y2] = galaxyB;

  const [xMin, xMax] = [x1, x2].sort((a, b) => a - b);
  const expansionX = expandingColumns.reduce((acc, curr) => {
    if (xMax >= curr && xMin <= curr) return acc + factor;
    return acc;
  }, 0);

  const [yMin, yMax] = [y1, y2].sort((a, b) => a - b);
  const expansionY = expandingRows.reduce((acc, curr) => {
    if (yMax >= curr && yMin <= curr) return acc + factor;
    return acc;
  }, 0);
  const distance = (xMax - xMin) + expansionX + (yMax - yMin) + expansionY;
  return distance
}

function solve1(input) {
  const map = readLines(input);
  const expandingRows = getExpandingRows(map);
  const expandingColumns = getExpandingColumns(map);
  const getDistanceFactorOne = (pair) => getDistance(pair, 1, expandingColumns, expandingRows);

  const galaxies = map
    .flatMap(findGalaxies)
    .flatMap(getCombinations)
    .map(getDistanceFactorOne)
    .sum();

  return galaxies;
}

function solve2(input) {
  const map = readLines(input);
  const expandingRows = getExpandingRows(map);
  const expandingColumns = getExpandingColumns(map);
  const getDistanceFactorTen = (pair) => getDistance(pair, 999999, expandingColumns, expandingRows);

  const galaxies = map
    .flatMap(findGalaxies)
    .flatMap(getCombinations)
    .map(getDistanceFactorTen)
    .sum()

  return galaxies;
}

const inputFile = "input.txt";
const testFile = "test.txt";

console.log("-----------");
console.log(solve1(testFile));
console.log(solve1(inputFile));
console.log(solve2(testFile));
console.log(solve2(inputFile));

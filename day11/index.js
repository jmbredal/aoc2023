import { readLines } from "../utils.js";

const rotateRight = (map) => {
  return map[0].split('').map((val, index) => map.map(row => row[index]).reverse().join(''));
}


function solve1(input) {
  const map = readLines(input);

  // console.log(map);

  const getExpandingRows = () => {
    return map.map((line, index) => {
      if (!line.includes('#')) return index;
    }).filter(x => x > -1);
  }

  const expandingRows = getExpandingRows(map);
  // console.log('expandingRows', expandingRows);

  const getExpandingColumns = () => {
    return rotateRight(map).map((line, index) => {
      if (!line.includes('#')) return index;
    }).filter(x => x > -1);
  }

  const expandingColumns = getExpandingColumns(map);
  // console.log('expandingColumns', expandingColumns);

  const findGalaxies = (line, y) => {
    return Array.from(line).reduce((indexes, char, x) => {
      if (char === "#") indexes.push([x, y]);
      return indexes;
    }, []);
  }

  const getDistance = (pair) => {
    const [galaxyA, galaxyB] = pair;
    const [x1, y1] = galaxyA;
    const [x2, y2] = galaxyB;

    const [xMin, xMax] = [x1, x2].sort((a, b) => a - b);
    const expansionX = expandingColumns.reduce((acc, curr) => {
      if (xMax > curr && xMin < curr) return acc + 1;
      return acc;
    }, 0);

    const [yMin, yMax] = [y1, y2].sort((a, b) => a - b);
    const expansionY = expandingRows.reduce((acc, curr) => {
      if (yMax > curr && yMin < curr) return acc + 1;
      return acc;
    }, 0);

    const distance = (xMax - xMin) + expansionX + (yMax - yMin) + expansionY;
    // console.log(pair, expansionX, expansionY, xMax - xMin, yMax - yMin, distance);
    return distance
  }

  const getCombinations = (galaxy, index, galaxies) => galaxies.slice(index + 1).map(galaxy2 => [galaxy, galaxy2]);

  const galaxies = map
    .flatMap(findGalaxies)
    .flatMap(getCombinations)
    .map(getDistance)
    .sum()

  return galaxies;
}

const inputFile = "input.txt";
const testFile = "test.txt";

console.log("-----------");
console.log(solve1(testFile));
console.log(solve1(inputFile));
// console.log(solve2(testFile));
// console.log(solve2(inputFile));

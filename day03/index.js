import { readLines } from '../utils.js';

const inputFile = 'input.txt';
const test1File = 'test1.txt';
const test2File = 'test2.txt';

function solve1(input) {
  const lines = readLines(input);
  const maxX = lines[0].length - 1;
  const maxY = lines.length - 1;

  const findNumbers = (line, index) => {
    return Array.from(line.matchAll(/\d+/g)).map(mo => ({
      number: mo[0],
      x: mo.index,
      y: index,
      length: mo[0].length
    }));
  }

  const findNeighbors = (match) => {
    const ns = [];

    // left
    ns.push([match.x - 1, match.y])
    // right
    ns.push([match.x + match.length, match.y])

    const leftStart = match.x - 1;
    const rightEnd = match.x + match.length;

    for (let xx = leftStart; xx <= rightEnd; xx++) {
      ns.push([xx, match.y - 1]);
      ns.push([xx, match.y + 1]);
    }

    const notOutOfBounds = (point) => {
      const isNegative = point[0] < 0 || point[1] < 0;
      const isOutsideX = point[0] > maxX;
      const isOutsideY = point[1] > maxY;

      return !(isNegative || isOutsideX || isOutsideY);
    }

    return {
      number: match.number,
      ns: ns.filter(notOutOfBounds).map(n => lines[n[1]][n[0]]) // map to symbol
    };
  };

  const hasSymbolNeighbor = (number) => {
    return number.ns.filter(symbol => symbol !== '.' && !symbol.match(/\d/)).length > 0;
  }

  return lines.flatMap(findNumbers)
    .map(findNeighbors)
    .filter(hasSymbolNeighbor)
    .map(n => +n.number)
    .sum();
}

function solve2(input) {
  const lines = readLines(input);
  const maxX = lines[0].length - 1;
  const maxY = lines.length - 1;

  const numberMap = new Map();

  lines.forEach((line, index) => {
    Array.from(line.matchAll(/\d+/g)).forEach(mo => {
      for (let xx=mo.index; xx < mo.index + mo[0].length; xx++) {
        numberMap.set(`${xx}:${index}`, `${mo.index}:${index}:${mo[0]}`)
      }
    });
  });

  const getStars = (line, index) => {
    return Array.from(line.matchAll(/\*/g)).map((mo) => ({
      x: mo.index,
      y: index,
    }));
  };

  const findNeighbors = (point) => {
    const ns = [];

    // left
    ns.push([point.x - 1, point.y])
    // right
    ns.push([point.x + 1, point.y])

    // top three
    ns.push([point.x - 1, point.y - 1])
    ns.push([point.x, point.y - 1])
    ns.push([point.x + 1, point.y - 1])
    // bottom three
    ns.push([point.x - 1, point.y + 1])
    ns.push([point.x, point.y + 1])
    ns.push([point.x + 1, point.y + 1])

    const notOutOfBounds = (point) => {
      const isNegative = point[0] < 0 || point[1] < 0;
      const isOutsideX = point[0] > maxX;
      const isOutsideY = point[1] > maxY;

      return !(isNegative || isOutsideX || isOutsideY);
    }

    return {
      point,
      ns: ns.filter(notOutOfBounds),
    };
  };

  const getNumberNeigbors = (point) => {
    return point.ns.map(p => {
      const key = p[0] + ':' + p[1];
      return numberMap.get(key);
    })
    .filter(x => x)
    .unique()
  };

  const unpack = (l) => l.map(x => +x.split(':')[2]);

  const getRatio = ([a, b]) => a * b;

  return lines.flatMap(getStars)
    .map(findNeighbors)
    .map(getNumberNeigbors)
    .filter(l => l.length === 2)
    .map(unpack)
    .map(getRatio)
    .sum()
};

console.log('-----------');
// console.log(solve1(test1File));
// console.log(solve1(inputFile));
console.log(solve2(test1File));
console.log(solve2(inputFile));

//  63975493
//  74528807

import { readSplitLines, xrange, chunk } from '../utils.js';

const inputFile = 'input.txt';
const test1File = 'test1.txt';
const test2File = 'test2.txt';

const createMapping = (data) => {
  const lookup = data
    .split('\r\n')
    .slice(1)
    .map(l => l.split(' ').toNumbers())

  return (x) => {
    for (const r of lookup) {
      if (x >= r[1] && x < r[1] + r[2]) {
        const asd = x - r[1];
        return r[0] + asd;
      }
    }
    return x;
  }
}

function solve1(input) {
  const data = readSplitLines(input);
  const seeds = data[0].split(': ')[[1]].split(' ').toNumbers();
  const maps = data.slice(1).map(createMapping);

  const applyMappings = (value, mapping) => mapping(value);
  const composeMappings = (value, mappings) => mappings.reduce(applyMappings, value);

  return seeds.map(seed => composeMappings(seed, maps)).min();
}

function solve2(input) {
  const data = readSplitLines(input);

  const rangeGenerators = chunk(data[0].split(': ')[[1]].split(' ').toNumbers(), 2)
    .flatMap(([a, b]) => xrange(b, a));

  const maps = data.slice(1).map(createMapping);
  const applyMappings = (value, mapping) => mapping(value);
  const mapSeed = s => maps.reduce(applyMappings, s);

  let minLocation = Number.MAX_VALUE;
  // Brute the force Luke
  for (const generator of rangeGenerators) {
    for (const seed of generator) {
      const location = mapSeed(seed);
      if (location < minLocation) minLocation = location;
    }
  }

  return minLocation;
};

console.log('-----------');
console.log(solve1(test1File));
console.log(solve1(inputFile));
console.log(solve2(test1File));
// console.log(solve2(inputFile));

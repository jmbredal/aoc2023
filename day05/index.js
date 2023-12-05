import { readSplitLines, range } from '../utils.js';

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
  const seedToSoil = createMapping(data[1]);
  const soilToFertilizer = createMapping(data[2]);
  const fertilizerToWater = createMapping(data[3]);
  const waterToLight = createMapping(data[4]);
  const lightToTemp = createMapping(data[5]);
  const tempToHumidity = createMapping(data[6]);
  const humidityToLocation = createMapping(data[7]);

  const result = seeds
    .map(seedToSoil)
    .map(soilToFertilizer)
    .map(fertilizerToWater)
    .map(waterToLight)
    .map(lightToTemp)
    .map(tempToHumidity)
    .map(humidityToLocation)
    .min();
  return result;
}

function solve2(input) {
  return readLines(input)
};

console.log('-----------');
console.log(solve1(test1File));
console.log(solve1(inputFile));
// console.log(solve2(test1File));
// console.log(solve2(inputFile));

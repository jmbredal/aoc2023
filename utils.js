import { readFileSync } from "fs";

Array.prototype.toNumbers = function () {
  return this.map((x) => +x);
};

Array.prototype.unique = function () {
  return [...new Set(this)];
};

Array.prototype.toMap = function () {
  return new Map(this);
};

Array.prototype.sum = function () {
  return this.reduce((a, b) => a + b, 0);
};

Array.prototype.max = function () {
  return Math.max(...this);
};

Array.prototype.min = function () {
  return Math.min(...this);
};

Array.prototype.zip = function (other) {
  return this.map((k, i) => [k, other[i]]);
};

Set.prototype.intersection = function (otherSet) {
  return new Set([...this].filter((x) => otherSet.has(x)));
};

if (typeof Array.prototype.flatMap !== "function") {
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(Array.prototype, "flatMap", {
    enumerable: false,
    // https://bterlson.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
    value: function flatMap(callback, thisArg = undefined) {
      const O = toObject(this);
      const A = arraySpeciesCreate(O, 0);
      // typo in the github pages render, it's missing
      // the ", 1" argument, but it is present in
      // the master source code
      flattenIntoArray(A, O, 0, 1, callback, thisArg);
      return A;
    },
  });
}

export function chunk(arr, size) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

export function range(size, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt);
}

export function* xrange(size, startAt = 0) {
  for (let i = 0; i < size; i++) {
    yield i + startAt;
  }
}

export function groupBy(array, key) {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
}

function getLineEnding(fileContent) {
  return /\r\n/.test(fileContent) ? "\r\n" : "\n";
}

function getFileAsText(filename) {
  return readFileSync(filename).toString();
}

export function readLines(filename) {
  const fileContent = getFileAsText(filename);
  const lineEnding = getLineEnding(fileContent);

  return fileContent.split(lineEnding).filter(Boolean);
}

export function readSplitLines(filename) {
  const fileContent = getFileAsText(filename);
  const lineEnding = getLineEnding(fileContent);

  return fileContent.split(lineEnding + lineEnding).filter(Boolean);
}

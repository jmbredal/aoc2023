import { readFileSync } from 'fs';

Array.prototype.toNumbers = function() {
  return this.map(x => +x);
}

Array.prototype.unique = function() {
  return [...new Set(this)];
}

Array.prototype.sum = function() {
  return this.reduce((a, b) => a + b, 0);
}

Array.prototype.max = function() {
  return Math.max(...this);
}


if (typeof Array.prototype.flatMap !== 'function') {
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(Array.prototype, 'flatMap', {
    enumerable: false,
    // https://bterlson.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
    value: function flatMap (callback, thisArg = undefined) {
      const O = toObject(this)
      const A = arraySpeciesCreate(O, 0)
      // typo in the github pages render, it's missing
      // the ", 1" argument, but it is present in
      // the master source code
      flattenIntoArray(A, O, 0, 1, callback, thisArg)
      return A
    }
  })
}

export function readLines(filename) {
  return readFileSync(filename).toString().split('\r\n').filter(l => l);
}
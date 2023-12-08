import { groupBy, readLines } from "../utils.js";

const inputFile = "input.txt";
const testFile = "test.txt";

const createHand = (line) => {
  const [cards, bid] = line.split(" ");
  return {
    cards,
    bid: +bid,
  };
};

const groupByCards = (group, card) => {
  if (group[card]) {
    group[card]++;
  } else {
    group[card] = 1;
  }
  return group;
};

const getValue = (group) => {
  // Higher is better
  if (Object.keys(group).length === 1) return 7; // 5 like
  if (Object.keys(group).length === 2) {
    if (Object.values(group).max() === 4) return 6; // 4 like
    if (Object.values(group).max() === 3) return 5; // hus
  }
  if (Object.keys(group).length === 3) {
    if (Object.values(group).max() === 3) return 4; // 3 like
    if (Object.values(group).max() === 2) return 3; // 2 par
  }
  if (Object.keys(group).length === 4) return 2; // et par

  return 1;
};

const fillValue = (hand) => {
  const group = Array.from(hand.cards).reduce(groupByCards, {});

  return {
    ...hand,
    value: getValue(group),
  };
};

const sortByValue = (handA, handB) => {
  const rankings = "AKQJT98765432";

  if (handA.value === handB.value) {
    for (let index = 0; index < handA.cards.length; index++) {
      const indexA = rankings.indexOf(handA.cards[index]);
      const indexB = rankings.indexOf(handB.cards[index]);
      if (indexA < indexB) return 1;
      if (indexA > indexB) return -1;
    }
  }

  return handA.value - handB.value;
};

const getWins = (hand, index) => hand.bid * (index + 1);

function solve1(input) {
  return readLines(input)
    .map(createHand)
    .map(fillValue)
    .sort(sortByValue)
    .map(getWins)
    .sum();
}

const getValueJoker = (group) => {
  const jokerCount = group["J"];
  if (jokerCount === 5) return 7;
  if (jokerCount === 4) return 7;

  if (jokerCount === 3 && Object.keys(group).length === 2) return 7; // JJJQQ 3 jokers and 2 of same type
  if (jokerCount === 3 && Object.keys(group).length === 3) return 6; // JJJQK 3 jokers and two different cards

  if (jokerCount === 2 && Object.keys(group).length === 2) return 7; // JJQQQ 2 jokers and 3 of same type
  if (jokerCount === 2 && Object.keys(group).length === 3) return 6; // JJQQK 2 jokers and 2 of same type
  if (jokerCount === 2 && Object.keys(group).length === 4) return 4; // JJQKT 2 jokers and none of same type

  if (jokerCount === 1 && Object.keys(group).length === 2) return 7; // JQQQQ 1 joker and 4 of same type
  if (jokerCount === 1 && Object.keys(group).length === 3) {
    if (Object.values(group).max() === 3) return 6; // JQQQK 1 joker and 3 of same type
    if (Object.values(group).max() === 2) return 5; // JQQKK 1 joker and 2 + 2 of same type
  }
  if (jokerCount === 1 && Object.keys(group).length === 4) return 4; // J1123 1 joker and 2 of same type
  if (jokerCount === 1 && Object.keys(group).length === 5) return 2; // J1234 1 joker and none of same type
};

const fillValueJoker = (hand) => {
  const group = Array.from(hand.cards).reduce(groupByCards, {});

  const value = group["J"] ? getValueJoker(group) : getValue(group);

  return {
    ...hand,
    value,
    // group,
  };
};

const sortByValueJoker = (handA, handB) => {
  const rankings = "AKQT98765432J";

  if (handA.value === handB.value) {
    for (let index = 0; index < handA.cards.length; index++) {
      const cardA = handA.cards[index];
      const cardB = handB.cards[index];
      const indexA = rankings.indexOf(cardA);
      const indexB = rankings.indexOf(cardB);
      if (handA.cards === "444J4" || handB.cards === "444J4")
        console.log(handA.cards, handB.cards);
      if (indexA < indexB) return 1;
      if (indexA > indexB) return -1;
    }
  }

  return handA.value - handB.value;
};

function solve2(input) {
  return (
    readLines(input)
      .map(createHand)
      .map(fillValueJoker)
      .sort(sortByValueJoker)
      // .filter((x) => x.value > 6);
      .map(getWins)
      .sum()
  );
}

console.log("-----------");
// console.log(solve1(testFile));
// console.log(solve1(inputFile));
// console.log(solve2(testFile));
console.log(solve2(inputFile));
// 250426099 too high

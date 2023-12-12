import * as readline from "readline";
import * as fs from "fs";

interface Entry {
  hand: string;
  bid: number;
}

async function processFile(filePath: string): Promise<void> {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read lines from the stream
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treats each line as a separate data event
  });

  const entries: Entry[] = [];

  for await (const line of rl) {
    const lineParts = line.split(/\s+/);
    entries.push({ hand: lineParts[0], bid: Number(lineParts[1]) });
  }

  entries.sort((a, b) => {
    const result = handComparison(a, b);
    return result;
  });

  // process.stdout.write(JSON.stringify(entries) + "\n");

  var sum = 0;
  entries.forEach((entry, index) => {
    sum += (index + 1) * entry.bid;
  });
  console.log(sum); // 255101931 255101931 254660528
}

function handComparison(a: Entry, b: Entry) {
  const handA = a.hand;
  const handB = b.hand;

  const charCountMapA = getCharCountMap(handA);
  const charCountMapB = getCharCountMap(handB);

  const strengthA = getStrength(charCountMapA);
  const strengthB = getStrength(charCountMapB);

  if (strengthA != strengthB) {
    return strengthA > strengthB ? 1 : -1;
  }

  const template = "AKQT98765432J";
  // console.log("Jaci je");
  for (var i = 0; i < handA.length; i++) {
    const aCard = handA[i];
    const bCard = handB[i];

    if (template.indexOf(aCard) < template.indexOf(bCard)) {
      // console.log(sortedA);
      return 1;
    } else if (template.indexOf(aCard) > template.indexOf(bCard)) {
      // console.log(sortedB);
      return -1;
    }
  }

  // console.log("Error"); 254350549
  // negative returns a, positive returns b
  return -1;
}

function numberOfJokers(charCountMap: Map<string, number>) {
  const count = charCountMap.get("J");
  if (count) return count;
  else return 0;
}

function isOfAKind(
  charCountMap: Map<string, number>,
  amount: number,
  jokers: number
) {
  return (
    (amount == 5 && jokers == 5) ||
    Array.from(charCountMap.entries()).find(
      (entry) => entry[1] == amount && entry[0] != "J"
    ) ||
    (jokers > 0 && isOfAKind(charCountMap, amount - jokers, 0))
  );
}

function isFullHouse(charCountMap: Map<string, number>, jokers: number) {
  return (
    (Array.from(charCountMap.keys()).length == 2 && jokers == 0) ||
    (Array.from(charCountMap.keys()).length == 3 && jokers == 1)
  );
}

function isTwoPairs(charCountMap: Map<string, number>, jokers: number) {
  return Array.from(charCountMap.keys()).length == 3 && jokers == 0;
}

function isOnePair(charCountMap: Map<string, number>, jokers: number) {
  return (
    (Array.from(charCountMap.keys()).length == 4 && jokers == 0) ||
    (Array.from(charCountMap.keys()).length == 5 && jokers == 1)
  );
}

function isHighCard(charCountMap: Map<string, number>, jokers: number) {
  return Array.from(charCountMap.keys()).length == 5 && jokers == 0;
}

function getCharCountMap(hand: string) {
  const charCountMap: Map<string, number> = new Map();
  for (var i = 0; i < hand.length; i++) {
    const card = hand[i];
    if (charCountMap.has(card)) {
      charCountMap.set(card, charCountMap.get(card)! + 1);
    } else {
      charCountMap.set(card, 1);
    }
  }
  return charCountMap;
}

function getStrength(charCountMap: Map<string, number>) {
  const jokers = numberOfJokers(charCountMap);

  if (isOfAKind(charCountMap, 5, jokers)) {
    // console.log("Five of a kind");
    return 7;
  } else if (isOfAKind(charCountMap, 4, jokers)) {
    // console.log("Four of a kind");
    return 6;
  } else if (isFullHouse(charCountMap, jokers)) {
    // console.log("Full house");
    return 5;
  } else if (isOfAKind(charCountMap, 3, jokers)) {
    // console.log("Three of a kind");
    return 4;
  } else if (isTwoPairs(charCountMap, jokers)) {
    // console.log("Two pairs");
    return 3;
  } else if (isOnePair(charCountMap, jokers)) {
    // console.log("One pair");
    return 2;
  } else if (isHighCard(charCountMap, jokers)) {
    // console.log("High card");
    return 1;
  }

  // console.log("Error");
  return -1;
}

// Usage: node build/your-script.js your-text-file.txt
const args = process.argv.slice(2);

if (args.length !== 1) {
  console.error("Usage: node build/your-script.js your-text-file.txt");
  process.exit(1);
}

const filePath = args[0];

processFile(filePath)
  .then(() => console.log("File processing completed."))
  .catch((error) => console.error("Error:", error));

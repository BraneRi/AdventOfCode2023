import * as readline from "readline";
import * as fs from "fs";

// key - "Unknown" part of input hot springs string + remaining group sizes
// value - count of arrangements
const arrangementsCache = new Map<string, number>();
const combinationsForGroupSizeCache = new Map<string, string[]>();

async function processFile(filePath: string): Promise<void> {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read lines from the stream
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treats each line as a separate data event
  });

  var sum = 0;
  for await (const line of rl) {
    const lineParts = line.split(" ");
    // const partTwoInput = (lineParts[0] + "?").repeat(5).slice(0, -1);
    // const partTwoGroupSizes = (lineParts[1] + ",").repeat(5).slice(0, -1);
    // console.log(partTwoInput);
    // console.log(partTwoGroupSizes);

    const result = calculateLineArrangements(
      lineParts[0],
      lineParts[1].split(",").map((element) => Number(element))
    );
    sum += result;
    console.log(line);
    console.log(result);
    console.log("---------");
    combinationsForGroupSizeCache.clear();
    arrangementsCache.clear();
  }

  console.log(sum);
}

function mergeDots(inputString: string): string {
  return inputString.replace(/\.{2,}/g, ".");
}

function areArraysEqual(arr1: number[], arr2: number[]): boolean {
  return (
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index])
  );
}

function hasUnknownsBeforeLastSpring(springs: string): boolean {
  return springs.substring(0, springs.lastIndexOf("#")).includes("?");
}

function springsGroupSizes(springs: string): number[] {
  return mergeDots(springs.replace(/\?/g, "."))
    .replace(/^\.+|\.+$/g, "")
    .split(".")
    .map((springGroup) => springGroup.length);
}

function onlyUnknownsAndDots(str: string): boolean {
  return /^[\?\.]+$/.test(str);
}

function onlySprings(str: string): boolean {
  return /^#+$/.test(str);
}

function calculateLineArrangements(
  springs: string,
  remainingGroupSizes: number[]
): number {
  if (remainingGroupSizes.length == 0) {
    if (springs.length == 0 || onlyUnknownsAndDots(springs)) {
      return 1;
    }
  }

  const springGroupSizesMatchInputSizes = areArraysEqual(
    springsGroupSizes(springs),
    remainingGroupSizes
  );
  if (
    !hasUnknownsBeforeLastSpring(springs) &&
    springGroupSizesMatchInputSizes
  ) {
    return 1;
  }

  var solutions = combinationsForGroupSize(springs, remainingGroupSizes[0]);

  // remove invalid solutions
  // solutions = filterSolutions(solutions, remainingGroupSizes);
  if (solutions.length == 0) return 0;

  const result = solutions
    .map((solution) => {
      return calculateLineArrangements(solution, remainingGroupSizes.slice(1));
    })
    .reduce((acc, result) => acc + result);

  return result;
}

function toCacheKey(key1: string, key2: number) {
  return key1 + " " + key2;
}

function combinationsForGroupSize(
  springs: string,
  groupSize: number
): string[] {
  const cached = combinationsForGroupSizeCache.get(
    toCacheKey(springs, groupSize)
  );
  // if (cached) return cached;

  var combinations: string[] = [];

  var currentChar: string;

  // if here is exactly springs as a grou size (surrounded by dots)
  var foundUniqueMatch = false;
  for (let i = 0; i < springs.length - groupSize + 1; i++) {
    if (foundUniqueMatch) break;
    var currentSolution = springs;
    currentChar = springs[i];

    var nextChar = currentSolution.charAt(i + groupSize);
    var previousChar = currentSolution.charAt(i - 1);
    if (currentChar != ".") {
      if (
        !currentSolution.substring(i, i + groupSize).includes(".") &&
        nextChar != "#" &&
        previousChar != "#"
      ) {
        // console.log(
        //   currentSolution.substring(0, i).replace(/\?/g, ".") +
        //     "#".repeat(groupSize) +
        //     currentSolution.substring(i + groupSize)
        // );
        combinations.push(currentSolution.substring(i + 1 + groupSize));
      }

      if (
        onlySprings(currentSolution.substring(i, i + groupSize)) &&
        (currentSolution.charAt(i + groupSize) == "." ||
          currentSolution.charAt(i + groupSize) == "?")
      ) {
        foundUniqueMatch = true;
      }
    }
  }

  combinationsForGroupSizeCache.set(
    toCacheKey(springs, groupSize),
    combinations
  );
  return combinations;
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

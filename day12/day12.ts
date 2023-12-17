import * as readline from "readline";
import * as fs from "fs";

// key - "Unknown" part of input hot springs string + remaining group sizes
// value - count of arrangements
const arrangementsCache = new Map<string, number>();
const combinationsForGroupSizeCache = new Map<string, string[]>();

async function processFile(filePath: string): Promise<void> {
  // console.time("processFile");
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
    const partTwoInput = (lineParts[0] + "?").repeat(5).slice(0, -1);
    const partTwoGroupSizes = (lineParts[1] + ",").repeat(5).slice(0, -1);

    console.log(line);

    // console.time("calculateLineArrangements");
    const result = calculateLineArrangements(
      partTwoInput,
      partTwoGroupSizes.split(",").map((element) => Number(element))
    );
    // console.timeEnd("calculateLineArrangements");
    sum += result;
    console.log(result);
    // console.log(combinationsForGroupSizeCache);
    console.log("---------");
    // combinationsForGroupSizeCache.clear();
    // arrangementsCache.clear();
  }

  // console.log(arrangementsCache);
  console.log(sum);
  // console.timeEnd("processFile");
}

const mergeDotsCache = new Map<string, string>();
function mergeDots(inputString: string): string {
  const cached = mergeDotsCache.get(inputString);
  if (cached) return cached;

  const result = inputString.replace(/\.{2,}/g, ".");
  mergeDotsCache.set(inputString, result);
  return result;
}

const arraysEqualCache = new Map<string, boolean>();
function areArraysEqual(arr1: number[], arr2: number[]): boolean {
  const cachedKey = arr1.join(",") + ";" + arr2.join(",");
  const cached = arraysEqualCache.get(cachedKey);
  if (cached) return cached;

  const result =
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index]);
  arraysEqualCache.set(cachedKey, result);
  return result;
}

const springsGroupSizesCache = new Map<string, number[]>();
function springsGroupSizes(springs: string): number[] {
  const cached = springsGroupSizesCache.get(springs);
  if (cached) return cached;

  const result = mergeDots(springs.replace(/\?/g, "."))
    .replace(/^\.+|\.+$/g, "")
    .split(".")
    .map((springGroup) => springGroup.length);

  springsGroupSizesCache.set(springs, result);
  return result;
}

const onlySpringsCache = new Map<string, boolean>();
function onlySprings(str: string): boolean {
  const cached = onlySpringsCache.get(str);
  if (cached) return cached;
  const result = /^#+$/.test(str);

  onlySpringsCache.set(str, result);
  return result;
}

const matchCache = new Map<string, boolean>();
function doesSpringGroupSizesMatchInputSizes(
  springs: string,
  remainingGroupSizes: number[]
): boolean {
  const cachedKey = springs + ";" + remainingGroupSizes.join(",");
  const cached = matchCache.get(cachedKey);
  if (cached) return cached;

  const result = areArraysEqual(
    springsGroupSizes(springs),
    remainingGroupSizes
  );
  matchCache.set(cachedKey, result);
  return result;
}

function calculateLineArrangements(
  springs: string,
  remainingGroupSizes: number[]
): number {
  springs = trimSurroundingDots(mergeDots(springs));

  const cachedKey = springs + ";" + remainingGroupSizes.join(",");
  const cached = arrangementsCache.get(cachedKey);
  if (cached) {
    return cached;
  }

  if (remainingGroupSizes.length == 0) {
    if (!springs.includes("#")) {
      arrangementsCache.set(cachedKey, 1);
      return 1;
    } else {
      arrangementsCache.set(cachedKey, 0);
      return 0;
    }
  } else {
    if (springs.length == 0) {
      arrangementsCache.set(cachedKey, 0);
      return 0;
    }
  }

  if (
    remainingGroupSizes.reduce((acc, current) => acc + current, 0) +
      remainingGroupSizes.length -
      1 >
    springs.length
  ) {
    arrangementsCache.set(cachedKey, 0);
    return 0;
  }

  const springGroupSizesMatchInputSizes: boolean =
    doesSpringGroupSizesMatchInputSizes(springs, remainingGroupSizes);

  if (springGroupSizesMatchInputSizes) {
    arrangementsCache.set(cachedKey, 1);
    return 1;
  }

  var solutions = combinationsForGroupSize(springs, remainingGroupSizes[0]);

  const nextGroupSizes = remainingGroupSizes.slice(1);
  if (nextGroupSizes.length > 0) {
    solutions = solutions.filter((solution) => solution.length > 0);
  }
  if (nextGroupSizes.length == 0) {
    solutions = solutions.filter((solution) => !solution.includes("#"));
  }

  if (solutions.length == 0) {
    arrangementsCache.set(cachedKey, 0);
    return 0;
  }

  solutions = solutions.filter(
    (solution) =>
      nextGroupSizes.reduce((acc, current) => acc + current, 0) +
        nextGroupSizes.length -
        1 <=
      solution.length
  );

  if (solutions.length == 0) {
    arrangementsCache.set(cachedKey, 0);
    return 0;
  }
  const result = solutions
    .map((solution) => {
      solution = trimSurroundingDots(mergeDots(solution));
      const cachedKey = solution + ";" + nextGroupSizes.join(",");
      const cached = arrangementsCache.get(cachedKey);
      if (cached) {
        // console.log("cached");
        // console.log(cached);
        // console.log(nextGroupSizes);
        // console.log("   ");
        return cached;
      } else {
        // console.log("new");
        // console.log(solution);
        // console.log(nextGroupSizes);
        // console.log("   ");
        const result = calculateLineArrangements(solution, nextGroupSizes);
        arrangementsCache.set(cachedKey, result);
        return result;
      }
    })
    .reduce((acc, result) => acc + result);

  arrangementsCache.set(cachedKey, result);
  return result;
}

function toCacheKey(key1: string, key2: number): string {
  return key1 + " " + key2;
}

const includesDotCache = new Map<string, boolean>();
function includesDot(
  currentSolution: string,
  startIndex: number,
  endIndex: number
): boolean {
  const cacheKey = currentSolution + ";" + startIndex + ";" + endIndex;
  const cache = includesDotCache.get(cacheKey);
  if (cache) return cache;

  const result = cachedSubstring(
    currentSolution,
    startIndex,
    endIndex
  ).includes(".");
  includesDotCache.set(cacheKey, result);
  return result;
}

const solutionSubstringCache = new Map<string, string>();
function cachedSubstring(
  solution: string,
  startIndex: number,
  endIndex: number = solution.length
) {
  const cacheKey = solution + ";" + startIndex + ";" + endIndex;
  const cache = solutionSubstringCache.get(cacheKey);
  if (cache) return cache;

  const result = solution.substring(startIndex, endIndex);
  solutionSubstringCache.set(cacheKey, result);
  return result;
}

function trimSurroundingDots(input: string): string {
  return input.replace(/^\.+|\.+$/g, "");
}

function isValidCase(
  currentSolution: string,
  i: number,
  groupSize: number
): boolean {
  var nextChar = currentSolution.charAt(i + groupSize);
  var previousChar = currentSolution.charAt(i - 1);

  if (
    !includesDot(currentSolution, i, i + groupSize) &&
    nextChar != "#" &&
    previousChar != "#"
  ) {
    if (!cachedSubstring(currentSolution, 0, i).includes("#")) {
      return true;
    }
  }

  return false;
}

function combinationsForGroupSize(
  springs: string,
  groupSize: number
): string[] {
  springs = trimSurroundingDots(mergeDots(springs));
  // console.time("combinationsForGroupSize");
  const cached = combinationsForGroupSizeCache.get(
    toCacheKey(springs, groupSize)
  );
  if (cached) {
    return cached;
  }

  var combinations: string[] = [];

  var currentChar: string;

  // if here is exactly springs as a group size (surrounded by dots)
  var foundUniqueMatch = false;
  for (let i = 0; i < springs.length - groupSize + 1; i++) {
    if (foundUniqueMatch) break;
    var currentSolution = springs;
    currentChar = springs[i];

    if (currentChar != ".") {
      if (isValidCase(currentSolution, i, groupSize)) {
        combinations.push(cachedSubstring(currentSolution, i + 1 + groupSize));
      }

      if (
        onlySprings(cachedSubstring(currentSolution, i + groupSize)) &&
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
  // console.timeEnd("combinationsForGroupSize");
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

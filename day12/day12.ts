import * as readline from "readline";
import * as fs from "fs";

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
    const partTwoSprings = (lineParts[0] + "?").repeat(5).slice(0, -1)
    const partTwoGroupSizes = (lineParts[1] + ",").repeat(5).slice(0, -1)
    // console.log(partTwoSprings)
    // console.log(partTwoGroupSizes)

    sum += calculateLineArrangements(
      partTwoSprings,
      0,
      partTwoGroupSizes.split(",").map((element) => Number(element))
    );
    solutionsCache.clear();
    // break;
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

const solutionsCache = new Set<string>();

function springsGroupSizes(springs: string): number[] {
  return mergeDots(springs.replace(/\?/g, "."))
    .replace(/^\.+|\.+$/g, "")
    .split(".")
    .map((springGroup) => springGroup.length);
}

function hasUnknownsBeforeLastSpring(springs: string): boolean {
  return springs.substring(0, springs.lastIndexOf("#")).includes("?");
}

function allBeforeUnknown(inputString: string): string[] {
  const result: string[] = [];
  const split = inputString.split(".");

  for (let i = 0; i < split.length; i++) {
    if (split[i].includes("?")) {
      break;
    } else {
      result.push(split[i]);
    }
  }

  return result;
}

function trimSurroundingDots(inputString: string): string {
  return inputString.replace(/^\.+|\.+$/g, "");
}

function filterSolutions(solutions: string[], groupSizes: number[]): string[] {
  return solutions.filter((solution) => {
    const temp = allBeforeUnknown(trimSurroundingDots(mergeDots(solution)));
    const springGroups = temp.map((group) => group.length);
    const result =
      springGroups.length == 0 ||
      areArraysEqual(springGroups, groupSizes.slice(0, springGroups.length));
    return result;
  });
}

function toUniqueKey(springs: string, index: number): string {
  return springs + " " + index
}
const combinations = new Set<string>();

function calculateLineArrangements(
  springs: string,
  currentGroupSizeIndex: number,
  groupSizes: number[]
): number {
  if (combinations.has(toUniqueKey(springs, currentGroupSizeIndex))) {
    return 0;
  } else {
    combinations.add(toUniqueKey(springs, currentGroupSizeIndex))
  }
  // process.stdout.write(springs + "   " + groupSizes + "  index:" + currentGroupSizeIndex);
  // console.log()

  if (
    areArraysEqual(springsGroupSizes(springs), groupSizes) &&
    !hasUnknownsBeforeLastSpring(springs) &&
    !solutionsCache.has(springs)
  ) {
    solutionsCache.add(springs);
    return 1;
  } else if (!springs.includes("?")) {
    if (
      !areArraysEqual(springsGroupSizes(springs), groupSizes) ||
      solutionsCache.has(springs)
    ) {
      return 0;
    }
    solutionsCache.add(springs);
    return 1;
  }

  var solutions = combinationsForGroupSize(
    springs,
    groupSizes[currentGroupSizeIndex]
  );

  // remove invalid solutions
  solutions = filterSolutions(solutions, groupSizes);

  if (solutions.length == 0) return 0;

  return solutions
    .map((solution) => {
      return calculateLineArrangements(
        solution,
        currentGroupSizeIndex + 1,
        groupSizes
      );
    })
    .reduce((acc, result) => acc + result);
}

function toCacheKey(key1: string, key2: number) {
  return key1 + " " + key2;
}
const combinationsForGroupSizeCache = new Map<string, string[]>();

function combinationsForGroupSize(
  springs: string,
  groupSize: number
): string[] {
  const cached = combinationsForGroupSizeCache.get(
    toCacheKey(springs, groupSize)
  );
  if (cached) return cached;

  var combinations: string[] = [];

  var currentChar: string;
  for (let i = 0; i < springs.length - groupSize + 1; i++) {
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
        combinations.push(
          currentSolution.substring(0, i).replace(/\?/g, ".") +
            "#".repeat(groupSize) +
            currentSolution.substring(i + groupSize)
        );
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

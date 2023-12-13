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
    sum += calculateLineArrangements(
      lineParts[0],
      0,
      lineParts[1].split(",").map((element) => Number(element))
    );
    solutionsCache.clear();
    break;
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

function calculateLineArrangements(
  springs: string,
  currentGroupSizeIndex: number,
  groupSizes: number[]
): number {
  // console.log(springs);
  if (!springs.includes("?")) {
    // console.log(springs);
    if (
      !areArraysEqual(
        mergeDots(springs)
          .replace(/^\.+|\.+$/g, "")
          .split(".")
          .map((springGroup) => springGroup.length),
        groupSizes
      ) ||
      solutionsCache.has(springs)
    ) {
      return 0;
    }
    // console.log(springs);
    solutionsCache.add(springs);
    return 1;
  }

  const solutions = combinationsForGroupSize(
    springs,
    groupSizes[currentGroupSizeIndex]
  );

  if (solutions.length == 0) return 0;

  // console.log("Count");
  // console.log(groupSizes[currentGroupSizeIndex]);
  // console.log("Solutions");
  // console.log(solutions);

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

function combinationsForGroupSize(
  springs: string,
  groupSize: number
): string[] {
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

import * as readline from "readline";
import * as fs from "fs";

interface Seed {
  start: number;
  length: number;
}

function seedEnd(seed: Seed) {
  return seed.start + seed.length - 1;
}

class Range {
  start: number;
  end: number;
  private destDiff: number;

  constructor(start: number, end: number, destDiff: number) {
    this.start = start;
    this.end = end;
    this.destDiff = destDiff;
  }

  // if range contains seed
  contains(input: Seed): boolean {
    return this.start <= input.start && this.end >= seedEnd(input);
  }

  // if seed is outside range
  outside(input: Seed): boolean {
    return this.end < input.start || this.start > seedEnd(input);
  }

  // if seed intersects range from left side
  intersectsFromLeft(input: Seed): boolean {
    return input.start <= this.start && this.start <= seedEnd(input);
  }

  // if seed intersects range from right side
  intersectsFromRight(input: Seed): boolean {
    return this.start <= input.start && input.start <= this.end;
  }

  output(input: number): number {
    return input + this.destDiff;
  }
}

class Category {
  private ranges: Range[];

  constructor() {
    this.ranges = [];
  }

  add(range: Range) {
    this.ranges.push(range);
  }

  output(input: Seed[]) {
    const newSeeds: Seed[] = [];

    // console.log("ranges: ");
    // console.log(this.ranges);
    for (const seed of input) {
      var hasMatch = false;
      for (const range of this.ranges) {
        if (range.contains(seed)) {
          hasMatch = true;
          // console.log("Contains");
          newSeeds.push({
            start: range.output(seed.start),
            length: seed.length,
          });
        } else if (range.intersectsFromLeft(seed)) {
          hasMatch = true;
          // console.log("From left");

          input.push({
            start: seed.start,
            length: range.start - seed.start,
          });
          newSeeds.push({
            start: range.output(range.start),
            length: seedEnd(seed) - range.start + 1,
          });
        } else if (range.intersectsFromRight(seed)) {
          hasMatch = true;
          // console.log("From right");

          input.push({
            start: range.end + 1,
            length: seedEnd(seed) - (range.end + 1) + 1,
          });
          newSeeds.push({
            start: range.output(seed.start),
            length: range.end - seed.start + 1,
          });
        }
      }
      if (hasMatch == false) {
        // console.log("Outside all ranges");
        newSeeds.push({ start: seed.start, length: seed.length });
      }
    }

    return newSeeds;
  }
}

async function processFile(filePath: string): Promise<void> {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read lines from the stream
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treats each line as a separate data event
  });

  const seedLineNumbers: number[] = [];
  const seeds: Seed[] = [];
  const numbersRegex = /\d+/g;
  const categories: Category[] = [];
  var currentCategory: Category | null = null;
  let lineNumbers: number[] = [];

  for await (const line of rl) {
    if (line.startsWith("seeds")) {
      let seedsMatch: RegExpExecArray | null;
      while ((seedsMatch = numbersRegex.exec(line)) !== null) {
        seedLineNumbers.push(Number(seedsMatch[0]));
      }

      for (let i = 0; i < seedLineNumbers.length; i += 2) {
        const startSeed = seedLineNumbers[i];
        const seedLength =
          i + 1 < seedLineNumbers.length ? seedLineNumbers[i + 1] : 0;

        seeds.push({ start: startSeed, length: seedLength });
      }
    } else if (line.includes(":")) {
      if (currentCategory != null) {
        categories.push(currentCategory);
      }
      currentCategory = new Category();
    } else {
      lineNumbers = [];

      let lineNumbersMatch: RegExpExecArray | null;
      while ((lineNumbersMatch = numbersRegex.exec(line)) !== null) {
        lineNumbers.push(Number(lineNumbersMatch[0]));
      }

      if (currentCategory != null && lineNumbers.length > 0) {
        const dest = lineNumbers[0];
        const source = lineNumbers[1];
        const length = lineNumbers[2];
        currentCategory.add(
          new Range(source, source + length - 1, dest - source)
        );
      }
    }
  }

  console.log(seeds);

  if (currentCategory != null) {
    categories.push(currentCategory);
  }

  var minLocation = Number.MAX_SAFE_INTEGER;
  var currentSeeds: Seed[] = [];

  seeds.forEach((seed) => {
    currentSeeds = [seed];
    categories.forEach((category) => {
      currentSeeds = category.output(currentSeeds);
    });
    // console.log(currentSeeds);

    minLocation = Math.min(
      minLocation,
      currentSeeds
        .map((resultSeed) => resultSeed.start)
        .reduce((acc, result) => Math.min(acc, result))
    );
    currentSeeds = [];
  });
  console.log(minLocation);
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

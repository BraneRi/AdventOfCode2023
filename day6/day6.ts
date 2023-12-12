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

  const numbersRegex = /\d+/g;
  var time: string = "";
  var distance: string = "";

  for await (const line of rl) {
    // this parses one number per line, code should be little bit adjusted for multiple numbers, for the sake of speed I did it manually
    if (line.startsWith("Time")) {
      let timesMatch: RegExpExecArray | null;
      while ((timesMatch = numbersRegex.exec(line)) !== null) {
        time = timesMatch[0];
      }
    }

    if (line.startsWith("Distance")) {
      let distancesMatch: RegExpExecArray | null;
      while ((distancesMatch = numbersRegex.exec(line)) !== null) {
        distance = distancesMatch[0];
      }
    }
  }

  var timeDotIndex: number;
  var distanceDotIndex: number;
  var diff: number;
  if (time.length > distance.length) {
    distanceDotIndex = 1;
    diff = distance.length - 1;
    timeDotIndex = time.length - diff;
  } else {
    timeDotIndex = 1;
    diff = time.length - 1;
    distanceDotIndex = distance.length - diff;
  }

  const divisionFactor = 1 / Math.pow(10, diff);

  time = insertCharAtIndex(time, timeDotIndex, ".");
  distance = insertCharAtIndex(distance, distanceDotIndex, ".");

  var result = 1;

  console.log(time);
  console.log(distance);

  const t = Number(time);
  const d = Number(distance);

  console.log(t);
  console.log(d);
  console.log(divisionFactor);

  const x1 = calculateX1(t, d, divisionFactor);
  const x2 = calculateX2(t, d, divisionFactor);
  console.log(x1);
  console.log(x2);

  result = x2 - x1 + 1;
  console.log(result);
}

function insertCharAtIndex(
  originalString: string,
  index: number,
  charToInsert: string
) {
  return (
    originalString.slice(0, index) + charToInsert + originalString.slice(index)
  );
}

function calculateX1(t: number, d: number, divisionFactor_a: number) {
  const divider = 2 * divisionFactor_a;
  const x1 =
    t / divider - Math.sqrt(t * t - 4 * d * divisionFactor_a) / divider;
  const nearestBiggerInteger = Math.ceil(x1);
  return nearestBiggerInteger == x1
    ? nearestBiggerInteger + 1
    : nearestBiggerInteger;
}

function calculateX2(t: number, d: number, divisionFactor_a: number) {
  const x2 =
    t / (2 * divisionFactor_a) +
    Math.sqrt(Math.pow(t, 2) - 4 * d * divisionFactor_a) /
      (2 * divisionFactor_a);
  const nearestSmallerInteger = Math.floor(x2);
  return nearestSmallerInteger == x2
    ? nearestSmallerInteger - 1
    : nearestSmallerInteger;
}

// function zip(arr1: number[], arr2: number[]) {
//   return arr1.map((element, index) => [element, arr2[index]]);
// }

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

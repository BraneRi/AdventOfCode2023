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

  var platform: string[] = [];
  for await (const line of rl) {
    platform.push(line);
  }

  const evenOutIterations = 1000
  const itemsForCycleChecking = 100
  const cycleCandidates: number[] = [];
  for (let i = 1; i <= evenOutIterations + itemsForCycleChecking; i++) {
    // leave it a while to even out
    platform = tiltCycle(platform);
    if (i >= evenOutIterations) {
      // save last 100 iterations to check for cycles
      cycleCandidates.push(calculateLoad(platform));
    }
  }

  console.log("Starting to detect cycles...");
  console.log(cycleCandidates)
  // const cycleData = detectCycle(cycleCandidates, evenOutIterations);
  // console.log(cycleData);

  // const correctIndex = 1000000000 % cycleData!.size
  // console.log("Value after 1000000000 iterations => " + Array.from(cycleData!.entries()).find( entry => entry[1] == evenOutIterations + correctIndex)?.[0])

  // printPlatform(platform);
}


function tiltCycle(platform: string[]): string[] {
  platform = tiltNorth(platform);
  // printPlatform(platform);
  // console.log("-----");
  platform = tiltWest(platform);
  // printPlatform(platform);
  // console.log("-----");
  platform = tiltSouth(platform);
  // printPlatform(platform);
  // console.log("-----");
  platform = tiltEast(platform);
  // printPlatform(platform);
  // console.log("-----");
  return platform;
}

function printPlatform(platform: string[]) {
  platform.forEach((element) => {
    process.stdout.write(element + "\n");
  });
}

function countOccurrences(line: string, targetChar: string): number {
  return line.split("").filter((char) => char === targetChar).length;
}

function calculateLoad(platform: string[]): number {
  var count = 0;
  for (let i = 0; i < platform.length; i++) {
    const rowTotal = countOccurrences(platform[i], "O") * (platform.length - i);
    count += rowTotal;
  }
  return count;
}

function tiltNorth(platform: string[]): string[] {
  const newPlatform = platform;

  const columns = platform[0].length;
  const rows = platform.length;

  var element: string;
  var lastImmovableRock: number;
  var emptySpaces: number;

  for (let col = 0; col < columns; col++) {
    emptySpaces = 0;
    lastImmovableRock = 0;
    for (let row = 0; row < rows; row++) {
      element = newPlatform[row][col];
      if (element == "#") {
        emptySpaces = 0;
        lastImmovableRock = row;
      } else if (element == ".") {
        emptySpaces++;
      } else if (element == "O") {
        lastImmovableRock = row - emptySpaces;
        if (lastImmovableRock != row) {
          newPlatform[lastImmovableRock] = updateStringAtIndex(
            newPlatform[lastImmovableRock],
            col,
            "O"
          );
          newPlatform[row] = updateStringAtIndex(newPlatform[row], col, ".");
        }
      }
    }
  }
  return newPlatform;
}

function tiltSouth(platform: string[]): string[] {
  const newPlatform = platform;

  const columns = platform[0].length;
  const rows = platform.length;

  var element: string;
  var lastImmovableRock: number;
  var emptySpaces: number;

  for (let col = 0; col < columns; col++) {
    emptySpaces = 0;
    lastImmovableRock = 0;
    for (let row = rows - 1; row >= 0; row--) {
      element = newPlatform[row][col];
      if (element == "#") {
        emptySpaces = 0;
        lastImmovableRock = row;
      } else if (element == ".") {
        emptySpaces++;
      } else if (element == "O") {
        lastImmovableRock = row + emptySpaces;
        if (lastImmovableRock != row) {
          newPlatform[lastImmovableRock] = updateStringAtIndex(
            newPlatform[lastImmovableRock],
            col,
            "O"
          );
          newPlatform[row] = updateStringAtIndex(newPlatform[row], col, ".");
        }
      }
    }
  }

  return newPlatform;
}

function tiltWest(platform: string[]): string[] {
  const newPlatform = platform;

  const columns = platform[0].length;
  const rows = platform.length;

  var element: string;
  var lastImmovableRock: number;
  var emptySpaces: number;

  for (let row = 0; row < rows; row++) {
    emptySpaces = 0;
    lastImmovableRock = 0;
    for (let col = 0; col < columns; col++) {
      element = newPlatform[row][col];
      if (element == "#") {
        emptySpaces = 0;
        lastImmovableRock = col;
      } else if (element == ".") {
        emptySpaces++;
      } else if (element == "O") {
        lastImmovableRock = col - emptySpaces;
        if (lastImmovableRock != col) {
          newPlatform[row] = updateStringAtIndex(
            newPlatform[row],
            lastImmovableRock,
            "O"
          );
          newPlatform[row] = updateStringAtIndex(newPlatform[row], col, ".");
        }
      }
    }
  }

  return newPlatform;
}

function tiltEast(platform: string[]): string[] {
  const newPlatform = platform;

  const columns = platform[0].length;
  const rows = platform.length;

  var element: string;
  var lastImmovableRock: number;
  var emptySpaces: number;

  for (let row = 0; row < rows; row++) {
    emptySpaces = 0;
    lastImmovableRock = 0;
    for (let col = columns - 1; col >= 0; col--) {
      element = newPlatform[row][col];
      if (element == "#") {
        emptySpaces = 0;
        lastImmovableRock = col;
      } else if (element == ".") {
        emptySpaces++;
      } else if (element == "O") {
        lastImmovableRock = col + emptySpaces;
        if (lastImmovableRock != col) {
          newPlatform[row] = updateStringAtIndex(
            newPlatform[row],
            lastImmovableRock,
            "O"
          );
          newPlatform[row] = updateStringAtIndex(newPlatform[row], col, ".");
        }
      }
    }
  }

  return newPlatform;
}

function updateStringAtIndex(
  input: string,
  index: number,
  newChar: string
): string {
  const charArray = input.split("");
  charArray[index] = newChar;
  const updatedString = charArray.join("");
  return updatedString;
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

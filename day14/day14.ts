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

  platform = tiltNorth(platform);
  printPlatform(platform);
  const load = calculateLoad(platform);
  console.log(load);
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

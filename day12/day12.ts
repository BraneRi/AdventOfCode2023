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
      lineParts[0].split(""),
      lineParts[1].split(",").map((element) => Number(element))
    );
    break;
  }

  console.log(sum);
}

function calculateLineArrangements(
  springs: string[],
  groupSizes: number[]
): number {
  var currentIsland = "";
  groupSizes.forEach((groupSize) => {
    springs.forEach((s, index) => {
      if (currentIsland.length > 0 && s == ".") {
        const adjustedGroup = calculateGroup(currentIsland, groupSize);
        const startIndex = index - adjustedGroup.length;
        const adjustedString = replaceFromIndex(
          springs.join(""),
          startIndex,
          adjustedGroup
        );
        console.log(adjustedString);
        return;
      } else {
        currentIsland += s;
      }
    });
  });

  var count = 0;
  return count;
}

function replaceFromIndex(
  originalString: string,
  startIndex: number,
  replacement: string
) {
  const adjustedString =
    originalString.substring(0, startIndex) +
    replacement +
    originalString.substring(startIndex + replacement.length);

  return adjustedString;
}

function calculateGroup(currentIsland: string, groupSize: number): string {}

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

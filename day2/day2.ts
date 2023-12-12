import * as readline from "readline";
import * as fs from "fs";

const regexRed = /(\d+) red/;
const regexGreen = /(\d+) green/;
const regexBlue = /(\d+) blue/;

async function processFile(filePath: string): Promise<void> {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read lines from the stream
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treats each line as a separate data event
  });

  var sum = 0;
  var redMax;
  var greenMax;
  var blueMax;

  // Process each line
  for await (const line of rl) {
    const lineParts = line.split(";");
    redMax = 0;
    greenMax = 0;
    blueMax = 0;

    for (const section of lineParts) {
      const redMatch = section.match(regexRed);
      if (redMatch && parseInt(redMatch[1], 10) > redMax) {
        redMax = parseInt(redMatch[1], 10);
      }

      const greenMatch = section.match(regexGreen);
      if (greenMatch && parseInt(greenMatch[1], 10) > greenMax) {
        greenMax = parseInt(greenMatch[1], 10);
      }

      const blueMatch = section.match(regexBlue);
      if (blueMatch && parseInt(blueMatch[1], 10) > blueMax) {
        blueMax = parseInt(blueMatch[1], 10);
      }
    }

    // console.log(redPower);
    // console.log(greenPower);
    // console.log(bluePower);
    // console.log("----");

    sum += redMax * greenMax * blueMax;
  }
  console.log(sum);
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

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

  var input: string;
  for await (const line of rl) {
    input = line;
  }

  const steps: string[] = input!.split(",");
  const boxes = new Map<number, { lens: string; focalLength: number }[]>();

  steps.forEach((step) => {
    var boxLenses: { lens: string; focalLength: number }[];
    var boxhash: number;

    if (step.includes("=")) {
      const stepParts = step.split("=");

      boxhash = hash(stepParts[0]);
      if (boxes.get(boxhash) == undefined) {
        boxLenses = [];
      } else {
        boxLenses = boxes.get(boxhash)!;
      }

      var replaced = false;
      for (let i = 0; i < boxLenses!.length; i++) {
        if (boxLenses[i].lens == stepParts[0]) {
          boxLenses[i].focalLength = Number(stepParts[1]);
          replaced = true;
        }
      }

      if (!replaced) {
        boxLenses.push({
          lens: stepParts[0],
          focalLength: Number(stepParts[1]),
        });
      }
    } else if (step.includes("-")) {
      const stepParts = step.split("-");

      boxhash = hash(stepParts[0]);
      var boxLenses: { lens: string; focalLength: number }[];
      if (boxes.get(boxhash) == undefined) {
        boxLenses = [];
      } else {
        boxLenses = boxes.get(boxhash)!;
      }

      boxLenses = boxLenses.filter((lens) => lens.lens != stepParts[0]);
    }

    boxes.set(boxhash!, boxLenses!);
  });

  console.log(boxes);
  console.log(calculateFocusingPower(boxes));
}

function calculateFocusingPower(
  boxes: Map<number, { lens: string; focalLength: number }[]>
): number {
  var sum = 0;
  Array.from(boxes.entries()).forEach((box) => {
    box[1].forEach((lens, index) => {
      sum += (box[0] + 1) * (index + 1) * lens.focalLength;
    });
  });
  return sum;
}

function hash(input: string): number {
  var sum = 0;
  input.split("").forEach((char) => {
    sum = ((sum + char.charCodeAt(0)) * 17) % 256;
  });
  return sum;
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

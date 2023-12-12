import * as readline from "readline";
import * as fs from "fs";

interface CoordinateNumber {
  x: number;
  y: number;
  lineNumber: number;
}

interface CoordinateSymbol {
  x: number;
  y: number;
}

async function processFile(filePath: string): Promise<void> {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read lines from the stream
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treats each line as a separate data event
  });

  var coordinateNumbers: CoordinateNumber[] = [];
  var coordinateSymbols: CoordinateSymbol[] = [];
  var sum = 0;
  var lineIndex = 0;
  const symbolsRegex = /[^A-Za-z0-9.]/g;
  const numbersRegex = /\d+/g;
  const gearSymvol = "*";

  for await (const line of rl) {
    let matchSymbols: RegExpExecArray | null;
    while ((matchSymbols = symbolsRegex.exec(line)) !== null) {
      if (matchSymbols[0] == gearSymvol) {
        coordinateSymbols.push({ x: lineIndex, y: matchSymbols.index });
      }
    }

    let matchNumbers: RegExpExecArray | null;
    while ((matchNumbers = numbersRegex.exec(line)) !== null) {
      coordinateNumbers.push({
        x: lineIndex,
        y: matchNumbers.index,
        lineNumber: Number(matchNumbers[0]),
      });
    }

    lineIndex++;
  }
  // console.log(coordinateNumbers);
  // console.log(coordinateSymbols);

  for (const symbol of coordinateSymbols) {
    var adjacentCount = 0;
    var gearRatio = 1;
    for (const coordinateNumber of coordinateNumbers) {
      if (
        adjacent(
          { x: symbol.x, y: symbol.y },
          {
            xLineStart: coordinateNumber.x,
            yLineStart: coordinateNumber.y,
            length: lengthOfANumber(coordinateNumber.lineNumber),
          }
        )
      ) {
        adjacentCount++;
        gearRatio *= coordinateNumber.lineNumber;
        // console.log("Adjacent");
        // console.log(symbol);
        // console.log(coordinateNumber);

        // coordinateNumbers = coordinateNumbers.filter(
        //   (obj) => obj !== coordinateNumber
        // );
      }
    }

    if (adjacentCount == 2) {
      sum += gearRatio;
    }
  }
  console.log(sum);
}

function lengthOfANumber(number) {
  return Math.abs(number).toString().length;
}

function adjacent(
  { x, y }: { x: number; y: number },
  {
    xLineStart,
    yLineStart,
    length,
  }: { xLineStart: number; yLineStart: number; length: number }
): boolean {
  const withinHorizontalRange = y >= yLineStart - 1 && y <= yLineStart + length;
  const withinVerticalRange = Math.abs(x - xLineStart) <= 1;

  return withinHorizontalRange && withinVerticalRange;
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

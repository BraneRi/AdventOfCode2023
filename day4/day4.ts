import * as readline from "readline";
import * as fs from "fs";

const resultMap = new Map<number, number>();

async function processFile(filePath: string): Promise<void> {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read lines from the stream
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treats each line as a separate data event
  });

  const winningNumbers = new Set<number>();
  const elfNumbers = new Set<number>();
  const ticketMap = new Map<number, number>();
  const numbersRegex = /\d+/g;
  const cardNumberRegex = /Card\s+(\d+):/;

  for await (const line of rl) {
    let lineParts = line.substring(line.indexOf(":")).split("|");

    let winningNumbersMatch: RegExpExecArray | null;
    while ((winningNumbersMatch = numbersRegex.exec(lineParts[0])) !== null) {
      winningNumbers.add(Number(winningNumbersMatch[0]));
    }

    let elfNumbersMatch: RegExpExecArray | null;
    while ((elfNumbersMatch = numbersRegex.exec(lineParts[1])) !== null) {
      elfNumbers.add(Number(elfNumbersMatch[0]));
    }

    var elfWinningCount = 0;
    elfNumbers.forEach((elfNumber) => {
      if (winningNumbers.has(elfNumber)) {
        elfWinningCount++;
      }
    });

    const cardNumberMatch = line.match(cardNumberRegex);
    if (cardNumberMatch) {
      const cardId = parseInt(cardNumberMatch[1], 10);
      resultMap[cardId] = 1;

      ticketMap[cardId] = elfWinningCount;
    }

    winningNumbers.clear();
    elfNumbers.clear();
  }

  console.log(ticketMap);
  for (const [cardIndex, elfWinningCount] of Object.entries(ticketMap)) {
    calculate(Number(cardIndex), elfWinningCount, ticketMap);
  }

  var sum = 0;
  for (const [key, value] of Object.entries(resultMap)) {
    sum += value;
  }
  console.log(sum);
}

function calculate(
  cardIndex: number,
  value: number,
  ticketMap: Map<number, number>
) {
  for (let i = cardIndex + 1; i <= cardIndex + value; i++) {
    resultMap[cardIndex]++;
    calculate(i, ticketMap[i], ticketMap);
  }
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

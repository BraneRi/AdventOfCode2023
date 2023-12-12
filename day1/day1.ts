import * as readline from "readline";
import * as fs from "fs";

const validCharDigitSequences = [
  { key: "one", value: "1" },
  { key: "two", value: "2" },
  { key: "three", value: "3" },
  { key: "four", value: "4" },
  { key: "five", value: "5" },
  { key: "six", value: "6" },
  { key: "seven", value: "7" },
  { key: "eight", value: "8" },
  { key: "nine", value: "9" },
];

async function processFile(filePath: string): Promise<void> {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read lines from the stream
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treats each line as a separate data event
  });

  var sum = 0;
  var firstDigit;
  var lastDigit;
  var startCharSequence;
  var endCharSequence;
  var charFromStart;
  var charFromEnd;
  // Process each line
  for await (const line of rl) {
    firstDigit = undefined;
    lastDigit = undefined;
    startCharSequence = "";
    endCharSequence = "";
    for (let i = 0; i < line.length; i++) {
      charFromStart = line.charAt(i);
      charFromEnd = line.charAt(line.length - i - 1);

      startCharSequence += charFromStart;
      endCharSequence = charFromEnd + endCharSequence;

      const containsStartNumber = validCharDigitSequences.find((substring) =>
        new RegExp(substring.key).test(startCharSequence)
      );
      const containsEndNumber = validCharDigitSequences.find((substring) =>
        new RegExp(substring.key).test(endCharSequence)
      );

      if (!firstDigit && containsStartNumber) {
        firstDigit = containsStartNumber.value;
      }

      if (!lastDigit && containsEndNumber) {
        lastDigit = containsEndNumber.value;
      }

      if (!firstDigit && /\d/.test(charFromStart)) {
        firstDigit = charFromStart;
      }

      if (!lastDigit && /\d/.test(charFromEnd)) {
        lastDigit = charFromEnd;
      }

      if (firstDigit && lastDigit) break;
    }
    sum += Number(firstDigit + lastDigit);
    // console.log(firstDigit);
    // console.log(lastDigit);
    // console.log(sum);
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

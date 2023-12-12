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
  var series: number[];

  for await (const line of rl) {
    series = line.split(" ").map((item) => Number(item));

    // console.log(series);
    sum += calculateNextItem(series, false);
  }

  console.log(sum);
}

function calculateNextItem(series: number[], allZeroes: boolean): number {
  if (allZeroes) {
    return 0;
  }

  let tempSeries: number[] = [];
  var diff: number;
  var allZeroes: boolean = true;

  for (let i = 0; i < series.length - 1; i++) {
    diff = series[i + 1] - series[i];
    if (diff != 0) allZeroes = false;
    tempSeries.push(diff);
  }
  // console.log(tempSeries);
  return series[0] - calculateNextItem(tempSeries, allZeroes);
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

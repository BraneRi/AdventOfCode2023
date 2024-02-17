import * as readline from "readline";
import * as fs from "fs";

const FOREST = "#";
const WALK = ".";
const DOWN = "v";
const UP = "^";
const LEFT = "<";
const RIGHT = ">";

type Path = {
  row: number;
  column: number;
};

function pathToKey(p: Path): string {
  return p.row + "," + p.column;
}

async function processFile(filePath: string): Promise<void> {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read lines from the stream
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treats each line as a separate data event
  });

  const island: Map<string, { pathType: string; walked: boolean }> = new Map();

  var row = 0;
  var startingColumn: number;
  var numberOfColumns: number;
  for await (const line of rl) {
    let lineElements = line.split("");
    numberOfColumns = lineElements.length;
    lineElements.forEach((c, index) => {
      if (row == 0 && c == WALK) startingColumn = index;
      island.set(pathToKey({ row: row, column: index }), {
        pathType: c,
        walked: false,
      });
    });
    row++;
  }

  removeDeadEnds(row, numberOfColumns!, island);
  printIsland(row, numberOfColumns!, island);

  // const result = longestWalk(0, startingColumn!, island, row - 1);
  // console.log("Longest walk: " + result);
  // printIsland(row, numberOfColumns!, island);
}

function removeDeadEnds(
  row: number,
  numberOfColumns: number,
  island: Map<string, { pathType: string; walked: boolean }>
) {
  var hasDeadEnds = true;
  while (hasDeadEnds) {
    hasDeadEnds = false;
    for (let r = 1; r < row - 1; r++) {
      for (let c = 0; c < numberOfColumns; c++) {
        let value = island.get(pathToKey({ row: r, column: c }))!;
        if (value.pathType != FOREST) {
          var availableOptions = 0;
          for (let steps of [
            { rowStep: 1, columnStep: 0 },
            { rowStep: 0, columnStep: 1 },
            { rowStep: -1, columnStep: 0 },
            { rowStep: 0, columnStep: -1 },
          ]) {
            let optionPath = {
              row: r + steps.rowStep,
              column: c + steps.columnStep,
            };
            let option = island.get(pathToKey(optionPath));
            if (option && option.pathType != FOREST) availableOptions++;
          }
          if (availableOptions <= 1) {
            value.pathType = FOREST;
            hasDeadEnds = true;
          }
        }
      }
    }
  }
}

function printIsland(
  row: number,
  numberOfColumns: number,
  island: Map<string, { pathType: string; walked: boolean }>
) {
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < numberOfColumns; c++) {
      let value = island.get(pathToKey({ row: r, column: c }))!;
      let valuePrint: string;
      if (value.walked) {
        valuePrint = "O";
      } else {
        valuePrint = value.pathType;
      }
      process.stdout.write(valuePrint);
    }
    console.log();
  }
}

function longestWalk(
  row: number,
  column: number,
  island: Map<string, { pathType: string; walked: boolean }>,
  finishRow: number
): number {
  const key = pathToKey({ row, column });
  const value = island.get(pathToKey({ row, column }))!;
  if (value.walked) return Number.NEGATIVE_INFINITY;

  island.set(key, { pathType: value.pathType, walked: true });
  if (row == finishRow) {
    return 0;
  }

  switch (value.pathType) {
    case UP:
      return longestWalk(row - 1, column, island, finishRow) + 1;
    case DOWN:
      return longestWalk(row + 1, column, island, finishRow) + 1;
    case LEFT:
      return longestWalk(row, column - 1, island, finishRow) + 1;
    case RIGHT:
      return longestWalk(row, column + 1, island, finishRow) + 1;
    default: {
      let options: Path[] = [];
      for (let steps of [
        { rowStep: 1, columnStep: 0 },
        { rowStep: 0, columnStep: 1 },
        { rowStep: -1, columnStep: 0 },
        { rowStep: 0, columnStep: -1 },
      ]) {
        let optionPath = {
          row: row + steps.rowStep,
          column: column + steps.columnStep,
        };
        let option = island.get(pathToKey(optionPath));
        if (option && !option.walked && option.pathType != FOREST)
          options.push(optionPath);
      }

      return (
        1 +
        options.reduce(
          (max, option) =>
            Math.max(
              max,
              longestWalk(option.row, option.column, new Map(island), finishRow)
            ),
          Number.NEGATIVE_INFINITY
        )
      );
    }
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

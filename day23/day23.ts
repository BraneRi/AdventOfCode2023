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

  const island: Map<string, string> = new Map();

  var row = 0;
  var startingColumn: number;
  for await (const line of rl) {
    let lineElements = line.split("");
    lineElements.forEach((pathType, index) => {
      if (row == 0 && pathType == WALK) startingColumn = index;
      island.set(pathToKey({ row: row, column: index }), pathType);
    });
    row++;
  }

  const result = longestWalk(
    { row: 0, column: startingColumn! },
    island,
    row - 1
  );
  console.log("Longest walk: " + result);
}

const walkedByBranch: Map<string, number[]> = new Map();
var branchCounter = 1;

function uniqueUnion(arr1: number[], arr2: number[]): number[] {
  const resultSet = new Set<number>();
  arr1.forEach((num) => resultSet.add(num));
  arr2.forEach((num) => resultSet.add(num));
  return Array.from(resultSet.values());
}

function samePath(path1: Path, path2: Path): boolean {
  return path1.row == path2.row && path1.column == path2.column;
}

function longestWalk(
  path: Path,
  island: Map<string, string>,
  finishRow: number,
  previousStep: Path | undefined = undefined,
  branchIds: number[] = [1]
): number {
  if (path.row == finishRow) {
    return 0;
  }

  const key = pathToKey(path);
  const pathType = island.get(key)!;

  const branchesThatWalkedHere = walkedByBranch.get(key);
  if (
    branchesThatWalkedHere &&
    branchesThatWalkedHere.every((id) => branchIds.includes(id))
  ) {
    return Number.NEGATIVE_INFINITY;
  } else if (branchesThatWalkedHere) {
    walkedByBranch.set(key, uniqueUnion(branchesThatWalkedHere, branchIds));
  } else {
    walkedByBranch.set(key, branchIds);
  }

  // forced paths
  var newPath: Path;
  switch (pathType) {
    case UP:
      newPath = { row: path.row - 1, column: path.column };
      return longestWalk(newPath, island, finishRow, path, branchIds) + 1;
    case DOWN:
      newPath = { row: path.row + 1, column: path.column };
      return longestWalk(newPath, island, finishRow, path, branchIds) + 1;
    case LEFT:
      newPath = { row: path.row, column: path.column - 1 };
      return longestWalk(newPath, island, finishRow, path, branchIds) + 1;
    case RIGHT:
      newPath = { row: path.row, column: path.column + 1 };
      return longestWalk(newPath, island, finishRow, path, branchIds) + 1;
    default: {
      let options: Path[] = [];
      for (let steps of [
        { rowStep: 1, columnStep: 0 },
        { rowStep: 0, columnStep: 1 },
        { rowStep: -1, columnStep: 0 },
        { rowStep: 0, columnStep: -1 },
      ]) {
        let optionPath = {
          row: path.row + steps.rowStep,
          column: path.column + steps.columnStep,
        };
        let pathType = island.get(pathToKey(optionPath));

        const branchesThatWalkedHere = walkedByBranch.get(
          pathToKey(optionPath)
        );
        if (
          pathType &&
          pathType != FOREST &&
          isAllowed(path, optionPath, pathType)
        ) {
          if (
            (!previousStep ||
              (previousStep && !samePath(optionPath, previousStep))) &&
            (branchesThatWalkedHere?.find((id) => !branchIds.includes(id)) ??
              true)
          )
            options.push(optionPath);
        }
      }

      if (options.length == 0) {
        return Number.NEGATIVE_INFINITY;
      }

      if (options.length == 1) {
        return longestWalk(options[0], island, finishRow, path, branchIds) + 1;
      }

      return (
        1 +
        options.reduce((max, option) => {
          branchCounter++;
          return Math.max(
            max,
            longestWalk(option, island, finishRow, path, [
              ...branchIds,
              branchCounter,
            ])
          );
        }, Number.NEGATIVE_INFINITY)
      );
    }
  }
}

function isAllowed(path: Path, nextPath: Path, nextPathValue: string): boolean {
  switch (nextPathValue) {
    case UP:
      return nextPath.row != path.row + 1;
    case DOWN:
      return nextPath.row != path.row - 1;
    case LEFT:
      return nextPath.column != path.column + 1;
    case RIGHT:
      return nextPath.column != path.column - 1;
    default:
      return true;
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

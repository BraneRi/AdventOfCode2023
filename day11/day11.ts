import * as readline from "readline";
import * as fs from "fs";

interface Coordinates {
  row: number;
  column: number;
}

// 10 times = 1 original + 9
const EXPANSION_FACTOR = 1000000 - 1;

async function processFile(filePath: string): Promise<void> {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read lines from the stream
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treats each line as a separate data event
  });

  const tempLines: string[][] = [];
  for await (const line of rl) {
    const chars = line.split("");
    tempLines.push(chars);
    if (chars.filter((char) => char != ".").length == 0) {
      for (let expandTimes = 0; expandTimes < EXPANSION_FACTOR; expandTimes++) {
        tempLines.push(chars);
      }
    }
  }

  const emptyColumns = getEmptyColumns(tempLines);
  const galaxyCoordinates: Coordinates[] =
    calculateGalaxyCoordinates(tempLines);

  // instead of expanding columns, I'll add x value of expansion for each galaxy
  var sum = 0;
  var expansionX: number;
  for (let i = 0; i < galaxyCoordinates.length; i++) {
    for (let j = i + 1; j < galaxyCoordinates.length; j++) {
      expansionX = 0;
      const aColumn = galaxyCoordinates[i].column;
      const bColumn = galaxyCoordinates[j].column;
      const startColumn = Math.min(aColumn, bColumn);
      const endColumn = Math.max(aColumn, bColumn);

      var emptyColumnsInBetween = 0;
      for (let i = startColumn + 1; i < endColumn; i++) {
        if (emptyColumns.includes(i)) {
          emptyColumnsInBetween++;
        }
      }

      var distance;
      if (endColumn == galaxyCoordinates[j].column) {
        distance = manhattanDistance(galaxyCoordinates[i], {
          row: galaxyCoordinates[j].row,
          column:
            galaxyCoordinates[j].column +
            emptyColumnsInBetween * EXPANSION_FACTOR,
        });
      } else {
        distance = manhattanDistance(
          {
            row: galaxyCoordinates[i].row,
            column:
              galaxyCoordinates[i].column +
              emptyColumnsInBetween * EXPANSION_FACTOR,
          },
          galaxyCoordinates[j]
        );
      }
      // console.log("Pair:");
      // console.log(galaxyCoordinates[i]);
      // console.log(galaxyCoordinates[j]);
      // console.log("Distance: " + distance);
      // console.log();

      sum += distance;
    }
  }

  console.log(sum);
}

function manhattanDistance(point1: Coordinates, point2: Coordinates): number {
  return (
    Math.abs(point2.row - point1.row) + Math.abs(point2.column - point1.column)
  );
}

function calculateGalaxyCoordinates(expandedSpace: string[][]): Coordinates[] {
  const rows = expandedSpace.length;
  const columns = expandedSpace[0].length;
  const galaxyCoordinates: Coordinates[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (expandedSpace[row][col] == "#") {
        // process.stdout.write("#");
        galaxyCoordinates.push({
          row: row,
          column: col,
        });
      } else {
        // process.stdout.write(".");
      }
    }
    // console.log();
  }

  return galaxyCoordinates;
}

function getEmptyColumns(matrix: string[][]): number[] {
  const columns = matrix[0].length;

  const columnsToDuplicate: number[] = [];
  for (let col = 0; col < columns; col++) {
    let isEmpty = true;
    for (let row = 0; row < matrix.length; row++) {
      if (matrix[row][col] != ".") {
        isEmpty = false;
        break;
      }
    }
    if (isEmpty) {
      columnsToDuplicate.push(col);
    }
  }

  return columnsToDuplicate;
}

function duplicateEmptyColumns(matrix: string[][]): string[][] {
  const columnsToDuplicate: number[] = getEmptyColumns(matrix);
  const duplicatedMatrix: string[][] = matrix.map((row) => [...row]);

  var movedToRight = 0;
  for (var col of columnsToDuplicate) {
    for (let expandTimes = 0; expandTimes < EXPANSION_FACTOR; expandTimes++) {
      for (let i = 0; i < matrix.length; i++) {
        duplicatedMatrix[i].splice(col + movedToRight + 1, 0, matrix[i][col]);
      }
      movedToRight++;
    }
  }

  return duplicatedMatrix;
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

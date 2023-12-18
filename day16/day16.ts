import * as readline from "readline";
import * as fs from "fs";

interface CaveItem {
  value: string;
  // to keep track of multiple energizations (e.g. obstacles from each side)
  energized: { up: boolean; down: boolean; left: boolean; right: boolean };
}

async function processFile(filePath: string): Promise<void> {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read lines from the stream
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treats each line as a separate data event
  });

  const cave: CaveItem[][] = [];
  for await (const line of rl) {
    cave.push(
      line.split("").map((char) => ({
        value: char,
        energized: { up: false, down: false, left: false, right: false },
      }))
    );
  }

  // visualizeEnergizedCave(energizedCave);
  const maxEnergy = findMostEnergizedCave(cave);
  console.log(maxEnergy);
}

function findMostEnergizedCave(cave: CaveItem[][]): number {
  var currentMax = -1;

  for (var row = 0; row < cave.length; row++) {
    const caveCopy = deepCopy(cave);
    var energizedCave = energize(row, -1, caveCopy, Direction.Right, 0);
    currentMax = Math.max(currentMax, countEnergized(energizedCave));
  }

  for (var row = 0; row < cave.length; row++) {
    const caveCopy = deepCopy(cave);
    var energizedCave = energize(
      row,
      cave[0].length,
      caveCopy,
      Direction.Left,
      0
    );
    currentMax = Math.max(currentMax, countEnergized(energizedCave));
  }

  for (var col = 0; col < cave[0].length; col++) {
    const caveCopy = deepCopy(cave);
    var energizedCave = energize(cave.length, col, caveCopy, Direction.Up, 0);
    currentMax = Math.max(currentMax, countEnergized(energizedCave));
  }

  for (var col = 0; col < cave[0].length; col++) {
    const caveCopy = deepCopy(cave);
    var energizedCave = energize(-1, col, caveCopy, Direction.Down, 0);
    currentMax = Math.max(currentMax, countEnergized(energizedCave));
  }

  return currentMax;
}

function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

function energize(
  currentRow: number,
  currentColumn: number,
  cave: CaveItem[][],
  direction: Direction,
  energyLevel: number
): CaveItem[][] {
  // this means we entered a loop
  if (
    calculateEnergyLevel(cave) == energyLevel &&
    currentColumn >= 0 &&
    currentRow >= 0
  ) {
    // console.log("Im in a loop at (" + currentRow + "," + currentColumn + ")");
    return cave;
  }

  // calculate old energy level, before change so we can compare changes in next step
  const oldEnergyLevel = calculateEnergyLevel(cave);

  var nextRow: number;
  var nextColumn: number;

  switch (direction) {
    case Direction.Up: {
      nextRow = currentRow - 1;
      if (nextRow < 0) {
        // console.log("Too high");
        return cave;
      }
      nextColumn = currentColumn;
      break;
    }
    case Direction.Down: {
      nextRow = currentRow + 1;
      if (nextRow >= cave.length) {
        // console.log("Too low");
        return cave;
      }
      nextColumn = currentColumn;
      break;
    }
    case Direction.Left: {
      nextRow = currentRow;
      nextColumn = currentColumn - 1;
      if (nextColumn < 0) {
        // console.log("Too left");
        return cave;
      }
      break;
    }
    case Direction.Right: {
      nextRow = currentRow;
      nextColumn = currentColumn + 1;
      if (nextColumn >= cave[0].length) {
        // console.log("Too right");
        return cave;
      }
      break;
    }
  }

  const element = cave[nextRow][nextColumn];

  switch (element.value) {
    case "/": {
      switch (direction) {
        case Direction.Down:
          element.energized = {
            up: element.energized.up,
            down: true,
            left: element.energized.left,
            right: element.energized.right,
          };
          return energize(
            nextRow,
            nextColumn,
            cave,
            Direction.Left,
            oldEnergyLevel
          );
        case Direction.Up:
          element.energized = {
            up: true,
            down: element.energized.down,
            left: element.energized.left,
            right: element.energized.right,
          };
          return energize(
            nextRow,
            nextColumn,
            cave,
            Direction.Right,
            oldEnergyLevel
          );
        case Direction.Right:
          element.energized = {
            up: element.energized.up,
            down: element.energized.down,
            left: element.energized.left,
            right: true,
          };
          return energize(
            nextRow,
            nextColumn,
            cave,
            Direction.Up,
            oldEnergyLevel
          );
        case Direction.Left:
          element.energized = {
            up: element.energized.up,
            down: element.energized.down,
            left: true,
            right: element.energized.right,
          };
          return energize(
            nextRow,
            nextColumn,
            cave,
            Direction.Down,
            oldEnergyLevel
          );
      }
    }
    case "\\": {
      switch (direction) {
        case Direction.Down:
          element.energized = {
            up: element.energized.up,
            down: true,
            left: element.energized.left,
            right: element.energized.right,
          };
          return energize(
            nextRow,
            nextColumn,
            cave,
            Direction.Right,
            oldEnergyLevel
          );
        case Direction.Up: {
          element.energized = {
            up: true,
            down: element.energized.down,
            left: element.energized.left,
            right: element.energized.right,
          };

          return energize(
            nextRow,
            nextColumn,
            cave,
            Direction.Left,
            oldEnergyLevel
          );
        }
        case Direction.Right:
          element.energized = {
            up: element.energized.up,
            down: element.energized.down,
            left: element.energized.left,
            right: true,
          };
          return energize(
            nextRow,
            nextColumn,
            cave,
            Direction.Down,
            oldEnergyLevel
          );
        case Direction.Left:
          element.energized = {
            up: element.energized.up,
            down: element.energized.down,
            left: true,
            right: element.energized.right,
          };
          return energize(
            nextRow,
            nextColumn,
            cave,
            Direction.Up,
            oldEnergyLevel
          );
      }
    }
    case ".": {
      element.energized = {
        up: direction == Direction.Up ? true : element.energized.up,
        down: direction == Direction.Down ? true : element.energized.down,
        left: direction == Direction.Left ? true : element.energized.left,
        right: direction == Direction.Right ? true : element.energized.right,
      };
      const nextCave = energize(
        nextRow,
        nextColumn,
        cave,
        direction,
        oldEnergyLevel
      );
      return nextCave;
    }
    case "|": {
      switch (direction) {
        case Direction.Down: {
          element.energized = {
            up: element.energized.up,
            down: true,
            left: element.energized.left,
            right: element.energized.right,
          };
          return energize(nextRow, nextColumn, cave, direction, oldEnergyLevel);
        }
        case Direction.Up: {
          element.energized = {
            up: true,
            down: element.energized.down,
            left: element.energized.left,
            right: element.energized.right,
          };
          return energize(nextRow, nextColumn, cave, direction, oldEnergyLevel);
        }
        case Direction.Right: {
          element.energized = {
            up: element.energized.up,
            down: element.energized.down,
            left: element.energized.left,
            right: true,
          };
          const newCave = energize(
            nextRow,
            nextColumn,
            cave,
            Direction.Up,
            oldEnergyLevel
          );
          return energize(
            nextRow,
            nextColumn,
            newCave,
            Direction.Down,
            oldEnergyLevel
          );
        }
        case Direction.Left: {
          element.energized = {
            up: element.energized.up,
            down: element.energized.down,
            left: true,
            right: element.energized.right,
          };
          const newCave = energize(
            nextRow,
            nextColumn,
            cave,
            Direction.Up,
            oldEnergyLevel
          );
          return energize(
            nextRow,
            nextColumn,
            newCave,
            Direction.Down,
            oldEnergyLevel
          );
        }
      }
    }
    case "-": {
      switch (direction) {
        case Direction.Left: {
          element.energized = {
            up: element.energized.up,
            down: element.energized.down,
            left: true,
            right: element.energized.right,
          };
          return energize(nextRow, nextColumn, cave, direction, oldEnergyLevel);
        }
        case Direction.Right: {
          element.energized = {
            up: element.energized.up,
            down: element.energized.down,
            left: element.energized.left,
            right: true,
          };
          return energize(nextRow, nextColumn, cave, direction, oldEnergyLevel);
        }
        case Direction.Down: {
          element.energized = {
            up: element.energized.up,
            down: true,
            left: element.energized.left,
            right: element.energized.right,
          };
          const newCave = energize(
            nextRow,
            nextColumn,
            cave,
            Direction.Left,
            oldEnergyLevel
          );
          return energize(
            nextRow,
            nextColumn,
            newCave,
            Direction.Right,
            oldEnergyLevel
          );
        }
        case Direction.Up: {
          element.energized = {
            up: true,
            down: element.energized.down,
            left: element.energized.left,
            right: element.energized.right,
          };
          const newCave = energize(
            nextRow,
            nextColumn,
            cave,
            Direction.Left,
            oldEnergyLevel
          );
          return energize(
            nextRow,
            nextColumn,
            newCave,
            Direction.Right,
            oldEnergyLevel
          );
        }
      }
    }
    default: {
      console.log("Not valid cave element");
      return cave;
    }
  }
}

function calculateEnergyLevel(cave: CaveItem[][]): number {
  var sum = 0;

  for (let i = 0; i < cave.length; i++) {
    for (let j = 0; j < cave[0].length; j++) {
      let energized = cave[i][j].energized;
      var energizedSum = 0;
      if (energized.up) energizedSum++;
      if (energized.down) energizedSum++;
      if (energized.left) energizedSum++;
      if (energized.right) energizedSum++;
      sum += energizedSum;
    }
  }

  return sum;
}

function countEnergized(cave: CaveItem[][]): number {
  var sum = 0;

  for (let i = 0; i < cave.length; i++) {
    for (let j = 0; j < cave[0].length; j++) {
      let energized = cave[i][j].energized;
      var isEnergized = false;
      if (energized.up) isEnergized = true;
      if (energized.down) isEnergized = true;
      if (energized.left) isEnergized = true;
      if (energized.right) isEnergized = true;
      sum += isEnergized ? 1 : 0;
    }
  }

  return sum;
}

function visualizeEnergizedCave(cave: CaveItem[][]) {
  for (let i = 0; i < cave.length; i++) {
    for (let j = 0; j < cave[0].length; j++) {
      let energized = cave[i][j].energized;
      if (energized.down || energized.up || energized.left || energized.right) {
        process.stdout.write("#");
      } else {
        process.stdout.write(cave[i][j].value);
      }
    }
    process.stdout.write("\n");
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

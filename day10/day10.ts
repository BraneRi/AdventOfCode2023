import * as readline from "readline";
import * as fs from "fs";

function toPipeMapKey(coordinates: Coordinates): string {
  return coordinates.row + " " + coordinates.column;
}

interface Coordinates {
  row: number;
  column: number;
}

interface Pipe {
  value: string;
  coordinate: Coordinates;
  neighbour1Coordinate: Coordinates;
  neighbour2Coordinate: Coordinates;
  stepsFromStart: number;
  partOfMainLoop: boolean;
}

async function processFile(filePath: string): Promise<void> {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read lines from the stream
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treats each line as a separate data event
  });

  var row = 0;
  var column = 0;

  var maxColumns: number;
  const pipeMap: Map<string, Pipe> = new Map();
  var startPipeCoordinates: Coordinates | undefined;
  for await (const line of rl) {
    line.split("").forEach((char) => {
      switch (char) {
        case ".": {
          // no pipe
          break;
        }
        case "S": {
          startPipeCoordinates = { row: row, column: column };
          break;
        }
        case "|": {
          pipeMap.set(toPipeMapKey({ row, column }), {
            value: char,
            coordinate: { row: row, column: column },
            neighbour1Coordinate: { row: row - 1, column: column },
            neighbour2Coordinate: { row: row + 1, column: column },
            stepsFromStart: -1,
            // for now
            partOfMainLoop: false,
          });
          break;
        }
        case "-": {
          pipeMap.set(toPipeMapKey({ row, column }), {
            value: char,
            coordinate: { row: row, column: column },
            neighbour1Coordinate: { row: row, column: column - 1 },
            neighbour2Coordinate: { row: row, column: column + 1 },
            stepsFromStart: -1,
            // for now
            partOfMainLoop: false,
          });
          break;
        }
        case "7": {
          pipeMap.set(toPipeMapKey({ row, column }), {
            value: char,
            coordinate: { row: row, column: column },
            neighbour1Coordinate: { row: row, column: column - 1 },
            neighbour2Coordinate: { row: row + 1, column: column },
            stepsFromStart: -1,
            // for now
            partOfMainLoop: false,
          });
          break;
        }
        case "F": {
          pipeMap.set(toPipeMapKey({ row, column }), {
            value: char,
            coordinate: { row: row, column: column },
            neighbour1Coordinate: { row: row, column: column + 1 },
            neighbour2Coordinate: { row: row + 1, column: column },
            stepsFromStart: -1,
            // for now
            partOfMainLoop: false,
          });
          break;
        }
        case "L": {
          pipeMap.set(toPipeMapKey({ row, column }), {
            value: char,
            coordinate: { row: row, column: column },
            neighbour1Coordinate: { row: row - 1, column: column },
            neighbour2Coordinate: { row: row, column: column + 1 },
            stepsFromStart: -1,
            // for now
            partOfMainLoop: false,
          });
          break;
        }
        case "J": {
          pipeMap.set(toPipeMapKey({ row, column }), {
            value: char,
            coordinate: { row: row, column: column },
            neighbour1Coordinate: { row: row, column: column - 1 },
            neighbour2Coordinate: { row: row - 1, column: column },
            stepsFromStart: -1,
            // for now
            partOfMainLoop: false,
          });
          break;
        }
        default: {
          console.log("Unsupported character");
          break;
        }
      }
      column++;
    });

    row++;
    maxColumns = column;
    column = 0;
  }

  if (startPipeCoordinates) {
    const startPipe = getStartPipe(
      startPipeCoordinates,
      pipeMap,
      row,
      maxColumns!
    );

    setCorrectStartPipeValue(startPipe);
    pipeMap.set(toPipeMapKey(startPipe.coordinate), startPipe);
    removeJunkFromPipeMap(startPipe, pipeMap);
    // const maxSteps = findMaxSteps(startPipe, pipeMap);
    // console.log("Full length: " + maxSteps);
    // console.log("Farthest: " + Math.ceil(maxSteps / 2));

    const result = getEnclosedTilesNuber(pipeMap, row, maxColumns!);
    console.log(result);
  }
}

function checkLJ(startPipe: Pipe, first: Coordinates, second: Coordinates) {
  if (first.row == startPipe.coordinate.row - 1) {
    if (second.column == startPipe.coordinate.column - 1) {
      startPipe.value = "J";
    }

    if (second.column == startPipe.coordinate.column + 1) {
      startPipe.value = "L";
    }
  }
}

function checkF7(startPipe: Pipe, first: Coordinates, second: Coordinates) {
  if (first.row == startPipe.coordinate.row + 1) {
    if (second.column == startPipe.coordinate.column - 1) {
      startPipe.value = "7";
    }

    if (second.column == startPipe.coordinate.column + 1) {
      startPipe.value = "F";
    }
  }
}

function setCorrectStartPipeValue(startPipe: Pipe) {
  checkLJ(
    startPipe,
    startPipe.neighbour1Coordinate,
    startPipe.neighbour2Coordinate
  );
  checkLJ(
    startPipe,
    startPipe.neighbour2Coordinate,
    startPipe.neighbour1Coordinate
  );

  checkF7(
    startPipe,
    startPipe.neighbour1Coordinate,
    startPipe.neighbour2Coordinate
  );
  checkF7(
    startPipe,
    startPipe.neighbour2Coordinate,
    startPipe.neighbour1Coordinate
  );

  if (
    startPipe.neighbour1Coordinate.row == startPipe.coordinate.row &&
    startPipe.neighbour2Coordinate.row == startPipe.coordinate.row
  ) {
    startPipe.value = "-";
  }

  if (
    startPipe.neighbour1Coordinate.column == startPipe.coordinate.column &&
    startPipe.neighbour2Coordinate.column == startPipe.coordinate.column
  ) {
    startPipe.value = "|";
  }
}

function isOdd(input: number): boolean {
  return input % 2 == 1;
}

function getEnclosedTilesNuber(
  pipeMap: Map<string, Pipe>,
  maxRows: number,
  maxColumns: number
) {
  var enclosed: number = 0;
  var pipesFromLeft: number;
  var afterF: boolean;
  var afterL: boolean;

  for (let row = 0; row < maxRows; row++) {
    pipesFromLeft = 0;
    afterF = false;
    afterL = false;
    for (let column = 0; column < maxColumns; column++) {
      const pipe = pipeMap.get(toPipeMapKey({ row: row, column: column }));

      const leftPipe = pipeMap.get(
        toPipeMapKey({ row: row, column: column - 1 })
      );

      if (leftPipe) {
        if (leftPipe.value == "F") {
          afterF = true;
        } else if (leftPipe.value == "L") {
          afterL = true;
        }

        if (!afterF && !afterL) {
          pipesFromLeft++;
        }

        if (leftPipe.value == "7") {
          if (afterL) {
            // counts as polygon edge
            pipesFromLeft++;
          }
          afterF = false;
          afterL = false;
        } else if (leftPipe.value == "J") {
          if (afterF) {
            // counts as polygon edge
            pipesFromLeft++;
          }
          afterF = false;
          afterL = false;
        }
      }

      if (!pipe && isOdd(pipesFromLeft)) {
        process.stdout.write("*");
        enclosed++;
      } else {
        if (pipe) {
          process.stdout.write("" + pipe.value);
        } else {
          process.stdout.write(".");
        }
      }
    }
    console.log();
  }

  return enclosed;
}

// converted part 1 function to remove junk
function removeJunkFromPipeMap(
  startPipe: Pipe,
  pipeMap: Map<string, Pipe>
): number {
  // console.log(startPipe.value);
  var previousPipe = startPipe;
  var nextPipe = pipeMap.get(toPipeMapKey(startPipe.neighbour1Coordinate))!;
  var maxSteps = 0;

  var nextCoordinate: Coordinates;
  while (nextPipe?.stepsFromStart != 0) {
    if (nextPipe) {
      nextPipe.partOfMainLoop = true;
    }
    // console.log(nextPipe?.value);
    if (
      !coordinateMatch(nextPipe?.neighbour1Coordinate, previousPipe?.coordinate)
    ) {
      nextCoordinate = nextPipe?.neighbour1Coordinate;
    } else {
      nextCoordinate = nextPipe?.neighbour2Coordinate;
    }

    previousPipe = nextPipe;

    if (nextCoordinate) {
      nextPipe = pipeMap.get(toPipeMapKey(nextCoordinate))!;
    }
    maxSteps++;
  }

  Array.from(pipeMap.entries()).forEach((entry) => {
    if (!entry[1].partOfMainLoop) {
      pipeMap.delete(entry[0]);
    }
  });
  return maxSteps;
}

function coordinateMatch(
  coordinates1: Coordinates,
  coordinates2: Coordinates
): boolean {
  if (
    coordinates1.row == coordinates2.row &&
    coordinates1.column == coordinates2.column
  )
    return true;
  return false;
}

function getStartPipe(
  startPipeCoordinates: Coordinates,
  pipeMap: Map<string, Pipe>,
  maxRows: number,
  maxColumns: number
) {
  var currentPipe: Pipe | undefined;
  const neighbours: Coordinates[] = [];
  for (
    let row = Math.max(0, startPipeCoordinates.row - 1);
    row < Math.min(startPipeCoordinates.row + 2, maxRows);
    row++
  ) {
    for (
      let column = Math.max(0, startPipeCoordinates.column - 1);
      column < Math.min(startPipeCoordinates.column + 2, maxColumns);
      column++
    ) {
      currentPipe = pipeMap.get(toPipeMapKey({ row, column }));
      if (currentPipe) {
        if (
          coordinateMatch(
            startPipeCoordinates,
            currentPipe.neighbour1Coordinate!
          ) ||
          coordinateMatch(
            startPipeCoordinates,
            currentPipe.neighbour2Coordinate!
          )
        ) {
          neighbours.push(currentPipe.coordinate!);
        }
      }
    }
  }

  return {
    value: "S",
    coordinate: startPipeCoordinates,
    neighbour1Coordinate: neighbours[0],
    neighbour2Coordinate: neighbours[1],
    stepsFromStart: 0,
    // for now
    partOfMainLoop: true,
  };
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

import * as readline from "readline";
import * as fs from "fs";

type Coordinate = {
  x: number;
  y: number;
  z: number;
};

type Brick = {
  start: Coordinate;
  end: Coordinate;
};

async function processFile(filePath: string): Promise<void> {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read lines from the stream
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treats each line as a separate data event
  });

  var bricks: Brick[] = [];

  for await (const line of rl) {
    const startEnd = line.split("~");
    const [startX, startY, startZ] = startEnd[0].split(",").map(Number);
    const [endX, endY, endZ] = startEnd[1].split(",").map(Number);
    bricks.push({
      start: { x: startX, y: startY, z: startZ },
      end: { x: endX, y: endY, z: endZ },
    });
  }

  // sort them from lowest to highest
  bricks = bricks.sort((a, b) => a.start.z - b.end.z);

  // key is number id of bricks as they come, values is list of ids that brick supports
  const bricksOnTop = new Map<number, number[]>();

  freeFall(bricks, bricksOnTop);
  console.log(bricksOnTop);
}

type Coordinate2D = { x: number; y: number };

function freeFall(bricks: Brick[], bricksOnTop: Map<number, number[]>) {
  var index = 1;
  // key is coordinate and value is how high we reached on that coordinate, with coordinate of brick occupying it
  const tallestCoordinates: Map<Coordinate2D, { id: number; height: number }> =
    new Map();
  for (let brick of bricks) {
    if (brick.start.z == brick.start.z) {
      resolveHorizontalBricks(brick, tallestCoordinates, bricksOnTop, index);
    } else {
      resolveVerticalBricks(brick, tallestCoordinates, bricksOnTop, index);
    }
    index++;
  }
}

function resolveHorizontalBricks(
  brick: Brick,
  tallestCoordinates: Map<Coordinate2D, { id: number; height: number }>,
  bricksOnTop: Map<number, number[]>,
  index: number
) {
  var tallestBelow = { id: -1, height: 0 };
  for (let coordinate2D of coordinates(brick)) {
    let currentBelow = tallestCoordinates.get(coordinate2D);
    if (currentBelow && currentBelow.height > tallestBelow.height) {
      // TODO two tallest is valid case, we have to update both
      tallestBelow = currentBelow;
    }
  }

  if (tallestBelow.id != -1) {
    const topBricks = bricksOnTop.get(tallestBelow.id);
    if (topBricks) {
      topBricks.push(index);
    } else {
      bricksOnTop.set(tallestBelow.id, [index]);
    }

    for (let coordinate2D of coordinates(brick)) {
      tallestCoordinates.set(coordinate2D, {
        id: index,
        height: tallestBelow.height + 1,
      });
    }
  } else {
    for (let coordinate2D of coordinates(brick)) {
      tallestCoordinates.set(coordinate2D, {
        id: index,
        height: 1,
      });
    }
  }
}

function resolveVerticalBricks(
  brick: Brick,
  tallestCoordinates: Map<Coordinate2D, { id: number; height: number }>,
  bricksOnTop: Map<number, number[]>,
  index: number
) {
  var lowestSection: Coordinate;
  var highestSection: Coordinate;
  if (brick.start.z < brick.end.z) {
    lowestSection = brick.start;
    highestSection = brick.end;
  } else {
    highestSection = brick.start;
    lowestSection = brick.end;
  }

  const tallestBelow = tallestCoordinates.get({
    x: lowestSection.x,
    y: lowestSection.y,
  });

  if (tallestBelow) {
    const topBricks = bricksOnTop.get(tallestBelow.id);
    if (topBricks) {
      topBricks.push(index);
    } else {
      bricksOnTop.set(tallestBelow.id, [index]);
    }

    tallestCoordinates.set(
      { x: lowestSection.x, y: lowestSection.y },
      {
        id: index,
        height: tallestBelow.height + highestSection.z - lowestSection.z,
      }
    );
  } else {
    tallestCoordinates.set(
      { x: lowestSection.x, y: lowestSection.y },
      { id: index, height: highestSection.z - lowestSection.z }
    );
  }
}

function coordinates(brick: Brick): Coordinate2D[] {
  const result: Coordinate2D[] = [];

  for (let x = brick.start.x; x <= brick.end.x; x++) {
    for (let y = brick.start.y; y <= brick.end.y; y++) {
      result.push({ x, y });
    }
  }
  return result;
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

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

  // key is level -> z coordinate
  // value are taken coordinates on that level after fall
  const brickStack = new Map<number, { x: number; y: number }[]>();

  freeFall(bricks, brickStack);
  console.log(brickStack);
}

function freeFall(
  bricks: Brick[],
  brickStack: Map<number, { x: number; y: number }[]>
) {
  for (let brick of bricks) {
    for (let c of coordinatesPerLevel(brick)) {
      let level = brickStack.get(c.z) ?? [];
      if (!level.includes({ x: c.x, y: c.y })) {
        level?.push({ x: c.x, y: c.y });
      } else {
        // TODO find a clean way to ad brick on top of existing
      }
      brickStack.set(c.z, level);
    }
  }
}

function coordinatesPerLevel(brick: Brick): Coordinate[] {
  const coordinates = [];
  // TODO
  return coordinates;
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

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
  bricks = bricks.sort(
    (a, b) => Math.min(a.start.z, a.end.z) - Math.min(b.start.z, b.end.z)
  );

  // key is number id of bricks as they come, values is list of ids that brick supports
  const bricksOnTop = new Map<number, number[]>();

  freeFall(bricks, bricksOnTop);

  // switch to letters for easy comparing
  // const debugResult = Array.from(bricksOnTop.entries()).map((entry) => {
  //   return (
  //     // String.fromCharCode(entry[0] + 64) +
  //     entry[0] +
  //     " is supporting: " +
  //     entry[1].reduce((str, num) => str + num + " and ", "").slice(0, -5)
  //   );
  // });
  // process.stdout.write(debugResult.join("\n"));
  // console.log();

  const supportedBricks: Map<number, number> = new Map();
  const keys = Array.from(bricksOnTop.keys());
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const valuesForKey = bricksOnTop.get(key)!;

    for (let value of valuesForKey) {
      const numberOfValue = supportedBricks.get(value);
      if (numberOfValue) {
        supportedBricks.set(value, numberOfValue + 1);
      } else {
        supportedBricks.set(value, 1);
      }
    }
  }

  var cannotBeDestroyedKeys: Set<number> = new Set();
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const valuesForKey = bricksOnTop.get(key)!;

    for (let value of valuesForKey) {
      const numberOfValue = supportedBricks.get(value)!;
      if (numberOfValue == 1) {
        cannotBeDestroyedKeys.add(key);
        break;
      }
    }
  }

  var sum = 0;
  console.log(supportedBricks);
  cannotBeDestroyedKeys.forEach((key) => {
    alreadyDestroyed.clear();
    // -1 because we count only bricks that are effect of destroying botto one
    let currentChain =
      countChainBricks(key, bricksOnTop, new Map(supportedBricks)) - 1;
    // console.log(currentChain);
    sum += currentChain;
    console.log("---------------------");
  });

  console.log("Part two: " + sum);

  console.log("cannotBeDestroyed: " + cannotBeDestroyedKeys.size);
  const topOnes = bricks.filter((_, index) => !bricksOnTop.has(index)).length;

  // not even using top ones if we count cannot's
  console.log("There are " + topOnes + " bricks on top");
  console.log(
    "We can destroy " + (bricks.length - cannotBeDestroyedKeys.size) + " bricks"
  );
}

const alreadyDestroyed: Set<number> = new Set();

function countChainBricks(
  currentKey: number,
  bricksOnTop: Map<number, number[]>,
  supportedBricks: Map<number, number>
): number {
  console.log("key: " + currentKey);
  const supportedKeys = bricksOnTop.get(currentKey);
  console.log("supportedKeys: " + supportedKeys);
  if (!supportedKeys) {
    console.log("Adding one for top key: " + currentKey);
    return 1;
  }

  console.log("Adding 1 for: " + currentKey);
  var sum = 1;
  for (let key of supportedKeys) {
    const bricksSupporting = supportedBricks.get(key)! - 1;
    supportedBricks.set(key, bricksSupporting);

    if (!alreadyDestroyed.has(key)) {
      if (bricksSupporting == 0) {
        alreadyDestroyed.add(key);
        console.log("Entering new chain for: " + key);
        sum += countChainBricks(key, bricksOnTop, supportedBricks);
      } else {
        console.log("Other brick is holding this one: " + key);
      }
    }
  }
  return sum;
}

type Coordinate2D = { x: number; y: number };

function freeFall(bricks: Brick[], bricksOnTop: Map<number, number[]>) {
  var index = 0;
  // key is coordinate and value is how high we reached on that coordinate, with coordinate of brick occupying it
  const tallestCoordinates: Map<string, { id: number; height: number }> =
    new Map();
  for (let brick of bricks) {
    if (brick.start.z == brick.end.z) {
      resolveHorizontalBricks(brick, tallestCoordinates, bricksOnTop, index);
    } else {
      resolveVerticalBricks(brick, tallestCoordinates, bricksOnTop, index);
    }
    index++;
  }
}

function coordinate2DtoKey(coordinate2D: Coordinate2D): string {
  return coordinate2D.x + "," + coordinate2D.y;
}

function resolveHorizontalBricks(
  brick: Brick,
  tallestCoordinates: Map<string, { id: number; height: number }>,
  bricksOnTop: Map<number, number[]>,
  index: number
) {
  let tallestBelowList: { id: number; height: number }[] = [];
  for (let coordinate2D of coordinates(brick)) {
    let currentBelow = tallestCoordinates.get(coordinate2DtoKey(coordinate2D));
    if (
      currentBelow &&
      (!tallestBelowList.length ||
        currentBelow.height > tallestBelowList[0].height)
    ) {
      tallestBelowList = [currentBelow];
    } else if (
      currentBelow &&
      currentBelow.height === tallestBelowList[0].height
    ) {
      tallestBelowList.push(currentBelow);
    }
  }

  // remove duplicates that have same id
  tallestBelowList = tallestBelowList.reduce(
    (acc: { id: number; height: number }[], curr) => {
      if (!acc.some((item) => item.id === curr.id)) {
        acc.push(curr);
      }
      return acc;
    },
    []
  );

  if (tallestBelowList.length) {
    for (const tallestBelow of tallestBelowList) {
      updateBricksOnTop(bricksOnTop, tallestBelow, index);
    }

    for (let coordinate2D of coordinates(brick)) {
      tallestCoordinates.set(coordinate2DtoKey(coordinate2D), {
        id: index,
        height: tallestBelowList[0].height + 1, // we know height is 1 because it is horizontal brick
      });
    }
  } else {
    for (let coordinate2D of coordinates(brick)) {
      tallestCoordinates.set(coordinate2DtoKey(coordinate2D), {
        id: index,
        height: 1,
      });
    }
  }
}

function updateBricksOnTop(
  bricksOnTop: Map<number, number[]>,
  tallestBelow: { id: number; height: number },
  index: number
) {
  const topBricks = bricksOnTop.get(tallestBelow.id);
  if (topBricks) {
    bricksOnTop.set(tallestBelow.id, [...topBricks, index]);
  } else {
    bricksOnTop.set(tallestBelow.id, [index]);
  }
}

function resolveVerticalBricks(
  brick: Brick,
  tallestCoordinates: Map<string, { id: number; height: number }>,
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

  // we know there can be only one tallest below because it is vertical brick
  const tallestBelow = tallestCoordinates.get(
    coordinate2DtoKey({
      x: lowestSection.x,
      y: lowestSection.y,
    })
  );

  if (tallestBelow) {
    updateBricksOnTop(bricksOnTop, tallestBelow, index);

    tallestCoordinates.set(
      coordinate2DtoKey({ x: lowestSection.x, y: lowestSection.y }),
      {
        id: index,
        height: tallestBelow.height + highestSection.z - lowestSection.z + 1,
      }
    );
  } else {
    tallestCoordinates.set(
      coordinate2DtoKey({ x: lowestSection.x, y: lowestSection.y }),
      { id: index, height: highestSection.z - lowestSection.z + 1 }
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

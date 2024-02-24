import * as readline from "readline";
import * as fs from "fs";

const INPUT_REGEX =
  /(\d+),\s*(\d+),\s*(\d+)\s*@\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)/;

type Hailstone = {
  px: number;
  py: number;
  pz: number;
  vx: number;
  vy: number;
  vz: number;
};

async function processFile(filePath: string): Promise<void> {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read lines from the stream
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treats each line as a separate data event
  });

  // Hailstone position and velocity at time = 0
  const hailstones: Hailstone[] = [];
  for await (const line of rl) {
    const match = line.match(INPUT_REGEX);

    if (match) {
      // velocities represent change in axis each NANOSECOND
      const [_, px, py, pz, vx, vy, vz] = match;
      hailstones.push({
        px: parseInt(px),
        py: parseInt(py),
        pz: parseInt(pz),
        vx: parseInt(vx),
        vy: parseInt(vy),
        vz: parseInt(vz),
      });
    }
  }

  const areaStart = 200000000000000;
  const areaEnd = 400000000000000;

  var countFutureIntersections = 0;

  var hailstone1: Hailstone;
  var hailstone2: Hailstone;
  for (let i = 0; i < hailstones.length - 1; i++) {
    for (let j = i + 1; j < hailstones.length; j++) {
      hailstone1 = hailstones[i];
      hailstone2 = hailstones[j];

      // console.log("Checking two hailstones:");
      // console.log(hailstone1);
      // console.log(hailstone2);

      const intersection = lineIntersection(hailstone1, hailstone2);
      switch (intersection) {
        case "parallel": {
          // console.log("Lines are parallel");
          break;
        }
        case "past 1": {
          // console.log("Lines cross in the past for hailstone 1");
          break;
        }
        case "past 2": {
          // console.log("Lines cross in the past for hailstone 2");
          break;
        }
        default: {
          if (insideArea(intersection, areaStart, areaEnd)) {
            // console.log("Intersection in the FUTURE:");
            // console.log(intersection);
            countFutureIntersections++;
          } else {
            // console.log("Intersection OUTSIDE AREA:");
            // console.log(intersection);
          }
        }
      }
      // console.log();
    }
  }

  // 31177 too high
  console.log(countFutureIntersections);
}

type Intersection = {
  x: number;
  y: number;
  z: number;
};

function insideArea(
  intersection: Intersection,
  areaStart: number,
  areaEnd: number
): boolean {
  return (
    intersection.x <= areaEnd &&
    intersection.x >= areaStart &&
    intersection.y >= areaStart &&
    intersection.y <= areaEnd
  );
}

// If there is no intersection, lines are parallel - we return undefined
// Also, if intersection is in past - we return undefined
function lineIntersection(
  hailstone1: Hailstone,
  hailstone2: Hailstone
): Intersection | "past 1" | "past 2" | "parallel" {
  const dx = hailstone2.px - hailstone1.px;
  const dy = hailstone2.py - hailstone1.py;

  const det = hailstone1.vx * hailstone2.vy - hailstone2.vx * hailstone1.vy;
  if (det === 0) return "parallel";

  const t = (dx * hailstone2.vy - dy * hailstone2.vx) / det;

  const intersection = {
    x: hailstone1.px + hailstone1.vx * t,
    y: hailstone1.py + hailstone1.vy * t,
    z: hailstone1.pz + hailstone1.vz * t,
  };

  if (isInThePast(intersection, hailstone1)) return "past 1";
  if (isInThePast(intersection, hailstone2)) return "past 2";

  return intersection;
}

function isInThePast(
  intersection: Intersection,
  hailstone: Hailstone
): boolean {
  if (intersection.x < hailstone.px && hailstone.vx > 0) return true;
  if (intersection.x > hailstone.px && hailstone.vx < 0) return true;

  if (intersection.y < hailstone.py && hailstone.vy > 0) return true;
  if (intersection.y < hailstone.py && hailstone.vy > 0) return true;

  // Ignore for Part 1
  // if (intersection.z < hailstone.px && hailstone.vz > 0) return true;
  // if (intersection.z < hailstone.px && hailstone.vz > 0) return true;

  return false;
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

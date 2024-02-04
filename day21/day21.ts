import * as readline from "readline";
import * as fs from "fs";

type Coordinate = {
  x: number;
  y: number;
};

class PriorityQueue {
  items: { key: Coordinate; priority: number }[];

  constructor() {
    this.items = [];
  }

  enqueue(key: Coordinate, priority: number) {
    this.items.push({ key, priority });
    this.sort();
  }

  dequeue(): Coordinate | undefined {
    return this.items.shift()?.key;
  }

  sort() {
    this.items.sort((a, b) => a.priority - b.priority);
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

async function processFile(filePath: string): Promise<void> {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read lines from the stream
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treats each line as a separate data event
  });

  // number is not necessary, I only use Map for quick fetching has key
  const graph = new Map<string, number>();

  var x = 0;
  var source: Coordinate;
  for await (const line of rl) {
    line.split("").forEach((c, index) => {
      if (c === "S") {
        source = { x: x, y: index };
        graph.set(coordinateToKey(source), 1);
      }
      if (c === ".") {
        graph.set(coordinateToKey({ x: x, y: index }), 1);
      }
    });
    x++;
  }

  // I rely on input being same width and height
  const graphSize = x;

  const steps = 26501365;

  // PART 1
  // var distances = dijkstra(graph, source!, steps, graphSize, undefined);
  // console.log("total gardens: " + getSteps(distances, steps));
  // visualizeDistances(distances, graphSize, 4);

  // PART 2
  const distancesForTwo = dijkstra(
    graph,
    source!,
    65 + 131 * 2,
    graphSize,
    undefined
  );

  const upperLeftTriangle = calculateDistancesInSquare(
    131 * -2,
    131 * -1,
    131 * -1,
    0,
    distancesForTwo
  );
  console.log("upperLeftTriangle:" + upperLeftTriangle);

  const upperRightTriangle = calculateDistancesInSquare(
    131 * 2,
    131 * 3,
    131 * -1,
    0,
    distancesForTwo
  );
  console.log("upperRightTriangle:" + upperRightTriangle);

  const lowerRightTriangle = calculateDistancesInSquare(
    131 * 2,
    131 * 3,
    131,
    131 * 2,
    distancesForTwo
  );
  console.log("lowerRightTriangle:" + lowerRightTriangle);

  const lowerLeftTriangle = calculateDistancesInSquare(
    131 * -2,
    131 * -1,
    131,
    131 * 2,
    distancesForTwo
  );
  console.log("lowerLeftTriangle:" + lowerLeftTriangle);

  const upperLeftBorder = calculateDistancesInSquare(
    131 * -1,
    131 * 0,
    131 * -1,
    0,
    distancesForTwo
  );
  console.log("upperLeftBorder:" + upperLeftBorder);

  const upperRightBorder = calculateDistancesInSquare(
    131 * 1,
    131 * 2,
    131 * -1,
    0,
    distancesForTwo
  );
  console.log("upperRightBorder:" + upperRightBorder);

  const lowerRightBorder = calculateDistancesInSquare(
    131 * 1,
    131 * 2,
    131,
    131 * 2,
    distancesForTwo
  );
  console.log("lowerRightBorder:" + lowerRightBorder);

  const lowerLeftBorder = calculateDistancesInSquare(
    131 * -1,
    131 * 0,
    131,
    131 * 2,
    distancesForTwo
  );
  console.log("lowerLeftBorder:" + lowerLeftBorder);

  const topBorder = calculateDistancesInSquare(
    0,
    131,
    -2 * 131,
    -1 * 131,
    distancesForTwo
  );
  console.log("topBorder:" + topBorder);

  const bottomBorder = calculateDistancesInSquare(
    0,
    131,
    131 * 2,
    131 * 3,
    distancesForTwo
  );
  console.log("bottomBorder:" + bottomBorder);
  const leftBorder = calculateDistancesInSquare(
    131 * -2,
    131 * -1,
    0,
    131,
    distancesForTwo
  );
  console.log("leftBorder:" + leftBorder);
  const rightBorder = calculateDistancesInSquare(
    131 * 2,
    131 * 3,
    0,
    131,
    distancesForTwo
  );
  console.log("rightBorder:" + rightBorder);

  const a = calculateDistancesInSquare(0, 131, 0, 131, distancesForTwo);
  console.log("distances in zero: " + a);
  const b = calculateDistancesInSquare(131, 131 * 2, 0, 131, distancesForTwo);
  console.log("distances in one: " + b);

  const gridsNextOfZeroGrid = (steps - 65) / 131;
  console.log("gridsNextOfZeroGrid: " + gridsNextOfZeroGrid);

  const totalA = a * Math.pow(gridsNextOfZeroGrid - 1, 2);
  const totalB = b * Math.pow(gridsNextOfZeroGrid, 2);
  console.log("Total a grids:" + totalA);
  console.log("Total b grids:" + totalB);

  const edges =
    gridsNextOfZeroGrid *
      (upperLeftTriangle +
        upperRightTriangle +
        lowerLeftTriangle +
        lowerRightTriangle) +
    (gridsNextOfZeroGrid - 1) *
      (lowerLeftBorder +
        lowerRightBorder +
        upperRightBorder +
        upperLeftBorder) +
    topBorder +
    bottomBorder +
    leftBorder +
    rightBorder;

  const total = totalA + totalB + edges;
  console.log("Total: " + total);
}
function calculateDistancesInSquare(
  xFrom: number,
  xTo: number,
  yFrom: number,
  yTo: number,
  distances: Map<string, number>
): number {
  var count = 0;
  for (let x = xFrom; x < xTo; x++) {
    for (let y = yFrom; y < yTo; y++) {
      const coordinate = { x: x, y: y };
      const dist = distances.get(coordinateToKey(coordinate))!!;
      // findin odd ones because input steps is odd number
      if (dist % 2 == 1) {
        count++;
      }
    }
  }
  return count;
}

function getSteps(distances: Map<string, number>, steps: number): number {
  const viableGardenCoordinates = Array.from(distances.entries()).filter(
    (entry) => {
      return entry[1] <= steps && entry[1] % 2 == 0;
    }
  );
  return viableGardenCoordinates.length;
}

function visualizeDistances(
  distances: Map<string, number>,
  graphSize: number,
  gridRepeats: number = 1
) {
  for (
    let x = -1 * graphSize * gridRepeats;
    x < graphSize * (gridRepeats + 1);
    x++
  ) {
    if (x % graphSize == 0) {
      console.log();
    }
    for (
      let y = -1 * graphSize * gridRepeats;
      y < graphSize * (gridRepeats + 1);
      y++
    ) {
      if (y % graphSize == 0) {
        process.stdout.write(" | ");
      }
      const coordinate = { x: x, y: y };
      const distance = distances.get(coordinateToKey(coordinate));
      if (distance !== undefined && distance % 2 == 0) {
        process.stdout.write(String(distance).padStart(3, " "));
        // process.stdout.write(" O");
      } else if (distance !== undefined) {
        process.stdout.write(" . ");
      } else {
        process.stdout.write(" # ");
      }
    }
    console.log();
  }
}

function coordinateToKey(coordinate: Coordinate): string {
  return coordinate.x + "," + coordinate.y;
}

function dijkstra(
  graph: Map<string, number>,
  source: Coordinate,
  steps: number,
  graphSize: number,
  gridsLimit: number | undefined
): Map<string, number> {
  const distances = new Map<string, number>();
  const Q: PriorityQueue = new PriorityQueue();
  distances.set(coordinateToKey(source), 0);
  Q.enqueue(source, 0);

  while (!Q.isEmpty()) {
    const currentCoordinate = Q.dequeue();

    if (!currentCoordinate) {
      break;
    }

    const neigbours = getNeighbours(currentCoordinate, graph, graphSize);
    for (const neigbour of neigbours) {
      const newDistance =
        distances.get(coordinateToKey(currentCoordinate))! + 1;
      const oldDistance = distances.get(coordinateToKey(neigbour));

      // grids limit check is used for part 2, if checking part 1, consider gridsLimit === undefined
      if (
        ((gridsLimit !== undefined &&
          neigbour.x < (gridsLimit + 1) * graphSize &&
          neigbour.x >= -1 * gridsLimit * graphSize &&
          neigbour.y < (gridsLimit + 1) * graphSize &&
          neigbour.y >= -1 * gridsLimit * graphSize &&
          newDistance <= steps) ||
          (gridsLimit === undefined && newDistance <= steps)) &&
        (oldDistance === undefined || newDistance < oldDistance)
      ) {
        distances.set(coordinateToKey(neigbour), newDistance);
        Q.enqueue(neigbour, newDistance);
      }
    }
  }

  return distances;
}

// takes into account negative numbers as well
function properModulo(dividend: number, divisor: number): number {
  return ((dividend % divisor) + divisor) % divisor;
}

// In part two getting neigbours must respect infinite graph :)
function getNeighbours(
  u: Coordinate,
  graph: Map<string, number>,
  graphSize: number
): Coordinate[] {
  var neigbourCandidates = [
    { x: u.x - 1, y: u.y },
    { x: u.x + 1, y: u.y },
    { x: u.x, y: u.y - 1 },
    { x: u.x, y: u.y + 1 },
  ];

  neigbourCandidates = neigbourCandidates.filter((candidate) =>
    isPartOfInfiniteGraph(candidate, graph, graphSize)
  );

  // console.log(neigbourCandidates);
  return neigbourCandidates;
}

function isPartOfInfiniteGraph(
  candidate: Coordinate,
  graph: Map<string, number>,
  graphSize: number
): boolean {
  return graph.has(
    coordinateToKey({
      x: properModulo(candidate.x, graphSize),
      y: properModulo(candidate.y, graphSize),
    })
  );
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

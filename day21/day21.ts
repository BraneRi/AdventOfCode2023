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

  // 65 -> 3594
  // 65 + 131 -> 33494
  // 65 + 131 * 2 -> 92002
  // 65 + 131 * 3 -> 181706
  // 65 + 131 * 4 -> 298722
  // 65 + 131 * 5 -> 448230
  // 65 + 131 * 8 -> 1067098
  // 65 + 131 * 10 -> 1628754
  // 605242619247152 too low
  // 605244113817388 too low
  // 605247072647913
  // 605247072653394 too low
  // 605247072653394
  // 605247072653394
  // 605247072653394
  // 605247104313444 not correct
  // 605247852924594 not correct
  // 605250097454189 too high
  // n = 202300 => toliko ima gridova desno od sredine do ruba

  // PART 1
  // const steps = 65 + 131 * 6;
  // var distances = dijkstra(graph, source!, steps, graphSize, undefined);
  // console.log("total gardens: " + getSteps(distances, steps));
  // // visualizeDistances(distances, graphSize, 6);

  // console.log(
  //   "distances in zero: " +
  //     calculateDistancesInSquare(0, 131, 0, 131, distances)
  // );
  // console.log(
  //   "distances in one: " +
  //     calculateDistancesInSquare(131, 131 * 2, 0, 131, distances)
  // );
  // console.log(
  //   "distances in two: " +
  //     calculateDistancesInSquare(131 * 2, 131 * 3, 0, 131, distances)
  // );
  // console.log(
  //   "distances in tree: " +
  //     calculateDistancesInSquare(131 * 3, 131 * 4, 0, 131, distances)
  // );
  // console.log(
  //   "distances in four: " +
  //     calculateDistancesInSquare(131 * 4, 131 * 5, 0, 131, distances)
  // );
  // console.log(
  //   "distances in five: " +
  //     calculateDistancesInSquare(131 * 5, 131 * 6, 0, 131, distances)
  // );
  // console.log(
  //   "distances in six: " +
  //     calculateDistancesInSquare(131 * 6, 131 * 7, 0, 131, distances)
  // );

  // PART 2
  const distancesForTwo = dijkstra(
    graph,
    source!,
    65 + 131 * 6,
    graphSize,
    undefined
  );

  const upperLeftTriangle = calculateDistancesInSquare(
    131 * -6,
    131 * -5,
    131 * -1,
    0,
    distancesForTwo
  );
  const upperRightTriangle = calculateDistancesInSquare(
    131 * 6,
    131 * 7,
    131 * -1,
    0,
    distancesForTwo
  );
  const lowerRightTriangle = calculateDistancesInSquare(
    131 * 6,
    131 * 7,
    131,
    131 * 2,
    distancesForTwo
  );
  const lowerLeftTriangle = calculateDistancesInSquare(
    131 * -6,
    131 * -5,
    131,
    131 * 2,
    distancesForTwo
  );

  const upperLeftBorder = calculateDistancesInSquare(
    131 * -5,
    131 * -4,
    131 * -1,
    0,
    distancesForTwo
  );
  const upperRightBorder = calculateDistancesInSquare(
    131 * 5,
    131 * 6,
    131 * -1,
    0,
    distancesForTwo
  );
  const lowerRightBorder = calculateDistancesInSquare(
    131 * 5,
    131 * 6,
    131,
    131 * 2,
    distancesForTwo
  );
  const lowerLeftBorder = calculateDistancesInSquare(
    131 * -5,
    131 * -4,
    131,
    131 * 2,
    distancesForTwo
  );

  const topBorder = calculateDistancesInSquare(
    0,
    131,
    -6 * 131,
    -5 * 131,
    distancesForTwo
  );
  const bottomBorder = calculateDistancesInSquare(
    0,
    131,
    131 * 6,
    131 * 7,
    distancesForTwo
  );
  const leftBorder = calculateDistancesInSquare(
    131 * -6,
    131 * -5,
    0,
    131,
    distancesForTwo
  );
  const rightBorder = calculateDistancesInSquare(
    131 * 6,
    131 * 7,
    0,
    131,
    distancesForTwo
  );

  // distances in zero, provided by upper calculation
  const a = 7388;
  // distances in next one, provided by upper calculation -> observation is that these two repeat
  const b = 7401;

  const totalSteps = 26501365;
  const gridsNextOfZeroGrid = (totalSteps - 65) / 131;
  console.log("gridsNextOfZeroGrid: " + gridsNextOfZeroGrid);

  const totalA = a * Math.pow(gridsNextOfZeroGrid - 1, 2);
  const totalB = b * Math.pow(gridsNextOfZeroGrid, 2);

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
      if (dist % 2 == 0) {
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

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
  var yMax = 0;
  for await (const line of rl) {
    line.split("").forEach((c, index) => {
      if (c === "S") {
        source = { x: x, y: index };
        graph.set(coordinateToKey(source), 1);
      }
      if (c === ".") {
        if (index > yMax) yMax = index;
        graph.set(coordinateToKey({ x: x, y: index }), 1);
      }
    });
    x++;
  }
  const xMax = x;
  yMax = yMax + 1;

  const steps = 30;
  const distances = dijkstra(graph, source!, steps, xMax, yMax);

  const viableGardenCoordinates = Array.from(distances.entries()).filter(
    (entry) => {
      return entry[1] <= steps && entry[1] % 2 == 0;
    }
  );
  console.log(viableGardenCoordinates.length);
  visualizeDistances(distances);
}

function visualizeDistances(distances: Map<string, number>) {
  for (let x = -22; x < 33; x++) {
    if (x == 0 || x == 11 || x == -11 || x == 22) {
      console.log();
    }
    for (let y = -22; y < 33; y++) {
      if (y == 0 || y == 11 || y == -11 || y == 22) {
        process.stdout.write(" |");
      }
      const coordinate = { x: x, y: y };
      const distance = distances.get(coordinateToKey(coordinate));
      if (distance !== undefined && distance % 2 == 0) {
        process.stdout.write(String(distance).padStart(2, " "));
      } else if (distance !== undefined) {
        process.stdout.write(" .");
      } else {
        process.stdout.write(" #");
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
  xMax: number,
  yMax: number
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

    const neigbours = getNeighbours(currentCoordinate, graph, xMax, yMax);
    for (const neigbour of neigbours) {
      const newDistance =
        distances.get(coordinateToKey(currentCoordinate))! + 1;
      const oldDistance = distances.get(coordinateToKey(neigbour));

      if (
        newDistance <= steps &&
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
  xMax: number,
  yMax: number
): Coordinate[] {
  var neigbourCandidates = [
    { x: u.x - 1, y: u.y },
    { x: u.x + 1, y: u.y },
    { x: u.x, y: u.y - 1 },
    { x: u.x, y: u.y + 1 },
  ];

  neigbourCandidates = neigbourCandidates.filter((candidate) =>
    // transform to original coordinate
    graph.has(
      coordinateToKey({
        x: properModulo(candidate.x, xMax),
        y: properModulo(candidate.y, yMax),
      })
    )
  );

  // console.log(neigbourCandidates);
  return neigbourCandidates;
}

function isPartOfInfiniteGraph(
  candidate: Coordinate,
  graph: Map<string, number>,
  xMax: number,
  yMax: number
): boolean {
  return graph.has(
    coordinateToKey({
      x: properModulo(candidate.x, xMax),
      y: properModulo(candidate.y, yMax),
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

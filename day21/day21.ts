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
      if (c === "S") source = { x: x, y: index };
      if (c === ".") graph.set(coordinateToKey({ x: x, y: index }), 1);
    });
    x++;
  }

  const distances = dijkstra(graph, source!);
  const steps = 64;

  const viableGardenCoordinates = Array.from(distances.entries()).filter(
    (entry) => {
      return entry[1] <= steps && entry[1] % 2 == 0;
    }
  );
  console.log(viableGardenCoordinates.length);
}

function coordinateToKey(coordinate: Coordinate): string {
  return coordinate.x + "," + coordinate.y;
}

function keyToCoordinate(key: string): Coordinate {
  const keyParts = key.split(",");
  return { x: Number(keyParts[0]), y: Number(keyParts[1]) };
}

function dijkstra(
  graph: Map<string, number>,
  source: Coordinate
): Map<string, number> {
  const distances = new Map<string, number>();
  const Q: PriorityQueue = new PriorityQueue();
  Array.from(graph.keys()).forEach((coordinateKey) => {
    distances.set(coordinateKey, Number.POSITIVE_INFINITY);
  });
  distances.set(coordinateToKey(source), 0);
  Q.enqueue(source, 0);

  while (!Q.isEmpty()) {
    const currentCoordinate = Q.dequeue();

    if (!currentCoordinate) {
      break;
    }

    const neigbours = getNeighbours(currentCoordinate, graph);
    for (const neigbour of neigbours) {
      const newDistance =
        distances.get(coordinateToKey(currentCoordinate))! + 1;
      const oldDistance = distances.get(coordinateToKey(neigbour));

      if (oldDistance === undefined || newDistance < oldDistance) {
        distances.set(coordinateToKey(neigbour), newDistance);
        Q.enqueue(neigbour, newDistance);
      }
    }
  }

  return distances;
}

function getNeighbours(
  u: Coordinate,
  graph: Map<string, number>
): Coordinate[] {
  var neigbourCandidates = [
    { x: u.x - 1, y: u.y },
    { x: u.x + 1, y: u.y },
    { x: u.x, y: u.y - 1 },
    { x: u.x, y: u.y + 1 },
  ];

  neigbourCandidates = neigbourCandidates.filter((candidate) =>
    graph.has(coordinateToKey(candidate))
  );

  return neigbourCandidates;
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

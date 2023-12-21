import * as readline from "readline";
import * as fs from "fs";

type Node = {
  row: number;
  col: number;
  consecutiveLeft: number;
  consecutiveRight: number;
  consecutiveUp: number;
  consecutiveDown: number;
};
type Graph = Map<string, Node[]>;

class PriorityQueue {
  items: { key: Node; priority: number }[];

  constructor() {
    this.items = [];
  }

  enqueue(key: Node, priority: number) {
    this.items.push({ key, priority });
    this.sort();
  }

  dequeue(): Node | undefined {
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

  const input: number[][] = [];
  for await (const line of rl) {
    input.push(line.split("").map((char) => Number(char)));
  }

  const graph = generateGraph(input);

  // console.log(graph);

  const startKey = {
    row: 0,
    col: 0,
    consecutiveLeft: 0,
    consecutiveRight: 0,
    consecutiveUp: 0,
    consecutiveDown: 0,
  };
  console.log(
    dijkstra(graph, startKey, input.length - 1, input[0].length - 1, input)
  );
}

function toNodeFromString(stringKey: string): Node {
  const keyParts = stringKey.split(",");
  return {
    row: Number(keyParts[0]),
    col: Number(keyParts[1]),
    consecutiveLeft: Number(keyParts[2]),
    consecutiveRight: Number(keyParts[3]),
    consecutiveUp: Number(keyParts[4]),
    consecutiveDown: Number(keyParts[5]),
  };
}

function generateGraph(originalGraph: number[][]): Graph {
  const newGraph: Graph = new Map();

  for (let row = 0; row < originalGraph.length; row++) {
    for (let col = 0; col < originalGraph[0].length; col++) {
      var node = {
        row: row,
        col: col,
        consecutiveLeft: 0,
        consecutiveRight: 0,
        consecutiveUp: 0,
        consecutiveDown: 0,
      };
      newGraph.set(toStringKey(node), []);
      for (let i = 1; i <= 3; i++) {
        newGraph.set(
          toStringKey({
            row: row,
            col: col,
            consecutiveLeft: i,
            consecutiveRight: 0,
            consecutiveUp: 0,
            consecutiveDown: 0,
          }),
          []
        );
        newGraph.set(
          toStringKey({
            row: row,
            col: col,
            consecutiveLeft: 0,
            consecutiveRight: i,
            consecutiveUp: 0,
            consecutiveDown: 0,
          }),
          []
        );
        newGraph.set(
          toStringKey({
            row: row,
            col: col,
            consecutiveLeft: 0,
            consecutiveRight: 0,
            consecutiveUp: i,
            consecutiveDown: 0,
          }),
          []
        );
        newGraph.set(
          toStringKey({
            row: row,
            col: col,
            consecutiveLeft: 0,
            consecutiveRight: 0,
            consecutiveUp: 0,
            consecutiveDown: i,
          }),
          []
        );
      }
    }
  }

  // adding neighbours
  for (const [currentNode, _] of Array.from(newGraph.entries())) {
    const {
      row,
      col,
      consecutiveLeft,
      consecutiveRight,
      consecutiveUp,
      consecutiveDown,
    } = toNodeFromString(currentNode);

    const deltas: number[][] = [];

    // If we went right, we cannot go back left
    if (consecutiveRight == 0) {
      var step = 1;
      for (let i = consecutiveLeft + 1; i <= 3; i++) {
        deltas.push([0, -1 * step, i, 0, 0, 0]);
        step++;
      }
    }

    if (consecutiveLeft == 0) {
      var step = 1;
      for (let i = consecutiveRight + 1; i <= 3; i++) {
        deltas.push([0, step, 0, i, 0, 0]);
        step++;
      }
    }

    if (consecutiveDown == 0) {
      var step = 1;
      for (let i = consecutiveUp + 1; i <= 3; i++) {
        deltas.push([-1 * step, 0, 0, 0, i, 0]);
        step++;
      }
    }

    if (consecutiveUp == 0) {
      var step = 1;
      for (let i = consecutiveDown + 1; i <= 3; i++) {
        deltas.push([step, 0, 0, 0, 0, i]);
        step++;
      }
    }

    for (const [deltaRow, deltaCol, left, right, up, down] of deltas) {
      const newRow = row + deltaRow;
      const newCol = col + deltaCol;

      if (
        newRow >= 0 &&
        newRow < originalGraph.length &&
        newCol >= 0 &&
        newCol < originalGraph[0].length
      ) {
        const newNode: Node = {
          row: newRow,
          col: newCol,
          consecutiveLeft: left,
          consecutiveRight: right,
          consecutiveUp: up,
          consecutiveDown: down,
        };
        newGraph.get(currentNode)?.push(newNode);
      }
    }
  }

  return newGraph;
}

function toStringKey(key: Node) {
  return (
    key.row +
    "," +
    key.col +
    "," +
    key.consecutiveLeft +
    "," +
    key.consecutiveRight +
    "," +
    key.consecutiveUp +
    "," +
    key.consecutiveDown
  );
}

function dijkstra(
  graph: Map<string, Node[]>,
  startKey: Node,
  targetRow: number,
  targetColumn: number,
  input: number[][]
): number {
  const distances: Record<string, number> = {};
  const priorityQueue = new PriorityQueue();
  const previousNodes: Record<string, string> = {};

  distances[toStringKey(startKey)] = 0;
  priorityQueue.enqueue(startKey, 0);

  while (!priorityQueue.isEmpty()) {
    const currentNode = priorityQueue.dequeue();

    if (!currentNode) {
      break;
    }

    for (const neighborKey of graph.get(toStringKey(currentNode))!) {
      const distanceToNeighbor =
        distances[toStringKey(currentNode)] +
        calculateDistance(currentNode, neighborKey, input);

      if (
        distances[toStringKey(neighborKey)] == undefined ||
        distanceToNeighbor < distances[toStringKey(neighborKey)]
      ) {
        distances[toStringKey(neighborKey)] = distanceToNeighbor;
        priorityQueue.enqueue(neighborKey, distanceToNeighbor);
        previousNodes[toStringKey(neighborKey)] = toStringKey(currentNode);
      }
    }
  }

  var shortestTarget = Number.MAX_SAFE_INTEGER;

  const shortest = Object.entries(distances)
    .filter(([key, _]) => {
      const node = toNodeFromString(key);
      return node.row == targetRow && node.col == targetColumn;
    })
    .map((targets) => targets[1])
    .reduce((acc, entry) => Math.min(acc, entry), shortestTarget);

  // console.log(previousNodes);
  return shortest || -1; // Return -1 if target is unreachable
}

function calculateDistance(
  source: Node,
  target: Node,
  input: number[][]
): number {
  var distancesBetween = 0;
  if (source.row == target.row) {
    if (source.col < target.col) {
      for (let i = source.col + 1; i <= target.col; i++) {
        distancesBetween += input[source.row][i];
      }
    } else {
      for (let i = source.col - 1; i >= target.col; i--) {
        distancesBetween += input[source.row][i];
      }
    }
  } else {
    if (source.row < target.row) {
      for (let i = source.row + 1; i <= target.row; i++) {
        distancesBetween += input[i][source.col];
      }
    } else {
      for (let i = source.row - 1; i >= target.row; i--) {
        distancesBetween += input[i][source.col];
      }
    }
  }
  return distancesBetween;
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

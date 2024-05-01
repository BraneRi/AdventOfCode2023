import * as readline from "readline";
import * as fs from "fs";

class PriorityQueue {
  items: { key: string; priority: number }[];

  constructor() {
    this.items = [];
  }

  enqueue(key: string, priority: number) {
    this.items.push({ key, priority });
    this.sort();
  }

  dequeue(): string | undefined {
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

  const componentMap = new Map<string, Set<string>>();
  for await (const line of rl) {
    const lineParts = line.split(":");
    const node = lineParts[0].trim();
    const connectedNodes = lineParts[1].trim().split(/\s+/);

    if (componentMap.has(node)) {
      const set = componentMap.get(node);
      connectedNodes.forEach((connection) => {
        set?.add(connection);
        if (componentMap.has(connection)) {
          componentMap.get(connection)?.add(node);
        } else {
          componentMap.set(connection, new Set([node]));
        }
      });
    } else {
      const set = new Set(connectedNodes);
      componentMap.set(node, set);
      connectedNodes.forEach((connection) => {
        if (componentMap.has(connection)) {
          componentMap.get(connection)?.add(node);
        } else {
          componentMap.set(connection, new Set([node]));
        }
      });
    }
  }

  countConnections(componentMap);
  console.log(connectionCounter);

  // console.log(extractTop3MaxValues(connectionCounter));
  console.log(extractTop3MaxValues(connectionCounter));
  // hfx/pzl, bvb/cmg, nvd/jqt
}

function extractTop3MaxValues(
  connectionCounter: Map<string, number>
): [string, number][] {
  const entries = Array.from(connectionCounter.entries());
  entries.sort((a, b) => b[1] - a[1]);
  console.log(entries.length);
  // const top3 = entries.slice(0, 3);
  return entries;
}

// key are two nodes and value is number of times we have to make that connnection
// from any two nodes to reach each other - idea is to remove most "crowded" ones
const connectionCounter = new Map<string, number>();

// ignores order of keys
function nodesToKey(node1: string, node2: string) {
  const keyCandidate1 = node1 + "," + node2;
  if (connectionCounter.has(keyCandidate1)) return keyCandidate1;
  const keyCandidate2 = node2 + "," + node1;
  if (connectionCounter.has(keyCandidate2)) return keyCandidate2;
  else return keyCandidate1;
}

function updateConnectionCounter(node1: string, node2: string) {
  const key = nodesToKey(node1, node2);
  const counter = connectionCounter.get(key);
  if (counter) {
    connectionCounter.set(key, counter + 1);
  } else {
    connectionCounter.set(key, 1);
  }
}

function countConnections(componentMap: Map<string, Set<string>>) {
  const keys = Array.from(componentMap.keys());
  for (let i = 0; i < keys.length - 1; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      findConnections(keys[i], keys[j], componentMap);
    }
  }
}

function findConnections(
  startNode: string,
  targetNode: string,
  componentMap: Map<string, Set<string>>
) {
  const visited = new Set<string>();
  const parentMap = new Map<string, string>();
  const queue: string[] = [startNode];

  while (queue.length > 0) {
    const currentNode = queue.shift()!;

    if (currentNode === targetNode) {
      return constructPath(parentMap, startNode, targetNode);
    }

    if (!visited.has(currentNode)) {
      visited.add(currentNode);
      const connections = componentMap.get(currentNode);
      if (connections) {
        connections.forEach((connection) => {
          if (!visited.has(connection)) {
            parentMap.set(connection, currentNode);
            queue.push(connection);
          }
        });
      }
    }
  }
}

function constructPath(
  parentMap: Map<string, string>,
  startNode: string,
  targetNode: string
) {
  const path: string[] = [];
  let currentNode: string | undefined = targetNode;

  while (currentNode && currentNode != startNode) {
    path.unshift(currentNode);
    let parent = parentMap.get(currentNode);
    if (parent) {
      updateConnectionCounter(currentNode, parent);
    }
    currentNode = parent;
  }
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

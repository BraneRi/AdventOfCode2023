import * as readline from "readline";
import * as fs from "fs";

const FOREST = "#";
const WALK = ".";

type Path = {
  row: number;
  column: number;
};

function pathToKey(p: Path): string {
  return p.row + "," + p.column;
}

function keyToPath(p: string): Path {
  const elements = p.split(",");
  return {
    row: Number.parseInt(elements[0]),
    column: Number.parseInt(elements[1]),
  };
}

async function processFile(filePath: string): Promise<void> {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read lines from the stream
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treats each line as a separate data event
  });

  const island: Map<string, string> = new Map();

  var row = 0;
  var startingColumn: number;
  for await (const line of rl) {
    let lineElements = line.split("");
    lineElements.forEach((pathType, index) => {
      if (row == 0 && pathType == WALK) startingColumn = index;
      island.set(pathToKey({ row: row, column: index }), pathType);
    });
    row++;
  }

  const finish = keyToPath(
    Array.from(island.entries()).find(
      (e) => keyToPath(e[0]).row == row - 1 && e[1] != FOREST
    )?.[0]!
  );
  const nodes = generateNodes(
    { row: 0, column: startingColumn! },
    finish,
    island
  );

  const connections = generateConnections(nodes, island);
  console.log(connections);
}

type Node = {
  path: Path;
  id: number;
};

type Connection = {
  steps: number;
  id1: number;
  id2: number;
};

function generateConnections(
  nodes: Node[],
  island: Map<string, string>
): Connection[] {
  const connections: Connection[] = [];
  const visited: Map<string, boolean> = new Map();
  console.log(nodes);
  nodes.forEach((node) => {
    visited.set(pathToKey(node.path), true);
    var options = getOptions(node.path, island, visited);
    options.forEach((option) => {
      const connection = findNode(
        node.id,
        option,
        nodes.filter((n) => n != node),
        island,
        visited
      );
      if (connection) {
        connections.push(connection);
      }
    });
  });

  return connections;
}

function getOptions(
  path: Path,
  island: Map<string, string>,
  visited: Map<string, boolean>
): Path[] {
  const options: Path[] = [];
  for (let steps of [
    { rowStep: 1, columnStep: 0 },
    { rowStep: 0, columnStep: 1 },
    { rowStep: -1, columnStep: 0 },
    { rowStep: 0, columnStep: -1 },
  ]) {
    const optionPath = {
      row: path.row + steps.rowStep,
      column: path.column + steps.columnStep,
    };
    const optionPathType = island.get(pathToKey(optionPath));
    if (
      optionPathType &&
      optionPathType != FOREST &&
      !visited.has(pathToKey(optionPath))
    ) {
      options.push(optionPath);
    }
  }
  return options;
}

function findNode(
  id1: number,
  optionPath: Path,
  nodes: Node[],
  island: Map<string, string>,
  visited: Map<string, boolean>
): Connection | undefined {
  var currentPath: Path = optionPath;
  var steps: number = 0;

  visited.set(pathToKey(currentPath), true);
  var nodeCandidate: Node | undefined = undefined;
  while (!nodeCandidate) {
    nodeCandidate = reachedNode(currentPath, nodes);
    if (nodeCandidate) break;
    steps += 1;

    let newCurrent = getOptions(currentPath, island, visited)[0];
    if (!newCurrent) {
      // we ignore visited paths if reached node
      // we need to know which node is it
      const nodeOptions = getOptions(currentPath, island, new Map());
      nodeCandidate = nodeOptions
        .map((n) => reachedNode(n, nodes))
        .filter((n) => n != undefined)[0];
      break;
    }
    currentPath = newCurrent;
    visited.set(pathToKey(currentPath), true);
  }

  if (!nodeCandidate) return undefined;

  return { steps: steps, id1: id1, id2: nodeCandidate.id };
}

function reachedNode(path: Path, nodes: Node[]): Node | undefined {
  return nodes.find(
    (node) => node.path.row == path.row && node.path.column == path.column
  );
}

function generateNodes(
  start: Path,
  finish: Path,
  island: Map<string, string>
): Node[] {
  // add start and finish
  const nodes: Node[] = [
    { path: start, id: 0 },
    { path: finish, id: 1 },
  ];
  var nodeIdCounter = 1;
  Array.from(island.entries()).forEach((e) => {
    if (e[1] != FOREST) {
      var path = keyToPath(e[0]);
      var optionCount = 0;
      for (let steps of [
        { rowStep: 1, columnStep: 0 },
        { rowStep: 0, columnStep: 1 },
        { rowStep: -1, columnStep: 0 },
        { rowStep: 0, columnStep: -1 },
      ]) {
        const optionCandidate = island.get(
          pathToKey({
            row: path.row + steps.rowStep,
            column: path.column + steps.columnStep,
          })
        );
        if (optionCandidate && optionCandidate != FOREST) {
          optionCount++;
        }
      }

      if (optionCount > 2) {
        nodeIdCounter += 1;
        nodes.push({ path: path, id: nodeIdCounter });
      }
    }
  });

  return nodes;
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

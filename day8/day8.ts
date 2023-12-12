import * as readline from "readline";
import * as fs from "fs";

interface Node {
  start: string;
  left: string;
  right: string;
}

async function processFile(filePath: string): Promise<void> {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read lines from the stream
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treats each line as a separate data event
  });

  const nodeRegex = /^(\w+) = \((\w+), (\w+)\)$/;
  const nodes: Map<string, Node> = new Map();
  var moves: string[] = [];
  const startingNodes: Map<string, number> = new Map();

  for await (const line of rl) {
    const match = line.match(nodeRegex);
    if (match) {
      const start = match[1];
      const left = match[2];
      const right = match[3];

      nodes.set(start, { start: start, left: left, right: right });

      if (start.endsWith("A")) {
        startingNodes.set(start, 0);
      }
    } else if (line.includes("L") || line.includes("R")) {
      moves = line.trim().split("");
    }
  }

  const startingNodesArray = Array.from(startingNodes.entries());
  var currentStep: number;

  var steps: number[] = [];
  for (let i = 0; i < startingNodesArray.length; i++) {
    const startNode = startingNodesArray[i];
    currentStep = getNextAligned(
      nodes.get(startNode[0])!,
      nodes,
      moves,
      startNode[1]
    );

    steps.push(currentStep);
  }
  console.log(findLowestCommonDenominator(steps));
}

function findLowestCommonDenominator(numbers) {
  // Function to find the least common multiple (LCM) of two numbers
  const lcm = (a, b) => (a * b) / gcd(a, b);

  // Function to find the greatest common divisor (GCD) of two numbers
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

  // Function to find the LCM of an array of numbers
  const lcmOfArray = (arr) => arr.reduce((acc, num) => lcm(acc, num), 1);

  return lcmOfArray(numbers);
}

function getNextAligned(
  currentNode: Node,
  nodes: Map<string, Node>,
  moves: string[],
  steps: number
): number {
  var nextMove = 0;

  while (currentNode && !currentNode.start.endsWith("Z")) {
    if (moves[nextMove] == "R") {
      currentNode = nodes.get(currentNode.right)!;
    } else if (moves[nextMove] == "L") {
      currentNode = nodes.get(currentNode.left)!;
    }

    nextMove = (nextMove + 1) % moves.length;
    steps++;
  }
  return steps;
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

import * as readline from "readline";
import * as fs from "fs";

type Connection = {
  one: string;
  two: string;
};

async function processFile(filePath: string): Promise<void> {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read lines from the stream
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treats each line as a separate data event
  });

  const connections = new Set<Connection>();
  const keys = new Set<string>();
  for await (const line of rl) {
    const lineParts = line.split(":");
    const key = lineParts[0].trim();
    const connectedNodes = lineParts[1].trim().split(/\s+/);

    connectedNodes.forEach((connectedNode) => {
      keys.add(key);
      keys.add(connectedNode);
      connections.add({ one: key, two: connectedNode });
    });
  }

  // hfx/pzl, bvb/cmg, nvd/jqt
  findRemovals(keys, connections);
}

function filterConnections(
  connections: Set<Connection>,
  ...elementsToRemove: Connection[]
): Set<Connection> {
  const filteredConnections = new Set(connections); // Create a copy of the original set

  elementsToRemove.forEach((element) => {
    filteredConnections.delete(element);
  });

  return filteredConnections;
}

function findRemovals(keys: Set<string>, connections: Set<Connection>) {
  let connectionArray = Array.from(connections);
  for (let i = 0; i < connectionArray.length - 2; i++) {
    const nodes = new Set<string>([
      connectionArray[i].one,
      connectionArray[i].two,
    ]);
    for (let j = i + 1; j < connectionArray.length - 1; j++) {
      nodes.add(connectionArray[j].one);
      nodes.add(connectionArray[j].two);
      if (nodes.size < 4) {
        // Iterate only if all six nodes are different -> nodes.size == 4
        continue;
      }
      for (let k = j + 1; k < connectionArray.length; k++) {
        nodes.add(connectionArray[k].one);
        nodes.add(connectionArray[k].two);
        if (nodes.size < 6) {
          // Iterate only if all six nodes are different -> nodes.size == 6
          continue;
        }
        let c1 = connectionArray[i];
        let c2 = connectionArray[j];
        let c3 = connectionArray[k];
        // console.log("Removing: ", c1, c2, c3);
        if (areTwoGroups(keys, filterConnections(connections, c1, c2, c3))) {
          return [c1, c2, c3];
        }
      }
    }
  }
}

function areTwoGroups(
  keys: Set<string>,
  connections: Set<Connection>
): boolean {
  // console.log("Initial connections:", connections);
  var current = Array.from(keys)[0];
  var passingKeys = [current];
  let foundKeys = new Set<string>([current]);
  while (passingKeys.length > 0) {
    current = passingKeys.shift()!;
    // console.log("Finding all connections of:", current);
    const { newFoundKeys, newConnections } = getAllConnectionsForKey(
      current,
      connections
    );

    // console.log(newConnections);

    newFoundKeys.forEach((k) => {
      if (!foundKeys.has(k)) {
        passingKeys.push(k);
      }
      foundKeys.add(k);
    });
    connections = newConnections;
  }

  if (foundKeys.size < keys.size) {
    console.log("Found two groups!");
    console.log("Group 1:", Array.from(foundKeys).sort(), foundKeys.size);
    let remainingKeys = new Set();
    keys.forEach((k) => {
      if (!foundKeys.has(k)) {
        remainingKeys.add(k);
      }
    });
    console.log(
      "Group 2:",
      Array.from(remainingKeys).sort(),
      remainingKeys.size
    );
    console.log("Group 1 x Group 2:", foundKeys.size * remainingKeys.size);
  } else {
    // console.log("Still one group after removal");
  }
  return foundKeys.size < keys.size;
}

function getAllConnectionsForKey(key: string, connections: Set<Connection>) {
  const newConnections = new Set(connections);
  const newFoundKeys = new Set<string>();
  connections.forEach((c) => {
    if (c.one == key) {
      newFoundKeys.add(c.two);
      newConnections.delete(c);
    } else if (c.two == key) {
      newFoundKeys.add(c.one);
      newConnections.delete(c);
    }
  });

  return { newFoundKeys, newConnections };
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

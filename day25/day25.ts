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
      const sortedKeys = [key, connectedNode].sort();
      connections.add({ one: sortedKeys[0], two: sortedKeys[1] });
    });
  }

  // hfx/pzl, bvb/cmg, nvd/jqt
  // findRemovals(keys, connections);

  const graph = getConnectionGraph(connections);
  const connCount = new Map<string, number>();

  for (let key of Array.from(keys)) {
    const paths = dijkstra(key, graph);
    for (let [key, keyPaths] of Array.from(paths.entries())) {
      const pathValues = Array.from(keyPaths);
      for (let i = 0; i < pathValues.length - 1; i++) {
        const one = pathValues[i];
        const two = pathValues[i + 1];

        const countKey = getConnKey(one, two);
        const count = connCount.get(countKey);
        if (count) {
          connCount.set(countKey, count + 1);
        } else {
          connCount.set(countKey, 1);
        }
      }
    }
  }

  const keysToRemove = getTopThree(connCount);
  const c1Parts = keysToRemove[0][0].toString().split(",");
  const c1 = { one: c1Parts[0], two: c1Parts[1] };

  const c2Parts = keysToRemove[1][0].toString().split(",");
  const c2 = { one: c2Parts[0], two: c2Parts[1] };

  const c3Parts = keysToRemove[2][0].toString().split(",");
  const c3 = { one: c3Parts[0], two: c3Parts[1] };

  console.log(c1, c2, c3);
  areTwoGroups(keys, filterConnections(connections, c1, c2, c3));
}

function getTopThree(connCount: Map<string, number>) {
  const sortedEntries = Array.from(connCount.entries()).sort(
    (a, b) => b[1] - a[1]
  );
  const topThree = sortedEntries.slice(0, 3);
  return topThree;
}

function dijkstra(
  key: string,
  graph: Map<string, Set<string>>
): Map<string, string[]> {
  const paths = new Map<string, string[][]>();
  const visited = new Set<string>();
  const queue: [string, string[]][] = [];

  queue.push([key, [key]]);

  while (queue.length > 0) {
    const [currentNode, currentPath] = queue.shift()!;

    visited.add(currentNode);

    for (const neighbor of Array.from(graph.get(currentNode)!)) {
      const newPath = [...currentPath, neighbor];

      if (neighbor == key || currentPath.includes(neighbor)) continue;

      if (!paths.has(neighbor)) {
        paths.set(neighbor, [newPath]);
      } else {
        paths.get(neighbor)!.push(newPath);
      }

      if (!visited.has(neighbor)) {
        queue.push([neighbor, newPath]);
      }
    }
  }

  const shortestPaths = new Map<string, string[]>();
  for (let [key, path] of Array.from(paths)) {
    shortestPaths.set(key, path[0]);
  }
  return shortestPaths;
}

function getConnectionGraph(
  connections: Set<Connection>
): Map<string, Set<string>> {
  const graph = new Map<string, Set<string>>();
  for (const connection of Array.from(connections)) {
    if (!graph.has(connection.one)) {
      graph.set(connection.one, new Set());
    }
    if (!graph.has(connection.two)) {
      graph.set(connection.two, new Set());
    }
    graph.get(connection.one)!.add(connection.two);
    graph.get(connection.two)!.add(connection.one);
  }
  return graph;
}

function filterConnections(
  connections: Set<Connection>,
  ...elementsToRemove: Connection[]
): Set<Connection> {
  const filteredConnections = new Set(connections); // Create a copy of the original set

  Array.from(filteredConnections).forEach((c) => {
    Array.from(elementsToRemove).forEach((e) => {
      if (c.one == e.one && c.two == e.two) {
        filteredConnections.delete(c);
      }
    });
  });

  return filteredConnections;
}

function getConnKey(key1: string, key2: string): string {
  const sortedKeys = [key1, key2].sort();
  return sortedKeys.join(",");
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

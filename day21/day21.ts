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

  const steps = 500;
  // 605247072653394 too low

  // PART 1
  const distances = dijkstra(graph, source!, steps, graphSize, undefined);

  const viableGardenCoordinates = Array.from(distances.entries()).filter(
    (entry) => {
      return entry[1] <= steps && entry[1] % 2 == 0;
    }
  );
  console.log(viableGardenCoordinates.length);
  // visualizeDistances(distances, graphSize, 5);

  // PART 2
  // console.log(predictViableGardens(graph, source!, steps, graphSize));
}

function predictViableGardens(
  graph: Map<string, number>,
  source: Coordinate,
  steps: number,
  graphSize: number
): number {
  // Graph needs 3 adjacent graph paths, until numbers start to repeat with graph size difference
  var distancesFor4Graphs = dijkstra(graph, source!, steps, graphSize, 4);
  const stableDiff =
    distancesFor4Graphs.get(coordinateToKey({ x: 0, y: 4 * graphSize }))! -
    distancesFor4Graphs.get(coordinateToKey({ x: 0, y: 3 * graphSize }))!;
  console.log("STABLE DIFF: " + stableDiff);

  // 1. Calculate gardens in zero graph
  var zeroGardens = 0;
  for (let x = 0; x < graphSize; x++) {
    for (let y = 0; y < graphSize; y++) {
      const distance = distancesFor4Graphs.get(coordinateToKey({ x: x, y: y }));
      if (distance !== undefined && distance % 2 == 0) {
        zeroGardens++;
      }
    }
  }
  console.log(zeroGardens);

  // 2. Calculate gardens in adjacent graphs
  var adjacentGardens = 0;
  for (let x = graphSize; x < 2 * graphSize; x++) {
    for (let y = 0; y < graphSize; y++) {
      const distance = distancesFor4Graphs.get(coordinateToKey({ x: x, y: y }));
      if (distance !== undefined && distance % 2 == 0) {
        adjacentGardens++;
      }
    }
  }
  console.log(adjacentGardens);
  // for full grids, number of gardens will be ((FULL_GRIDS_NUM - 1) / 2) * adjacent_gardens + ((FULL_GRIDS_NUM - 1) / 2 + 1) * zero_gardens
  //
  // For top, left, bottom and right 3rd grid ->
  // 1. calculate max and min paths
  // 2. max + graph_size (x or y) * k <= steps -> k represents number of graphs after second one, that will have full grids => FULL_GRIDS_NUM = 3 + k
  // 3. min + graph_size (x or y) * l <= steps -> l represents number of graphs after second one, that will have both full and partial grids => k - l = partial graphs for this side
  //
  // Partial graphs repeat diagonally, but not taking into account one on main axis.
  // For each partial graph, calculate paths for one above and beyond and multiply them by number of their diagonal instances

  // RIGHT EDGE + full and partial graphs calculation
  var min = Number.POSITIVE_INFINITY;
  var max = Number.NEGATIVE_INFINITY;
  for (let x = 0; x < graphSize; x++) {
    for (let y = 3 * graphSize; y < 4 * graphSize; y++) {
      const coordinate = { x: x, y: y };
      const distance = distancesFor4Graphs.get(coordinateToKey(coordinate));
      if (distance && distance > max && distance % 2 == 0) max = distance;
      if (distance && distance < min && distance % 2 == 0) min = distance;
    }
  }

  // from 1 to k, same applies in other directions
  const fullGrids1Dimension = 3 + Math.floor((steps - max) / stableDiff) - 1;
  const fullAndPartialGrids1Dimension =
    3 + Math.floor((steps - min) / stableDiff) + 1; // +1 to cover cases where min is not in the line with zero graph;
  const partialGraphs1Dimenesion =
    fullAndPartialGrids1Dimension - fullGrids1Dimension;
  console.log("Full:" + fullGrids1Dimension);
  console.log(fullAndPartialGrids1Dimension);
  console.log("Partial:" + partialGraphs1Dimenesion);

  var partialDiagonalsSum = 0;
  var partialGridMainAxisSum = 0;
  for (let i = fullGrids1Dimension; i <= fullAndPartialGrids1Dimension; i++) {
    console.log("------ grid = " + i + " ------");

    console.log("Main axis partials");
    // RIGHT EDGE
    var gardens = 0;
    for (let x = 0; x < graphSize; x++) {
      for (let y = 3 * graphSize; y < 4 * graphSize; y++) {
        const distance3 = distancesFor4Graphs.get(
          coordinateToKey({ x: x, y: y })
        );
        if (
          distance3 !== undefined &&
          ((i % 2 == 0 && distance3 % 2 != 0) ||
            (i % 2 != 0 && distance3 % 2 == 0)) &&
          distance3 + stableDiff * (i - 3) <= steps
        ) {
          gardens++;
        }
      }
    }
    partialGridMainAxisSum += gardens;
    console.log("R:" + gardens);

    // LEFT EDGE
    var gardens = 0;
    for (let x = 0; x < graphSize; x++) {
      for (let y = -3 * graphSize; y < -2 * graphSize; y++) {
        const distance3 = distancesFor4Graphs.get(
          coordinateToKey({ x: x, y: y })
        );
        if (
          distance3 !== undefined &&
          ((i % 2 == 0 && distance3 % 2 != 0) ||
            (i % 2 != 0 && distance3 % 2 == 0)) &&
          distance3 + stableDiff * (i - 3) <= steps
        ) {
          gardens++;
        }
      }
    }
    partialGridMainAxisSum += gardens;
    console.log("L:" + gardens);

    // UP EDGE
    var gardens = 0;
    for (let x = -3 * graphSize; x < -2 * graphSize; x++) {
      for (let y = 0; y < graphSize; y++) {
        const distance3 = distancesFor4Graphs.get(
          coordinateToKey({ x: x, y: y })
        );
        if (
          distance3 !== undefined &&
          ((i % 2 == 0 && distance3 % 2 != 0) ||
            (i % 2 != 0 && distance3 % 2 == 0)) &&
          distance3 + stableDiff * (i - 3) <= steps
        ) {
          gardens++;
        }
      }
    }
    partialGridMainAxisSum += gardens;
    console.log("U:" + gardens);

    // DOWN EDGE
    var gardens = 0;
    for (let x = 3 * graphSize; x < 4 * graphSize; x++) {
      for (let y = 0; y < graphSize; y++) {
        const distance3 = distancesFor4Graphs.get(
          coordinateToKey({ x: x, y: y })
        );
        if (
          distance3 !== undefined &&
          ((i % 2 == 0 && distance3 % 2 != 0) ||
            (i % 2 != 0 && distance3 % 2 == 0)) &&
          distance3 + stableDiff * (i - 3) <= steps
        ) {
          gardens++;
        }
      }
    }
    partialGridMainAxisSum += gardens;
    console.log("D:" + gardens);

    console.log("Diagonal partials");

    // RIGHT UP
    var gardens = 0;
    for (let x = -1 * graphSize; x < 0; x++) {
      for (let y = 3 * graphSize; y < 4 * graphSize; y++) {
        const distance3 = distancesFor4Graphs.get(
          coordinateToKey({ x: x, y: y })
        );
        if (
          distance3 !== undefined &&
          ((i % 2 == 0 && distance3 % 2 != 0) ||
            (i % 2 != 0 && distance3 % 2 == 0)) &&
          distance3 + stableDiff * (i - 3) <= steps
        ) {
          gardens++;
        }
      }
    }
    // multiply diagonals
    gardens = i * gardens;
    partialDiagonalsSum += gardens;
    console.log("R up:" + gardens);

    // RIGHT DOWN
    var gardens = 0;
    for (let x = graphSize; x < 2 * graphSize; x++) {
      for (let y = 3 * graphSize; y < 4 * graphSize; y++) {
        const distance3 = distancesFor4Graphs.get(
          coordinateToKey({ x: x, y: y })
        );
        if (
          distance3 !== undefined &&
          ((i % 2 == 0 && distance3 % 2 != 0) ||
            (i % 2 != 0 && distance3 % 2 == 0)) &&
          distance3 + stableDiff * (i - 3) <= steps
        ) {
          gardens++;
        }
      }
    }
    // multiply diagonals
    gardens = i * gardens;
    partialDiagonalsSum += gardens;
    console.log("R down:" + gardens);

    // LEFT UP
    var gardens = 0;
    for (let x = -1 * graphSize; x < 0; x++) {
      for (let y = -3 * graphSize; y < -2 * graphSize; y++) {
        const distance3 = distancesFor4Graphs.get(
          coordinateToKey({ x: x, y: y })
        );
        if (
          distance3 !== undefined &&
          ((i % 2 == 0 && distance3 % 2 != 0) ||
            (i % 2 != 0 && distance3 % 2 == 0)) &&
          distance3 + stableDiff * (i - 3) <= steps
        ) {
          gardens++;
        }
      }
    }
    // multiply diagonals
    gardens = i * gardens;
    partialDiagonalsSum += gardens;
    console.log("L up:" + gardens);

    // LEFT DOWN
    var gardens = 0;
    for (let x = graphSize; x < 2 * graphSize; x++) {
      for (let y = -3 * graphSize; y < -2 * graphSize; y++) {
        const distance3 = distancesFor4Graphs.get(
          coordinateToKey({ x: x, y: y })
        );
        if (
          distance3 !== undefined &&
          ((i % 2 == 0 && distance3 % 2 != 0) ||
            (i % 2 != 0 && distance3 % 2 == 0)) &&
          distance3 + stableDiff * (i - 3) <= steps
        ) {
          gardens++;
        }
      }
    }
    // multiply diagonals
    gardens = i * gardens;
    partialDiagonalsSum += gardens;
    console.log("L down:" + gardens);
  }

  // Finally SOLUTION = FULL_GRID_GARDENS + diagonal_partial_grid_gardens_sum + partial_grid_gardens_sum
  var fullGridGardensSum = 0;
  var lineFactor = 3;
  for (let fulls = 1; fulls < fullGrids1Dimension; fulls++) {
    fullGridGardensSum += lineFactor;
    lineFactor += 2;
  }
  fullGridGardensSum = fullGridGardensSum * 2 + (lineFactor - 2);
  console.log("Number of full grids:" + fullGridGardensSum);
  const zeroAdjacentDiff = (fullGrids1Dimension - 1) * 2 - 1;
  console.log("zeroAdjacentDiff:" + zeroAdjacentDiff);
  const fewerFullGrids = (fullGridGardensSum - zeroAdjacentDiff) / 2;
  const moreFullGrids = fewerFullGrids + zeroAdjacentDiff;
  console.log("More full grids:" + moreFullGrids);
  console.log("Fewer full grids:" + fewerFullGrids);
  var fullGridGardens: number;
  if (fullGrids1Dimension % 2 == 0) {
    // more zero type fullgrids
    fullGridGardens =
      fewerFullGrids * adjacentGardens + moreFullGrids * zeroGardens;
  } else {
    // more adjacent type full grids
    fullGridGardens =
      moreFullGrids * adjacentGardens + fewerFullGrids * zeroGardens;
  }

  console.log("------");
  console.log(fullGridGardens);
  console.log(partialDiagonalsSum);
  console.log(partialGridMainAxisSum);

  return fullGridGardens + partialDiagonalsSum + partialGridMainAxisSum;
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
        process.stdout.write(" |");
      }
      const coordinate = { x: x, y: y };
      const distance = distances.get(coordinateToKey(coordinate));
      if (distance !== undefined && distance % 2 == 0) {
        process.stdout.write(String(distance).padStart(2, " "));
        // process.stdout.write(" O");
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

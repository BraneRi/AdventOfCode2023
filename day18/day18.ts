import * as readline from "readline";
import * as fs from "fs";

// I am following "fence" around trench as itself takes 1m3
type TrenchVertex = {
  x: number;
  y: number;
  neighbourLeft: boolean;
  neighbourRight: boolean;
  neighbourTop: boolean;
  neighbourBottom: boolean;
};

async function processFile(filePath: string): Promise<void> {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read lines from the stream
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treats each line as a separate data event
  });

  var currentVertex = {
    x: 0,
    y: 0
  };
  var vertices: TrenchVertex[] = [currentVertex];
  for await (const line of rl) {
    const digData = line.split(" ");
    const direction = digData[0];
    const meters = Number(digData[1]);
    // const color = digData[2]

    switch (direction) {
      case "L": {
        currentVertex = {
          x: currentVertex.x - meters,
          y: currentVertex.y
        };
        break;
      }
      case "R": {
        currentVertex = {
          x: currentVertex.x + meters,
          y: currentVertex.y
        };
        break;
      }
      case "D": {
        currentVertex = {
          x: currentVertex.x,
          y: currentVertex.y - meters
        };
        break;
      }
      case "U": {
        currentVertex = {
          x: currentVertex.x,
          y: currentVertex.y + meters
        };
        break;
      }
    }

    vertices.push(currentVertex);
  }

  console.log(vertices);
  console.log(calculateArea(vertices.slice().reverse()));
}

function calculateArea(vertices: TrenchVertex[]): number {
  var sum = 0;
  for (let i = 0; i < vertices.length - 1; i++) {
    sum +=
      vertices[i].x * vertices[i + 1].y - vertices[i].y * vertices[i + 1].x;
  }

  return sum / 2;
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

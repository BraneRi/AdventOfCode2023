import * as readline from "readline";
import * as fs from "fs";

// I am following "fence" around trench as itself takes 1m3
type TrenchVertex = {
  x: number;
  y: number;
  // direction where it came from, so we can differentiate
  // what is inside from outside polygon
  from: string;
  to: string;
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
    y: 0,
    from: "",
    to: "",
  };
  var vertices: TrenchVertex[] = [currentVertex];
  for await (const line of rl) {
    const digData = line.split(" ");
    const hex = digData[2];
    const directionCode = Number(hex[hex.length - 2]);
    var direction: string;
    if (directionCode == 0) {
      direction = "R";
    } else if (directionCode == 1) {
      direction = "D";
    } else if (directionCode == 2) {
      direction = "L";
    } else {
      direction = "U";
    }
    const meters = parseInt(hex.slice(2, 7), 16);

    var newVertex: TrenchVertex;
    switch (direction) {
      case "R": {
        currentVertex.to = "R";
        newVertex = {
          x: currentVertex.x + meters,
          y: currentVertex.y,
          from: "L",
          to: "",
        };
        break;
      }
      case "L": {
        currentVertex.to = "L";
        newVertex = {
          x: currentVertex.x - meters,
          y: currentVertex.y,
          from: "R",
          to: "",
        };
        break;
      }
      case "D": {
        currentVertex.to = "D";
        newVertex = {
          x: currentVertex.x,
          y: currentVertex.y - meters,
          from: "U",
          to: "",
        };
        break;
      }
      case "U": {
        currentVertex.to = "U";
        newVertex = {
          x: currentVertex.x,
          y: currentVertex.y + meters,
          from: "D",
          to: "",
        };
        break;
      }
      default: {
        throw Error("invalid input");
      }
    }

    vertices.push(newVertex);
    currentVertex = newVertex;
  }

  // last == first, so we have to fix "from" & "to"
  const first = vertices[0];
  const last = vertices[vertices.length - 1];

  first.from = last.from;
  last.to = first.to;

  vertices = vertices.map((vertex) => {
    if (vertex.from == "L" && vertex.to == "D") {
      vertex.x += 0.5;
      vertex.y += 0.5;
    } else if (vertex.from == "D" && vertex.to == "L") {
      vertex.x -= 0.5;
      vertex.y -= 0.5;
    } else if (vertex.from == "U" && vertex.to == "L") {
      vertex.x += 0.5;
      vertex.y -= 0.5;
    } else if (vertex.from == "L" && vertex.to == "U") {
      vertex.x -= 0.5;
      vertex.y += 0.5;
    } else if (vertex.from == "R" && vertex.to == "D") {
      vertex.x += 0.5;
      vertex.y -= 0.5;
    } else if (vertex.from == "D" && vertex.to == "R") {
      vertex.x -= 0.5;
      vertex.y += 0.5;
    } else if (vertex.from == "U" && vertex.to == "R") {
      vertex.x += 0.5;
      vertex.y += 0.5;
    } else if (vertex.from == "R" && vertex.to == "U") {
      vertex.x -= 0.5;
      vertex.y -= 0.5;
    }

    return vertex;
  });

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

import * as readline from "readline";
import * as fs from "fs";

async function processFile(filePath: string): Promise<void> {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read lines from the stream
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treats each line as a separate data event
  });

  var sum = 0;
  for await (const line of rl) {
    const lineParts = line.split(" ");
    sum += calculateLineArrangements(
      lineParts[0],
      lineParts[1].split(",").map((element) => Number(element))
    );
    break;
  }

  console.log(sum);
}

interface IslandBucket {
  island: string;
  groups: number[];
}

function calculateLineArrangements(
  springs: string,
  groupSizes: number[]
): number {
  
  const springsWithMergedDots = mergeConsecutiveDots(springs)
  const islands: IslandBucket[] = springsWithMergedDots.split(".").map(island => {
    return {island: island, groups: []}
  })

  // process.stdout.write(islands.toString())
  // process.stdout.write("  ")
  // process.stdout.write(groupSizes.toString())
  // console.log()


  var currentGroupIndex = 0
  var islandBucket: IslandBucket
  for (let i = 0; i < islands.length; i++) {
    islandBucket = islands[i]
    for (let j = currentGroupIndex; j < groupSizes.length; j++) {
        if (canTake(islandBucket, groupSizes[j])) {
          // on next island continue from next untaken group
          currentGroupIndex = j+1
          break;
        } 
      }
    };

  console.log(islands)
  var count = 0;
  return count;
}

function canTake(islandBucket: IslandBucket, newGroupSize: number): boolean {
  var tempIsland = islandBucket.island
  if (newGroupSize > tempIsland.length) return false
  if (!tempIsland.includes("#")) {
    const newPrefix = "#".repeat(newGroupSize)
    if (tempIsland.length > newGroupSize) {
      islandBucket.island = newPrefix + "." + tempIsland.slice(newGroupSize)
    } else {
      islandBucket.island = newPrefix
    }
    return true
  }

  // If island already parsed input, begin after last subisland
  const lastDotIndex = tempIsland.lastIndexOf('.');
  if (lastDotIndex !== -1) {
    tempIsland = tempIsland.substring(lastDotIndex + 1);
  } 

  // 1. find first # group that has equal or less size than newGroupSize
  // 2. if has equal size - add dot left and right and return adjusted string
  // 3. if has less size - try filling remaining items on the left, then right, then add dots outside
  // 4. return true if any condition was satisfied, false otherwise
  var springGroupLength = 0
  for (let i=0;i<tempIsland.length;i++) {
    const nextChar = i+1 < tempIsland.length ? tempIsland.charAt(i+1) : "x"

      if (tempIsland.charAt(i) == "#") { 
        springGroupLength++
      } else {
        springGroupLength = 0
      }

      if (springGroupLength == groupSize && nextChar != "#") {
        
      }
      
    }  

  return false
}

function mergeConsecutiveDots(inputString: string): string {
  const result = inputString.replace(/\.{2,}/g, '.');
  return result.replace(/^\.+|\.+$/g, '');
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

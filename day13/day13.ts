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

  const patterns: string[][] = [];
  var currentPattern: string[] = [];
  for await (const line of rl) {
    if (line == "") {
      patterns.push(currentPattern);
      currentPattern = [];
    } else {
      currentPattern.push(line);
    }
  }
  patterns.push(currentPattern);
  var sum = 0;
  patterns.forEach((pattern) => (sum += countReflections(pattern)));
  console.log(sum);
}

function countReflections(pattern: string[]): number {
  var columnMirror: number | undefined;
  var rowMirror: number | undefined;

  const columnsData = findRightColumnIndex(pattern);
  if (columnsData.rightMirrorIndex) {
    // console.log("Left columns: " + columnsData.rightMirrorIndex);
    columnMirror = columnsData.rightMirrorIndex;
  }

  const rowsData = findBottomRowIndex(pattern);
  if (rowsData.bottomMirrorIndex) {
    // console.log("Above rows: " + rowsData.bottomMirrorIndex);
    rowMirror = rowsData.bottomMirrorIndex;
  }

  if (columnMirror && rowMirror) {
    if (columnMirror < rowMirror) {
      return columnMirror;
    } else {
      return 100 * rowMirror;
    }
  } else if (columnMirror) {
    return columnMirror;
  } else if (rowMirror) {
    return 100 * rowMirror;
  }

  // 17312 too low
  console.log("Haven't found mirror column or row");
  return -1;
}

function makesPerfectRowMirror(
  bottomColumnIndex: number,
  rowsByIndex: Map<number, string>,
  smudgeUsed: boolean
): boolean {
  var count = 0;
  var currentIndexBelow = bottomColumnIndex + 1;
  var currentIndexAbove = bottomColumnIndex - 2;

  while (true) {
    const aboveRow = rowsByIndex.get(currentIndexAbove);
    const belowRow = rowsByIndex.get(currentIndexBelow);

    if (aboveRow && belowRow && aboveRow == belowRow) {
      count++;
      if (
        currentIndexAbove == 0 &&
        currentIndexBelow == rowsByIndex.keys.length - 1 &&
        smudgeUsed
      ) {
        return true;
      }
    } else if (
      aboveRow &&
      belowRow &&
      !smudgeUsed &&
      areSameWithTolerance(aboveRow, belowRow, 1)
    ) {
      smudgeUsed = true;
      count++;
      if (
        currentIndexAbove == 0 &&
        currentIndexBelow == rowsByIndex.keys.length - 1
      ) {
        return true;
      }
    } else if (aboveRow && belowRow == undefined && smudgeUsed) {
      // I can ignore most above if below is out of bounds
      return true;
    } else if (belowRow && aboveRow == undefined && smudgeUsed) {
      // I can ignore most below if above is out of bounds
      return true;
    } else {
      return false;
    }

    currentIndexBelow += 1;
    currentIndexAbove -= 1;
  }
}

function findBottomRowIndex(pattern: string[]): {
  bottomMirrorIndex: number | undefined;
  rowsByIndex: Map<number, string>;
} {
  const rows = pattern.length;

  const rowsByIndex = new Map<number, string>();
  var mirrorCandidates: { index: number; smudgeUsed: boolean }[] = [];

  for (let row = 0; row < rows; row++) {
    rowsByIndex.set(row, pattern[row]);
    const previous = rowsByIndex.get(row - 1);
    if (previous && previous == pattern[row]) {
      mirrorCandidates.push({ index: row, smudgeUsed: false });
    } else if (previous && areSameWithTolerance(previous, pattern[row], 1)) {
      mirrorCandidates.push({ index: row, smudgeUsed: true });
    }
  }

  const botomMirrorCandidate = mirrorCandidates.find((candidate) => {
    return makesPerfectRowMirror(
      candidate.index,
      rowsByIndex,
      candidate.smudgeUsed
    );
  });

  return {
    bottomMirrorIndex: botomMirrorCandidate?.index,
    rowsByIndex: rowsByIndex,
  };
}

function findRightColumnIndex(pattern: string[]): {
  rightMirrorIndex: number | undefined;
  columnsByIndex: Map<number, string>;
} {
  const columns = pattern[0].length;
  const rows = pattern.length;

  const columnsByIndex = new Map<number, string>();

  // can be multiple same lines, but not all of them make perfect mirror
  var mirrorCandidates: { index: number; smudgeUsed: boolean }[] = [];

  var currentColumn = "";
  for (let col = 0; col < columns; col++) {
    currentColumn = "";
    for (let row = 0; row < rows; row++) {
      currentColumn += pattern[row][col];
    }
    columnsByIndex.set(col, currentColumn);
    const previous = columnsByIndex.get(col - 1);
    if (previous && previous == currentColumn) {
      mirrorCandidates.push({ index: col, smudgeUsed: false });
    } else if (previous && areSameWithTolerance(previous, currentColumn, 1)) {
      mirrorCandidates.push({ index: col, smudgeUsed: true });
    }
  }

  const rightMirrorCandidate = mirrorCandidates.find((candidate) => {
    return makesPerfectColumnMirror(
      candidate.index,
      columnsByIndex,
      candidate.smudgeUsed
    );
  });
  return { rightMirrorIndex: rightMirrorCandidate?.index, columnsByIndex };
}

function areSameWithTolerance(
  a: string,
  b: string,
  tolerance: number
): boolean {
  let differences = 0;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      differences++;

      if (differences > tolerance) {
        return false;
      }
    }
  }

  return true;
}

function makesPerfectColumnMirror(
  candidateIndex: number,
  columnsByIndex: Map<number, string>,
  smudgeUsed: boolean
): boolean {
  var count = 0;
  var currentIndexRight = candidateIndex + 1;
  var currentIndexLeft = candidateIndex - 2;

  while (true) {
    const leftCol = columnsByIndex.get(currentIndexLeft);
    const rightCol = columnsByIndex.get(currentIndexRight);

    if (leftCol && rightCol && leftCol == rightCol) {
      count++;
      if (
        currentIndexLeft == 0 &&
        currentIndexRight == columnsByIndex.keys.length - 1 &&
        smudgeUsed
      ) {
        return true;
      }
    } else if (
      leftCol &&
      rightCol &&
      !smudgeUsed &&
      areSameWithTolerance(leftCol, rightCol, 1)
    ) {
      smudgeUsed = true;
      count++;
      if (
        currentIndexLeft == 0 &&
        currentIndexRight == columnsByIndex.keys.length - 1
      ) {
        return true;
      }
    } else if (rightCol && leftCol == undefined && smudgeUsed) {
      // I can ignore most right if left is out of bounds
      return true;
    } else if (leftCol && rightCol == undefined && smudgeUsed) {
      // I can ignore most lest if right is out of bounds
      return true;
    } else {
      return false;
    }

    currentIndexRight += 1;
    currentIndexLeft -= 1;
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

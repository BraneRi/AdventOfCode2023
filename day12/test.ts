const arraysEqualCache = new Map<string, boolean>();
function areArraysEqual(arr1: number[], arr2: number[]): boolean {
  const cachedKey = arr1.join(",") + ";" + arr2.join(",");
  const cached = arraysEqualCache.get(cachedKey);
  if (cached) return cached;

  const result =
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index]);
  arraysEqualCache.set(cachedKey, result);
  return result;
}

const groupsBeforeUnknownCache = new Map<string, string[]>();
function groupsBeforeUnknown(inputString: string): string[] {
  const cache = groupsBeforeUnknownCache.get(inputString);
  if (cache) return cache;

  const result: string[] = [];
  const split = inputString.split(".");

  for (let i = 0; i < split.length; i++) {
    if (split[i].includes("?")) {
      break;
    } else {
      result.push(split[i]);
    }
  }

  groupsBeforeUnknownCache.set(inputString, result);
  return result;
}

function isValidSolution(solution: string, groupSizes: number[]): boolean {
  const temp = groupsBeforeUnknown(trimSurroundingDots(mergeDots(solution)));
  const springGroups = temp.map((group) => group.length);
  const result =
    springGroups.length == 0 ||
    areArraysEqual(springGroups, groupSizes.slice(0, springGroups.length));
  return result;
}

function trimSurroundingDots(input: string): string {
  return input.replace(/^\.+|\.+$/g, "");
}

const mergeDotsCache = new Map<string, string>();
function mergeDots(inputString: string): string {
  const cached = mergeDotsCache.get(inputString);
  if (cached) return cached;

  const result = inputString.replace(/\.{2,}/g, ".");
  mergeDotsCache.set(inputString, result);
  return result;
}

const a = isValidSolution("####.....##.?", [4]);

console.log(a);

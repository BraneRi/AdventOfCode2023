function combinationsForGroupSize(
  springs: string,
  groupSize: number
): string[] {
  var combinations: string[] = [];

  var currentChar: string;
  for (let i = 0; i < springs.length - groupSize + 1; i++) {
    var currentSolution = springs;
    currentChar = springs[i];

    var nextChar = currentSolution.charAt(i + groupSize);
    var previousChar = currentSolution.charAt(i - 1);
    if (currentChar != ".") {
      if (
        !currentSolution.substring(i, i + groupSize).includes(".") &&
        nextChar != "#" &&
        previousChar != "#"
      ) {
        combinations.push(
          currentSolution.substring(0, i).replace(/\?/g, ".") +
            "#".repeat(groupSize) +
            currentSolution.substring(i + groupSize)
        );
      }
    }
  }

  return combinations;
}

function areArraysEqual(arr1: number[], arr2: number[]): boolean {
  return (
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index])
  );
}

function mergeDots(inputString: string): string {
  return inputString.replace(/\.{2,}/g, ".");
}

function trimSurroundingDots(inputString: string): string {
  return inputString.replace(/^\.+|\.+$/g, '');
}

function allBeforeUnknown(inputString: string): string {
  const indexOfQuestionMark = inputString.indexOf('?');
  return indexOfQuestionMark !== -1 ? inputString.substring(0, indexOfQuestionMark) : inputString;
}

var solutions = [ '###.###', '#...###' ]
const groupSizes = [1, 1, 3];

console.log(solutions);
// remove invalid solutions
solutions = solutions.filter((solution) => {
  const temp = trimSurroundingDots(mergeDots(allBeforeUnknown(solution))).split(".");
  const springGroups = temp.slice(0, temp.length - 1).map((group) => group.length);
  const result = springGroups.length == 0 ||
  areArraysEqual(springGroups, groupSizes.slice(0, springGroups.length));
  return result
});
console.log(solutions);
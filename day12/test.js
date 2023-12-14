function combinationsForGroupSize(springs, groupSize) {
    var combinations = [];
    var currentChar;
    for (var i = 0; i < springs.length - groupSize + 1; i++) {
        var currentSolution = springs;
        currentChar = springs[i];
        var nextChar = currentSolution.charAt(i + groupSize);
        var previousChar = currentSolution.charAt(i - 1);
        if (currentChar != ".") {
            if (!currentSolution.substring(i, i + groupSize).includes(".") &&
                nextChar != "#" &&
                previousChar != "#") {
                combinations.push(currentSolution.substring(0, i).replace(/\?/g, ".") +
                    "#".repeat(groupSize) +
                    currentSolution.substring(i + groupSize));
            }
        }
    }
    return combinations;
}
function areArraysEqual(arr1, arr2) {
    return (arr1.length === arr2.length &&
        arr1.every(function (value, index) { return value === arr2[index]; }));
}
function mergeDots(inputString) {
    return inputString.replace(/\.{2,}/g, ".");
}
function trimSurroundingDots(inputString) {
    return inputString.replace(/^\.+|\.+$/g, '');
}
function allBeforeUnknown(inputString) {
    var indexOfQuestionMark = inputString.indexOf('?');
    return indexOfQuestionMark !== -1 ? inputString.substring(0, indexOfQuestionMark) : inputString;
}
var solutions = ['###.###', '#...###'];
var groupSizes = [1, 1, 3];
console.log(solutions);
// remove invalid solutions
solutions = solutions.filter(function (solution) {
    var temp = trimSurroundingDots(mergeDots(allBeforeUnknown(solution))).split(".");
    console.log(temp);
    var springGroups = temp.slice(0, temp.length - 1).map(function (group) { return group.length; });
    console.log(springGroups);
    var result = springGroups.length == 0 ||
        areArraysEqual(springGroups, groupSizes.slice(0, springGroups.length));
    return result;
});
console.log(solutions);

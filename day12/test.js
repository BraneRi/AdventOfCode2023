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
console.log(combinationsForGroupSize(".###.##?????", 1));

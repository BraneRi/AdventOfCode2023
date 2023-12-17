var arraysEqualCache = new Map();
function areArraysEqual(arr1, arr2) {
    var cachedKey = arr1.join(",") + ";" + arr2.join(",");
    var cached = arraysEqualCache.get(cachedKey);
    if (cached)
        return cached;
    var result = arr1.length === arr2.length &&
        arr1.every(function (value, index) { return value === arr2[index]; });
    arraysEqualCache.set(cachedKey, result);
    return result;
}
var groupsBeforeUnknownCache = new Map();
function groupsBeforeUnknown(inputString) {
    var cache = groupsBeforeUnknownCache.get(inputString);
    if (cache)
        return cache;
    var result = [];
    var split = inputString.split(".");
    for (var i = 0; i < split.length; i++) {
        if (split[i].includes("?")) {
            break;
        }
        else {
            result.push(split[i]);
        }
    }
    groupsBeforeUnknownCache.set(inputString, result);
    return result;
}
function isValidSolution(solution, groupSizes) {
    var temp = groupsBeforeUnknown(trimSurroundingDots(mergeDots(solution)));
    var springGroups = temp.map(function (group) { return group.length; });
    var result = springGroups.length == 0 ||
        areArraysEqual(springGroups, groupSizes.slice(0, springGroups.length));
    return result;
}
function trimSurroundingDots(input) {
    return input.replace(/^\.+|\.+$/g, "");
}
var mergeDotsCache = new Map();
function mergeDots(inputString) {
    var cached = mergeDotsCache.get(inputString);
    if (cached)
        return cached;
    var result = inputString.replace(/\.{2,}/g, ".");
    mergeDotsCache.set(inputString, result);
    return result;
}
var a = isValidSolution("####.....##.?", [4]);
console.log(a);

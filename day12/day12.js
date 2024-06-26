"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var fs = require("fs");
// key - "Unknown" part of input hot springs string + remaining group sizes
// value - count of arrangements
var arrangementsCache = new Map();
var combinationsForGroupSizeCache = new Map();
function processFile(filePath) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var fileStream, rl, sum, _d, rl_1, rl_1_1, line, lineParts, partTwoInput, partTwoGroupSizes, result, e_1_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    fileStream = fs.createReadStream(filePath);
                    rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity, // Treats each line as a separate data event
                    });
                    sum = 0;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 6, 7, 12]);
                    _d = true, rl_1 = __asyncValues(rl);
                    _e.label = 2;
                case 2: return [4 /*yield*/, rl_1.next()];
                case 3:
                    if (!(rl_1_1 = _e.sent(), _a = rl_1_1.done, !_a)) return [3 /*break*/, 5];
                    _c = rl_1_1.value;
                    _d = false;
                    line = _c;
                    lineParts = line.split(" ");
                    partTwoInput = (lineParts[0] + "?").repeat(5).slice(0, -1);
                    partTwoGroupSizes = (lineParts[1] + ",").repeat(5).slice(0, -1);
                    console.log(line);
                    result = calculateLineArrangements(partTwoInput, partTwoGroupSizes.split(",").map(function (element) { return Number(element); }));
                    // console.timeEnd("calculateLineArrangements");
                    sum += result;
                    console.log(result);
                    // console.log(combinationsForGroupSizeCache);
                    console.log("---------");
                    _e.label = 4;
                case 4:
                    _d = true;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _e.trys.push([7, , 10, 11]);
                    if (!(!_d && !_a && (_b = rl_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _b.call(rl_1)];
                case 8:
                    _e.sent();
                    _e.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    // console.log(arrangementsCache);
                    console.log(sum);
                    return [2 /*return*/];
            }
        });
    });
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
var springsGroupSizesCache = new Map();
function springsGroupSizes(springs) {
    var cached = springsGroupSizesCache.get(springs);
    if (cached)
        return cached;
    var result = mergeDots(springs.replace(/\?/g, "."))
        .replace(/^\.+|\.+$/g, "")
        .split(".")
        .map(function (springGroup) { return springGroup.length; });
    springsGroupSizesCache.set(springs, result);
    return result;
}
var onlySpringsCache = new Map();
function onlySprings(str) {
    var cached = onlySpringsCache.get(str);
    if (cached)
        return cached;
    var result = /^#+$/.test(str);
    onlySpringsCache.set(str, result);
    return result;
}
var matchCache = new Map();
function doesSpringGroupSizesMatchInputSizes(springs, remainingGroupSizes) {
    var cachedKey = springs + ";" + remainingGroupSizes.join(",");
    var cached = matchCache.get(cachedKey);
    if (cached)
        return cached;
    var result = areArraysEqual(springsGroupSizes(springs), remainingGroupSizes);
    matchCache.set(cachedKey, result);
    return result;
}
function calculateLineArrangements(springs, remainingGroupSizes) {
    springs = trimSurroundingDots(mergeDots(springs));
    var cachedKey = springs + ";" + remainingGroupSizes.join(",");
    var cached = arrangementsCache.get(cachedKey);
    if (cached) {
        return cached;
    }
    if (remainingGroupSizes.length == 0) {
        if (!springs.includes("#")) {
            arrangementsCache.set(cachedKey, 1);
            return 1;
        }
        else {
            arrangementsCache.set(cachedKey, 0);
            return 0;
        }
    }
    else {
        if (springs.length == 0) {
            arrangementsCache.set(cachedKey, 0);
            return 0;
        }
    }
    if (remainingGroupSizes.reduce(function (acc, current) { return acc + current; }, 0) +
        remainingGroupSizes.length -
        1 >
        springs.length) {
        arrangementsCache.set(cachedKey, 0);
        return 0;
    }
    var springGroupSizesMatchInputSizes = doesSpringGroupSizesMatchInputSizes(springs, remainingGroupSizes);
    if (springGroupSizesMatchInputSizes) {
        arrangementsCache.set(cachedKey, 1);
        return 1;
    }
    var solutions = combinationsForGroupSize(springs, remainingGroupSizes[0]);
    var nextGroupSizes = remainingGroupSizes.slice(1);
    if (nextGroupSizes.length > 0) {
        solutions = solutions.filter(function (solution) { return solution.length > 0; });
    }
    if (nextGroupSizes.length == 0) {
        solutions = solutions.filter(function (solution) { return !solution.includes("#"); });
    }
    if (solutions.length == 0) {
        arrangementsCache.set(cachedKey, 0);
        return 0;
    }
    solutions = solutions.filter(function (solution) {
        return nextGroupSizes.reduce(function (acc, current) { return acc + current; }, 0) +
            nextGroupSizes.length -
            1 <=
            solution.length;
    });
    if (solutions.length == 0) {
        arrangementsCache.set(cachedKey, 0);
        return 0;
    }
    var result = solutions
        .map(function (solution) {
        solution = trimSurroundingDots(mergeDots(solution));
        var cachedKey = solution + ";" + nextGroupSizes.join(",");
        var cached = arrangementsCache.get(cachedKey);
        if (cached) {
            // console.log("cached");
            // console.log(cached);
            // console.log(nextGroupSizes);
            // console.log("   ");
            return cached;
        }
        else {
            // console.log("new");
            // console.log(solution);
            // console.log(nextGroupSizes);
            // console.log("   ");
            var result_1 = calculateLineArrangements(solution, nextGroupSizes);
            arrangementsCache.set(cachedKey, result_1);
            return result_1;
        }
    })
        .reduce(function (acc, result) { return acc + result; });
    arrangementsCache.set(cachedKey, result);
    return result;
}
function toCacheKey(key1, key2) {
    return key1 + " " + key2;
}
var includesDotCache = new Map();
function includesDot(currentSolution, startIndex, endIndex) {
    var cacheKey = currentSolution + ";" + startIndex + ";" + endIndex;
    var cache = includesDotCache.get(cacheKey);
    if (cache)
        return cache;
    var result = cachedSubstring(currentSolution, startIndex, endIndex).includes(".");
    includesDotCache.set(cacheKey, result);
    return result;
}
var solutionSubstringCache = new Map();
function cachedSubstring(solution, startIndex, endIndex) {
    if (endIndex === void 0) { endIndex = solution.length; }
    var cacheKey = solution + ";" + startIndex + ";" + endIndex;
    var cache = solutionSubstringCache.get(cacheKey);
    if (cache)
        return cache;
    var result = solution.substring(startIndex, endIndex);
    solutionSubstringCache.set(cacheKey, result);
    return result;
}
function trimSurroundingDots(input) {
    return input.replace(/^\.+|\.+$/g, "");
}
function isValidCase(currentSolution, i, groupSize) {
    var nextChar = currentSolution.charAt(i + groupSize);
    var previousChar = currentSolution.charAt(i - 1);
    if (!includesDot(currentSolution, i, i + groupSize) &&
        nextChar != "#" &&
        previousChar != "#") {
        if (!cachedSubstring(currentSolution, 0, i).includes("#")) {
            return true;
        }
    }
    return false;
}
function combinationsForGroupSize(springs, groupSize) {
    springs = trimSurroundingDots(mergeDots(springs));
    // console.time("combinationsForGroupSize");
    var cached = combinationsForGroupSizeCache.get(toCacheKey(springs, groupSize));
    if (cached) {
        return cached;
    }
    var combinations = [];
    var currentChar;
    // if here is exactly springs as a group size (surrounded by dots)
    var foundUniqueMatch = false;
    for (var i = 0; i < springs.length - groupSize + 1; i++) {
        if (foundUniqueMatch)
            break;
        var currentSolution = springs;
        currentChar = springs[i];
        if (currentChar != ".") {
            if (isValidCase(currentSolution, i, groupSize)) {
                combinations.push(cachedSubstring(currentSolution, i + 1 + groupSize));
            }
            if (onlySprings(cachedSubstring(currentSolution, i + groupSize)) &&
                (currentSolution.charAt(i + groupSize) == "." ||
                    currentSolution.charAt(i + groupSize) == "?")) {
                foundUniqueMatch = true;
            }
        }
    }
    combinationsForGroupSizeCache.set(toCacheKey(springs, groupSize), combinations);
    // console.timeEnd("combinationsForGroupSize");
    return combinations;
}
// Usage: node build/your-script.js your-text-file.txt
var args = process.argv.slice(2);
if (args.length !== 1) {
    console.error("Usage: node build/your-script.js your-text-file.txt");
    process.exit(1);
}
var filePath = args[0];
processFile(filePath)
    .then(function () { return console.log("File processing completed."); })
    .catch(function (error) { return console.error("Error:", error); });

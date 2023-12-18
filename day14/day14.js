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
function processFile(filePath) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var fileStream, rl, platform, _d, rl_1, rl_1_1, line, e_1_1, evenOutIterations, itemsForCycleChecking, targetIteration, cycleCandidates, i, cycleData, correctIndex;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    fileStream = fs.createReadStream(filePath);
                    rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity, // Treats each line as a separate data event
                    });
                    platform = [];
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
                    platform.push(line);
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
                    evenOutIterations = 1000;
                    itemsForCycleChecking = 100;
                    targetIteration = 1000000000;
                    cycleCandidates = [];
                    for (i = 1; i <= evenOutIterations + itemsForCycleChecking; i++) {
                        // leave it a while to even out
                        platform = tiltCycle(platform);
                        if (i >= evenOutIterations) {
                            // save last 100 iterations to check for cycles
                            cycleCandidates.push(calculateLoad(platform));
                        }
                    }
                    console.log("Starting to detect cycles...");
                    console.log(cycleCandidates);
                    cycleData = detectCycle(cycleCandidates);
                    console.log(cycleData);
                    correctIndex = getCorrectIndex(evenOutIterations, cycleData, targetIteration);
                    console.log("Value after 1000000000 iterations => " + cycleData.values[correctIndex]);
                    return [2 /*return*/];
            }
        });
    });
}
function detectCycle(cycleCandidates) {
    var biggestCycle = 0;
    var cycleFirst = cycleCandidates[0];
    var cycleStart = 0;
    var current;
    for (var i = 1; i < cycleCandidates.length; i++) {
        current = cycleCandidates[i];
        if (current == cycleFirst) {
            biggestCycle = Math.max(i - cycleStart, biggestCycle);
            cycleStart = i;
        }
    }
    return {
        length: biggestCycle,
        values: cycleCandidates.slice(0, biggestCycle),
    };
}
function getCorrectIndex(start, cycleData, targetIteration) {
    var closestToTargetWIthZero = Math.floor((targetIteration - start) / cycleData.length) *
        cycleData.length +
        start;
    return targetIteration - closestToTargetWIthZero;
}
function tiltCycle(platform) {
    platform = tiltNorth(platform);
    // printPlatform(platform);
    // console.log("-----");
    platform = tiltWest(platform);
    // printPlatform(platform);
    // console.log("-----");
    platform = tiltSouth(platform);
    // printPlatform(platform);
    // console.log("-----");
    platform = tiltEast(platform);
    // printPlatform(platform);
    // console.log("-----");
    return platform;
}
function printPlatform(platform) {
    platform.forEach(function (element) {
        process.stdout.write(element + "\n");
    });
}
function countOccurrences(line, targetChar) {
    return line.split("").filter(function (char) { return char === targetChar; }).length;
}
function calculateLoad(platform) {
    var count = 0;
    for (var i = 0; i < platform.length; i++) {
        var rowTotal = countOccurrences(platform[i], "O") * (platform.length - i);
        count += rowTotal;
    }
    return count;
}
function tiltNorth(platform) {
    var newPlatform = platform;
    var columns = platform[0].length;
    var rows = platform.length;
    var element;
    var lastImmovableRock;
    var emptySpaces;
    for (var col = 0; col < columns; col++) {
        emptySpaces = 0;
        lastImmovableRock = 0;
        for (var row = 0; row < rows; row++) {
            element = newPlatform[row][col];
            if (element == "#") {
                emptySpaces = 0;
                lastImmovableRock = row;
            }
            else if (element == ".") {
                emptySpaces++;
            }
            else if (element == "O") {
                lastImmovableRock = row - emptySpaces;
                if (lastImmovableRock != row) {
                    newPlatform[lastImmovableRock] = updateStringAtIndex(newPlatform[lastImmovableRock], col, "O");
                    newPlatform[row] = updateStringAtIndex(newPlatform[row], col, ".");
                }
            }
        }
    }
    return newPlatform;
}
function tiltSouth(platform) {
    var newPlatform = platform;
    var columns = platform[0].length;
    var rows = platform.length;
    var element;
    var lastImmovableRock;
    var emptySpaces;
    for (var col = 0; col < columns; col++) {
        emptySpaces = 0;
        lastImmovableRock = 0;
        for (var row = rows - 1; row >= 0; row--) {
            element = newPlatform[row][col];
            if (element == "#") {
                emptySpaces = 0;
                lastImmovableRock = row;
            }
            else if (element == ".") {
                emptySpaces++;
            }
            else if (element == "O") {
                lastImmovableRock = row + emptySpaces;
                if (lastImmovableRock != row) {
                    newPlatform[lastImmovableRock] = updateStringAtIndex(newPlatform[lastImmovableRock], col, "O");
                    newPlatform[row] = updateStringAtIndex(newPlatform[row], col, ".");
                }
            }
        }
    }
    return newPlatform;
}
function tiltWest(platform) {
    var newPlatform = platform;
    var columns = platform[0].length;
    var rows = platform.length;
    var element;
    var lastImmovableRock;
    var emptySpaces;
    for (var row = 0; row < rows; row++) {
        emptySpaces = 0;
        lastImmovableRock = 0;
        for (var col = 0; col < columns; col++) {
            element = newPlatform[row][col];
            if (element == "#") {
                emptySpaces = 0;
                lastImmovableRock = col;
            }
            else if (element == ".") {
                emptySpaces++;
            }
            else if (element == "O") {
                lastImmovableRock = col - emptySpaces;
                if (lastImmovableRock != col) {
                    newPlatform[row] = updateStringAtIndex(newPlatform[row], lastImmovableRock, "O");
                    newPlatform[row] = updateStringAtIndex(newPlatform[row], col, ".");
                }
            }
        }
    }
    return newPlatform;
}
function tiltEast(platform) {
    var newPlatform = platform;
    var columns = platform[0].length;
    var rows = platform.length;
    var element;
    var lastImmovableRock;
    var emptySpaces;
    for (var row = 0; row < rows; row++) {
        emptySpaces = 0;
        lastImmovableRock = 0;
        for (var col = columns - 1; col >= 0; col--) {
            element = newPlatform[row][col];
            if (element == "#") {
                emptySpaces = 0;
                lastImmovableRock = col;
            }
            else if (element == ".") {
                emptySpaces++;
            }
            else if (element == "O") {
                lastImmovableRock = col + emptySpaces;
                if (lastImmovableRock != col) {
                    newPlatform[row] = updateStringAtIndex(newPlatform[row], lastImmovableRock, "O");
                    newPlatform[row] = updateStringAtIndex(newPlatform[row], col, ".");
                }
            }
        }
    }
    return newPlatform;
}
function updateStringAtIndex(input, index, newChar) {
    var charArray = input.split("");
    charArray[index] = newChar;
    var updatedString = charArray.join("");
    return updatedString;
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

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
function toPipeMapKey(coordinates) {
    return coordinates.row + " " + coordinates.column;
}
function processFile(filePath) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var fileStream, rl, row, column, maxColumns, pipeMap, startPipeCoordinates, _d, rl_1, rl_1_1, line, e_1_1, startPipe, result;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    fileStream = fs.createReadStream(filePath);
                    rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity, // Treats each line as a separate data event
                    });
                    row = 0;
                    column = 0;
                    pipeMap = new Map();
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
                    line.split("").forEach(function (char) {
                        switch (char) {
                            case ".": {
                                // no pipe
                                break;
                            }
                            case "S": {
                                startPipeCoordinates = { row: row, column: column };
                                break;
                            }
                            case "|": {
                                pipeMap.set(toPipeMapKey({ row: row, column: column }), {
                                    value: char,
                                    coordinate: { row: row, column: column },
                                    neighbour1Coordinate: { row: row - 1, column: column },
                                    neighbour2Coordinate: { row: row + 1, column: column },
                                    stepsFromStart: -1,
                                    // for now
                                    partOfMainLoop: false,
                                });
                                break;
                            }
                            case "-": {
                                pipeMap.set(toPipeMapKey({ row: row, column: column }), {
                                    value: char,
                                    coordinate: { row: row, column: column },
                                    neighbour1Coordinate: { row: row, column: column - 1 },
                                    neighbour2Coordinate: { row: row, column: column + 1 },
                                    stepsFromStart: -1,
                                    // for now
                                    partOfMainLoop: false,
                                });
                                break;
                            }
                            case "7": {
                                pipeMap.set(toPipeMapKey({ row: row, column: column }), {
                                    value: char,
                                    coordinate: { row: row, column: column },
                                    neighbour1Coordinate: { row: row, column: column - 1 },
                                    neighbour2Coordinate: { row: row + 1, column: column },
                                    stepsFromStart: -1,
                                    // for now
                                    partOfMainLoop: false,
                                });
                                break;
                            }
                            case "F": {
                                pipeMap.set(toPipeMapKey({ row: row, column: column }), {
                                    value: char,
                                    coordinate: { row: row, column: column },
                                    neighbour1Coordinate: { row: row, column: column + 1 },
                                    neighbour2Coordinate: { row: row + 1, column: column },
                                    stepsFromStart: -1,
                                    // for now
                                    partOfMainLoop: false,
                                });
                                break;
                            }
                            case "L": {
                                pipeMap.set(toPipeMapKey({ row: row, column: column }), {
                                    value: char,
                                    coordinate: { row: row, column: column },
                                    neighbour1Coordinate: { row: row - 1, column: column },
                                    neighbour2Coordinate: { row: row, column: column + 1 },
                                    stepsFromStart: -1,
                                    // for now
                                    partOfMainLoop: false,
                                });
                                break;
                            }
                            case "J": {
                                pipeMap.set(toPipeMapKey({ row: row, column: column }), {
                                    value: char,
                                    coordinate: { row: row, column: column },
                                    neighbour1Coordinate: { row: row, column: column - 1 },
                                    neighbour2Coordinate: { row: row - 1, column: column },
                                    stepsFromStart: -1,
                                    // for now
                                    partOfMainLoop: false,
                                });
                                break;
                            }
                            default: {
                                console.log("Unsupported character");
                                break;
                            }
                        }
                        column++;
                    });
                    row++;
                    maxColumns = column;
                    column = 0;
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
                    if (startPipeCoordinates) {
                        startPipe = getStartPipe(startPipeCoordinates, pipeMap, row, maxColumns);
                        setCorrectStartPipeValue(startPipe);
                        pipeMap.set(toPipeMapKey(startPipe.coordinate), startPipe);
                        removeJunkFromPipeMap(startPipe, pipeMap);
                        result = getEnclosedTilesNuber(pipeMap, row, maxColumns);
                        console.log(result);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function checkLJ(startPipe, first, second) {
    if (first.row == startPipe.coordinate.row - 1) {
        if (second.column == startPipe.coordinate.column - 1) {
            startPipe.value = "J";
        }
        if (second.column == startPipe.coordinate.column + 1) {
            startPipe.value = "L";
        }
    }
}
function checkF7(startPipe, first, second) {
    if (first.row == startPipe.coordinate.row + 1) {
        if (second.column == startPipe.coordinate.column - 1) {
            startPipe.value = "7";
        }
        if (second.column == startPipe.coordinate.column + 1) {
            startPipe.value = "F";
        }
    }
}
function setCorrectStartPipeValue(startPipe) {
    checkLJ(startPipe, startPipe.neighbour1Coordinate, startPipe.neighbour2Coordinate);
    checkLJ(startPipe, startPipe.neighbour2Coordinate, startPipe.neighbour1Coordinate);
    checkF7(startPipe, startPipe.neighbour1Coordinate, startPipe.neighbour2Coordinate);
    checkF7(startPipe, startPipe.neighbour2Coordinate, startPipe.neighbour1Coordinate);
    if (startPipe.neighbour1Coordinate.row == startPipe.coordinate.row &&
        startPipe.neighbour2Coordinate.row == startPipe.coordinate.row) {
        startPipe.value = "-";
    }
    if (startPipe.neighbour1Coordinate.column == startPipe.coordinate.column &&
        startPipe.neighbour2Coordinate.column == startPipe.coordinate.column) {
        startPipe.value = "|";
    }
}
function isOdd(input) {
    return input % 2 == 1;
}
function getEnclosedTilesNuber(pipeMap, maxRows, maxColumns) {
    var enclosed = 0;
    var pipesFromLeft;
    var afterF;
    var afterL;
    for (var row = 0; row < maxRows; row++) {
        pipesFromLeft = 0;
        afterF = false;
        afterL = false;
        for (var column = 0; column < maxColumns; column++) {
            var pipe = pipeMap.get(toPipeMapKey({ row: row, column: column }));
            var leftPipe = pipeMap.get(toPipeMapKey({ row: row, column: column - 1 }));
            if (leftPipe) {
                if (leftPipe.value == "F") {
                    afterF = true;
                }
                else if (leftPipe.value == "L") {
                    afterL = true;
                }
                if (!afterF && !afterL) {
                    pipesFromLeft++;
                }
                if (leftPipe.value == "7") {
                    if (afterL) {
                        // counts as polygon edge
                        pipesFromLeft++;
                    }
                    afterF = false;
                    afterL = false;
                }
                else if (leftPipe.value == "J") {
                    if (afterF) {
                        // counts as polygon edge
                        pipesFromLeft++;
                    }
                    afterF = false;
                    afterL = false;
                }
            }
            if (!pipe && isOdd(pipesFromLeft)) {
                process.stdout.write("*");
                enclosed++;
            }
            else {
                if (pipe) {
                    process.stdout.write("" + pipe.value);
                }
                else {
                    process.stdout.write(".");
                }
            }
        }
        console.log();
    }
    return enclosed;
}
// converted part 1 function to remove junk
function removeJunkFromPipeMap(startPipe, pipeMap) {
    // console.log(startPipe.value);
    var previousPipe = startPipe;
    var nextPipe = pipeMap.get(toPipeMapKey(startPipe.neighbour1Coordinate));
    var maxSteps = 0;
    var nextCoordinate;
    while ((nextPipe === null || nextPipe === void 0 ? void 0 : nextPipe.stepsFromStart) != 0) {
        if (nextPipe) {
            nextPipe.partOfMainLoop = true;
        }
        // console.log(nextPipe?.value);
        if (!coordinateMatch(nextPipe === null || nextPipe === void 0 ? void 0 : nextPipe.neighbour1Coordinate, previousPipe === null || previousPipe === void 0 ? void 0 : previousPipe.coordinate)) {
            nextCoordinate = nextPipe === null || nextPipe === void 0 ? void 0 : nextPipe.neighbour1Coordinate;
        }
        else {
            nextCoordinate = nextPipe === null || nextPipe === void 0 ? void 0 : nextPipe.neighbour2Coordinate;
        }
        previousPipe = nextPipe;
        if (nextCoordinate) {
            nextPipe = pipeMap.get(toPipeMapKey(nextCoordinate));
        }
        maxSteps++;
    }
    Array.from(pipeMap.entries()).forEach(function (entry) {
        if (!entry[1].partOfMainLoop) {
            pipeMap.delete(entry[0]);
        }
    });
    return maxSteps;
}
function coordinateMatch(coordinates1, coordinates2) {
    if (coordinates1.row == coordinates2.row &&
        coordinates1.column == coordinates2.column)
        return true;
    return false;
}
function getStartPipe(startPipeCoordinates, pipeMap, maxRows, maxColumns) {
    var currentPipe;
    var neighbours = [];
    for (var row = Math.max(0, startPipeCoordinates.row - 1); row < Math.min(startPipeCoordinates.row + 2, maxRows); row++) {
        for (var column = Math.max(0, startPipeCoordinates.column - 1); column < Math.min(startPipeCoordinates.column + 2, maxColumns); column++) {
            currentPipe = pipeMap.get(toPipeMapKey({ row: row, column: column }));
            if (currentPipe) {
                if (coordinateMatch(startPipeCoordinates, currentPipe.neighbour1Coordinate) ||
                    coordinateMatch(startPipeCoordinates, currentPipe.neighbour2Coordinate)) {
                    neighbours.push(currentPipe.coordinate);
                }
            }
        }
    }
    return {
        value: "S",
        coordinate: startPipeCoordinates,
        neighbour1Coordinate: neighbours[0],
        neighbour2Coordinate: neighbours[1],
        stepsFromStart: 0,
        // for now
        partOfMainLoop: true,
    };
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

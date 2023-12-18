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
        var fileStream, rl, cave, _d, rl_1, rl_1_1, line, e_1_1, maxEnergy;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    fileStream = fs.createReadStream(filePath);
                    rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity, // Treats each line as a separate data event
                    });
                    cave = [];
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
                    cave.push(line.split("").map(function (char) { return ({
                        value: char,
                        energized: { up: false, down: false, left: false, right: false },
                    }); }));
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
                    maxEnergy = findMostEnergizedCave(cave);
                    console.log(maxEnergy);
                    return [2 /*return*/];
            }
        });
    });
}
function findMostEnergizedCave(cave) {
    var currentMax = -1;
    for (var row = 0; row < cave.length; row++) {
        var caveCopy = deepCopy(cave);
        var energizedCave = energize(row, -1, caveCopy, Direction.Right, 0);
        currentMax = Math.max(currentMax, countEnergized(energizedCave));
    }
    for (var row = 0; row < cave.length; row++) {
        var caveCopy = deepCopy(cave);
        var energizedCave = energize(row, cave[0].length, caveCopy, Direction.Left, 0);
        currentMax = Math.max(currentMax, countEnergized(energizedCave));
    }
    for (var col = 0; col < cave[0].length; col++) {
        var caveCopy = deepCopy(cave);
        var energizedCave = energize(cave.length, col, caveCopy, Direction.Up, 0);
        currentMax = Math.max(currentMax, countEnergized(energizedCave));
    }
    for (var col = 0; col < cave[0].length; col++) {
        var caveCopy = deepCopy(cave);
        var energizedCave = energize(-1, col, caveCopy, Direction.Down, 0);
        currentMax = Math.max(currentMax, countEnergized(energizedCave));
    }
    return currentMax;
}
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
function energize(currentRow, currentColumn, cave, direction, energyLevel) {
    // this means we entered a loop
    if (calculateEnergyLevel(cave) == energyLevel &&
        currentColumn >= 0 &&
        currentRow >= 0) {
        // console.log("Im in a loop at (" + currentRow + "," + currentColumn + ")");
        return cave;
    }
    // calculate old energy level, before change so we can compare changes in next step
    var oldEnergyLevel = calculateEnergyLevel(cave);
    var nextRow;
    var nextColumn;
    switch (direction) {
        case Direction.Up: {
            nextRow = currentRow - 1;
            if (nextRow < 0) {
                // console.log("Too high");
                return cave;
            }
            nextColumn = currentColumn;
            break;
        }
        case Direction.Down: {
            nextRow = currentRow + 1;
            if (nextRow >= cave.length) {
                // console.log("Too low");
                return cave;
            }
            nextColumn = currentColumn;
            break;
        }
        case Direction.Left: {
            nextRow = currentRow;
            nextColumn = currentColumn - 1;
            if (nextColumn < 0) {
                // console.log("Too left");
                return cave;
            }
            break;
        }
        case Direction.Right: {
            nextRow = currentRow;
            nextColumn = currentColumn + 1;
            if (nextColumn >= cave[0].length) {
                // console.log("Too right");
                return cave;
            }
            break;
        }
    }
    var element = cave[nextRow][nextColumn];
    switch (element.value) {
        case "/": {
            switch (direction) {
                case Direction.Down:
                    element.energized = {
                        up: element.energized.up,
                        down: true,
                        left: element.energized.left,
                        right: element.energized.right,
                    };
                    return energize(nextRow, nextColumn, cave, Direction.Left, oldEnergyLevel);
                case Direction.Up:
                    element.energized = {
                        up: true,
                        down: element.energized.down,
                        left: element.energized.left,
                        right: element.energized.right,
                    };
                    return energize(nextRow, nextColumn, cave, Direction.Right, oldEnergyLevel);
                case Direction.Right:
                    element.energized = {
                        up: element.energized.up,
                        down: element.energized.down,
                        left: element.energized.left,
                        right: true,
                    };
                    return energize(nextRow, nextColumn, cave, Direction.Up, oldEnergyLevel);
                case Direction.Left:
                    element.energized = {
                        up: element.energized.up,
                        down: element.energized.down,
                        left: true,
                        right: element.energized.right,
                    };
                    return energize(nextRow, nextColumn, cave, Direction.Down, oldEnergyLevel);
            }
        }
        case "\\": {
            switch (direction) {
                case Direction.Down:
                    element.energized = {
                        up: element.energized.up,
                        down: true,
                        left: element.energized.left,
                        right: element.energized.right,
                    };
                    return energize(nextRow, nextColumn, cave, Direction.Right, oldEnergyLevel);
                case Direction.Up: {
                    element.energized = {
                        up: true,
                        down: element.energized.down,
                        left: element.energized.left,
                        right: element.energized.right,
                    };
                    return energize(nextRow, nextColumn, cave, Direction.Left, oldEnergyLevel);
                }
                case Direction.Right:
                    element.energized = {
                        up: element.energized.up,
                        down: element.energized.down,
                        left: element.energized.left,
                        right: true,
                    };
                    return energize(nextRow, nextColumn, cave, Direction.Down, oldEnergyLevel);
                case Direction.Left:
                    element.energized = {
                        up: element.energized.up,
                        down: element.energized.down,
                        left: true,
                        right: element.energized.right,
                    };
                    return energize(nextRow, nextColumn, cave, Direction.Up, oldEnergyLevel);
            }
        }
        case ".": {
            element.energized = {
                up: direction == Direction.Up ? true : element.energized.up,
                down: direction == Direction.Down ? true : element.energized.down,
                left: direction == Direction.Left ? true : element.energized.left,
                right: direction == Direction.Right ? true : element.energized.right,
            };
            var nextCave = energize(nextRow, nextColumn, cave, direction, oldEnergyLevel);
            return nextCave;
        }
        case "|": {
            switch (direction) {
                case Direction.Down: {
                    element.energized = {
                        up: element.energized.up,
                        down: true,
                        left: element.energized.left,
                        right: element.energized.right,
                    };
                    return energize(nextRow, nextColumn, cave, direction, oldEnergyLevel);
                }
                case Direction.Up: {
                    element.energized = {
                        up: true,
                        down: element.energized.down,
                        left: element.energized.left,
                        right: element.energized.right,
                    };
                    return energize(nextRow, nextColumn, cave, direction, oldEnergyLevel);
                }
                case Direction.Right: {
                    element.energized = {
                        up: element.energized.up,
                        down: element.energized.down,
                        left: element.energized.left,
                        right: true,
                    };
                    var newCave = energize(nextRow, nextColumn, cave, Direction.Up, oldEnergyLevel);
                    return energize(nextRow, nextColumn, newCave, Direction.Down, oldEnergyLevel);
                }
                case Direction.Left: {
                    element.energized = {
                        up: element.energized.up,
                        down: element.energized.down,
                        left: true,
                        right: element.energized.right,
                    };
                    var newCave = energize(nextRow, nextColumn, cave, Direction.Up, oldEnergyLevel);
                    return energize(nextRow, nextColumn, newCave, Direction.Down, oldEnergyLevel);
                }
            }
        }
        case "-": {
            switch (direction) {
                case Direction.Left: {
                    element.energized = {
                        up: element.energized.up,
                        down: element.energized.down,
                        left: true,
                        right: element.energized.right,
                    };
                    return energize(nextRow, nextColumn, cave, direction, oldEnergyLevel);
                }
                case Direction.Right: {
                    element.energized = {
                        up: element.energized.up,
                        down: element.energized.down,
                        left: element.energized.left,
                        right: true,
                    };
                    return energize(nextRow, nextColumn, cave, direction, oldEnergyLevel);
                }
                case Direction.Down: {
                    element.energized = {
                        up: element.energized.up,
                        down: true,
                        left: element.energized.left,
                        right: element.energized.right,
                    };
                    var newCave = energize(nextRow, nextColumn, cave, Direction.Left, oldEnergyLevel);
                    return energize(nextRow, nextColumn, newCave, Direction.Right, oldEnergyLevel);
                }
                case Direction.Up: {
                    element.energized = {
                        up: true,
                        down: element.energized.down,
                        left: element.energized.left,
                        right: element.energized.right,
                    };
                    var newCave = energize(nextRow, nextColumn, cave, Direction.Left, oldEnergyLevel);
                    return energize(nextRow, nextColumn, newCave, Direction.Right, oldEnergyLevel);
                }
            }
        }
        default: {
            console.log("Not valid cave element");
            return cave;
        }
    }
}
function calculateEnergyLevel(cave) {
    var sum = 0;
    for (var i = 0; i < cave.length; i++) {
        for (var j = 0; j < cave[0].length; j++) {
            var energized = cave[i][j].energized;
            var energizedSum = 0;
            if (energized.up)
                energizedSum++;
            if (energized.down)
                energizedSum++;
            if (energized.left)
                energizedSum++;
            if (energized.right)
                energizedSum++;
            sum += energizedSum;
        }
    }
    return sum;
}
function countEnergized(cave) {
    var sum = 0;
    for (var i = 0; i < cave.length; i++) {
        for (var j = 0; j < cave[0].length; j++) {
            var energized = cave[i][j].energized;
            var isEnergized = false;
            if (energized.up)
                isEnergized = true;
            if (energized.down)
                isEnergized = true;
            if (energized.left)
                isEnergized = true;
            if (energized.right)
                isEnergized = true;
            sum += isEnergized ? 1 : 0;
        }
    }
    return sum;
}
function visualizeEnergizedCave(cave) {
    for (var i = 0; i < cave.length; i++) {
        for (var j = 0; j < cave[0].length; j++) {
            var energized = cave[i][j].energized;
            if (energized.down || energized.up || energized.left || energized.right) {
                process.stdout.write("#");
            }
            else {
                process.stdout.write(cave[i][j].value);
            }
        }
        process.stdout.write("\n");
    }
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

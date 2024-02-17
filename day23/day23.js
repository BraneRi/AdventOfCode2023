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
var FOREST = "#";
var WALK = ".";
var DOWN = "v";
var UP = "^";
var LEFT = "<";
var RIGHT = ">";
function pathToKey(p) {
    return p.row + "," + p.column;
}
function processFile(filePath) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var fileStream, rl, island, row, startingColumn, numberOfColumns, _d, rl_1, rl_1_1, line, lineElements, e_1_1, result;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    fileStream = fs.createReadStream(filePath);
                    rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity, // Treats each line as a separate data event
                    });
                    island = new Map();
                    row = 0;
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
                    lineElements = line.split("");
                    numberOfColumns = lineElements.length;
                    lineElements.forEach(function (c, index) {
                        if (row == 0 && c == WALK)
                            startingColumn = index;
                        island.set(pathToKey({ row: row, column: index }), {
                            pathType: c,
                            walked: false,
                        });
                    });
                    row++;
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
                    result = longestWalk(0, startingColumn, island, row - 1);
                    console.log("Longest walk: " + result);
                    printIsland(row, numberOfColumns, island);
                    return [2 /*return*/];
            }
        });
    });
}
function printIsland(row, numberOfColumns, island) {
    for (var r = 0; r < row; r++) {
        for (var c = 0; c < numberOfColumns; c++) {
            var value = island.get(pathToKey({ row: r, column: c }));
            var valuePrint = void 0;
            if (value.walked) {
                valuePrint = "O";
            }
            else {
                valuePrint = value.pathType;
            }
            process.stdout.write(valuePrint);
        }
        console.log();
    }
}
function longestWalk(row, column, island, finishRow) {
    var key = pathToKey({ row: row, column: column });
    var value = island.get(pathToKey({ row: row, column: column }));
    if (value.walked)
        return Number.NEGATIVE_INFINITY;
    island.set(key, { pathType: value.pathType, walked: true });
    if (row == finishRow) {
        return 0;
    }
    switch (value.pathType) {
        case UP:
            return longestWalk(row - 1, column, island, finishRow) + 1;
        case DOWN:
            return longestWalk(row + 1, column, island, finishRow) + 1;
        case LEFT:
            return longestWalk(row, column - 1, island, finishRow) + 1;
        case RIGHT:
            return longestWalk(row, column + 1, island, finishRow) + 1;
        default: {
            var options = [];
            for (var _i = 0, _a = [
                { rowStep: 1, columnStep: 0 },
                { rowStep: 0, columnStep: 1 },
                { rowStep: -1, columnStep: 0 },
                { rowStep: 0, columnStep: -1 },
            ]; _i < _a.length; _i++) {
                var steps = _a[_i];
                var optionPath = {
                    row: row + steps.rowStep,
                    column: column + steps.columnStep,
                };
                var option = island.get(pathToKey(optionPath));
                if (option && !option.walked && option.pathType != FOREST)
                    options.push(optionPath);
            }
            return (1 +
                options.reduce(function (max, option) {
                    return Math.max(max, longestWalk(option.row, option.column, new Map(island), finishRow));
                }, Number.NEGATIVE_INFINITY));
        }
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

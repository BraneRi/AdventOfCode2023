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
var PriorityQueue = /** @class */ (function () {
    function PriorityQueue() {
        this.items = [];
    }
    PriorityQueue.prototype.enqueue = function (key, priority) {
        this.items.push({ key: key, priority: priority });
        this.sort();
    };
    PriorityQueue.prototype.dequeue = function () {
        var _a;
        return (_a = this.items.shift()) === null || _a === void 0 ? void 0 : _a.key;
    };
    PriorityQueue.prototype.sort = function () {
        this.items.sort(function (a, b) { return a.priority - b.priority; });
    };
    PriorityQueue.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    return PriorityQueue;
}());
function processFile(filePath) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var fileStream, rl, input, _d, rl_1, rl_1_1, line, e_1_1, graph, startKey;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    fileStream = fs.createReadStream(filePath);
                    rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity, // Treats each line as a separate data event
                    });
                    input = [];
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
                    input.push(line.split("").map(function (char) { return Number(char); }));
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
                    graph = generateGraph(input);
                    startKey = {
                        row: 0,
                        col: 0,
                        consecutiveLeft: 0,
                        consecutiveRight: 0,
                        consecutiveUp: 0,
                        consecutiveDown: 0,
                    };
                    console.log(dijkstra(graph, startKey, input.length - 1, input[0].length - 1, input));
                    return [2 /*return*/];
            }
        });
    });
}
function toNodeFromString(stringKey) {
    var keyParts = stringKey.split(",");
    return {
        row: Number(keyParts[0]),
        col: Number(keyParts[1]),
        consecutiveLeft: Number(keyParts[2]),
        consecutiveRight: Number(keyParts[3]),
        consecutiveUp: Number(keyParts[4]),
        consecutiveDown: Number(keyParts[5]),
    };
}
function generateGraph(originalGraph) {
    var _a;
    var newGraph = new Map();
    for (var row = 0; row < originalGraph.length; row++) {
        for (var col = 0; col < originalGraph[0].length; col++) {
            var node = {
                row: row,
                col: col,
                consecutiveLeft: 0,
                consecutiveRight: 0,
                consecutiveUp: 0,
                consecutiveDown: 0,
            };
            newGraph.set(toStringKey(node), []);
            for (var i = 1; i <= 3; i++) {
                newGraph.set(toStringKey({
                    row: row,
                    col: col,
                    consecutiveLeft: i,
                    consecutiveRight: 0,
                    consecutiveUp: 0,
                    consecutiveDown: 0,
                }), []);
                newGraph.set(toStringKey({
                    row: row,
                    col: col,
                    consecutiveLeft: 0,
                    consecutiveRight: i,
                    consecutiveUp: 0,
                    consecutiveDown: 0,
                }), []);
                newGraph.set(toStringKey({
                    row: row,
                    col: col,
                    consecutiveLeft: 0,
                    consecutiveRight: 0,
                    consecutiveUp: i,
                    consecutiveDown: 0,
                }), []);
                newGraph.set(toStringKey({
                    row: row,
                    col: col,
                    consecutiveLeft: 0,
                    consecutiveRight: 0,
                    consecutiveUp: 0,
                    consecutiveDown: i,
                }), []);
            }
        }
    }
    // adding neighbours
    for (var _i = 0, _b = Array.from(newGraph.entries()); _i < _b.length; _i++) {
        var _c = _b[_i], currentNode = _c[0], _ = _c[1];
        var _d = toNodeFromString(currentNode), row = _d.row, col = _d.col, consecutiveLeft = _d.consecutiveLeft, consecutiveRight = _d.consecutiveRight, consecutiveUp = _d.consecutiveUp, consecutiveDown = _d.consecutiveDown;
        var deltas = [];
        // If we went right, we cannot go back left
        if (consecutiveRight == 0) {
            var step = 1;
            for (var i = consecutiveLeft + 1; i <= 3; i++) {
                deltas.push([0, -1 * step, i, 0, 0, 0]);
                step++;
            }
        }
        if (consecutiveLeft == 0) {
            var step = 1;
            for (var i = consecutiveRight + 1; i <= 3; i++) {
                deltas.push([0, step, 0, i, 0, 0]);
                step++;
            }
        }
        if (consecutiveDown == 0) {
            var step = 1;
            for (var i = consecutiveUp + 1; i <= 3; i++) {
                deltas.push([-1 * step, 0, 0, 0, i, 0]);
                step++;
            }
        }
        if (consecutiveUp == 0) {
            var step = 1;
            for (var i = consecutiveDown + 1; i <= 3; i++) {
                deltas.push([step, 0, 0, 0, 0, i]);
                step++;
            }
        }
        for (var _e = 0, deltas_1 = deltas; _e < deltas_1.length; _e++) {
            var _f = deltas_1[_e], deltaRow = _f[0], deltaCol = _f[1], left = _f[2], right = _f[3], up = _f[4], down = _f[5];
            var newRow = row + deltaRow;
            var newCol = col + deltaCol;
            if (newRow >= 0 &&
                newRow < originalGraph.length &&
                newCol >= 0 &&
                newCol < originalGraph[0].length) {
                var newNode = {
                    row: newRow,
                    col: newCol,
                    consecutiveLeft: left,
                    consecutiveRight: right,
                    consecutiveUp: up,
                    consecutiveDown: down,
                };
                (_a = newGraph.get(currentNode)) === null || _a === void 0 ? void 0 : _a.push(newNode);
            }
        }
    }
    return newGraph;
}
function toStringKey(key) {
    return (key.row +
        "," +
        key.col +
        "," +
        key.consecutiveLeft +
        "," +
        key.consecutiveRight +
        "," +
        key.consecutiveUp +
        "," +
        key.consecutiveDown);
}
function dijkstra(graph, startKey, targetRow, targetColumn, input) {
    var distances = {};
    var priorityQueue = new PriorityQueue();
    var previousNodes = {};
    distances[toStringKey(startKey)] = 0;
    priorityQueue.enqueue(startKey, 0);
    while (!priorityQueue.isEmpty()) {
        var currentNode = priorityQueue.dequeue();
        if (!currentNode) {
            break;
        }
        for (var _i = 0, _a = graph.get(toStringKey(currentNode)); _i < _a.length; _i++) {
            var neighborKey = _a[_i];
            var distanceToNeighbor = distances[toStringKey(currentNode)] +
                calculateDistance(currentNode, neighborKey, input);
            if (distances[toStringKey(neighborKey)] == undefined ||
                distanceToNeighbor < distances[toStringKey(neighborKey)]) {
                distances[toStringKey(neighborKey)] = distanceToNeighbor;
                priorityQueue.enqueue(neighborKey, distanceToNeighbor);
                previousNodes[toStringKey(neighborKey)] = toStringKey(currentNode);
            }
        }
    }
    var shortestTarget = Number.MAX_SAFE_INTEGER;
    var shortest = Object.entries(distances)
        .filter(function (_a) {
        var key = _a[0], _ = _a[1];
        var node = toNodeFromString(key);
        return node.row == targetRow && node.col == targetColumn;
    })
        .map(function (targets) { return targets[1]; })
        .reduce(function (acc, entry) { return Math.min(acc, entry); }, shortestTarget);
    // console.log(previousNodes);
    return shortest || -1; // Return -1 if target is unreachable
}
function calculateDistance(source, target, input) {
    var distancesBetween = 0;
    if (source.row == target.row) {
        if (source.col < target.col) {
            for (var i = source.col + 1; i <= target.col; i++) {
                distancesBetween += input[source.row][i];
            }
        }
        else {
            for (var i = source.col - 1; i >= target.col; i--) {
                distancesBetween += input[source.row][i];
            }
        }
    }
    else {
        if (source.row < target.row) {
            for (var i = source.row + 1; i <= target.row; i++) {
                distancesBetween += input[i][source.col];
            }
        }
        else {
            for (var i = source.row - 1; i >= target.row; i--) {
                distancesBetween += input[i][source.col];
            }
        }
    }
    return distancesBetween;
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

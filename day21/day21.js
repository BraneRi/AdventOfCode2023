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
        var fileStream, rl, graph, x, source, _d, rl_1, rl_1_1, line, e_1_1, distances, steps, viableGardenCoordinates;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    fileStream = fs.createReadStream(filePath);
                    rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity, // Treats each line as a separate data event
                    });
                    graph = new Map();
                    x = 0;
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
                    line.split("").forEach(function (c, index) {
                        if (c === "S")
                            source = { x: x, y: index };
                        if (c === ".")
                            graph.set(coordinateToKey({ x: x, y: index }), 1);
                    });
                    x++;
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
                    distances = dijkstra(graph, source);
                    steps = 64;
                    viableGardenCoordinates = Array.from(distances.entries()).filter(function (entry) {
                        return entry[1] <= steps && entry[1] % 2 == 0;
                    });
                    console.log(viableGardenCoordinates.length);
                    return [2 /*return*/];
            }
        });
    });
}
function coordinateToKey(coordinate) {
    return coordinate.x + "," + coordinate.y;
}
function keyToCoordinate(key) {
    var keyParts = key.split(",");
    return { x: Number(keyParts[0]), y: Number(keyParts[1]) };
}
function dijkstra(graph, source) {
    var distances = new Map();
    var Q = new PriorityQueue();
    Array.from(graph.keys()).forEach(function (coordinateKey) {
        distances.set(coordinateKey, Number.POSITIVE_INFINITY);
    });
    distances.set(coordinateToKey(source), 0);
    Q.enqueue(source, 0);
    while (!Q.isEmpty()) {
        var currentCoordinate = Q.dequeue();
        if (!currentCoordinate) {
            break;
        }
        var neigbours = getNeighbours(currentCoordinate, graph);
        for (var _i = 0, neigbours_1 = neigbours; _i < neigbours_1.length; _i++) {
            var neigbour = neigbours_1[_i];
            var newDistance = distances.get(coordinateToKey(currentCoordinate)) + 1;
            var oldDistance = distances.get(coordinateToKey(neigbour));
            if (oldDistance === undefined || newDistance < oldDistance) {
                distances.set(coordinateToKey(neigbour), newDistance);
                Q.enqueue(neigbour, newDistance);
            }
        }
    }
    return distances;
}
function getNeighbours(u, graph) {
    var neigbourCandidates = [
        { x: u.x - 1, y: u.y },
        { x: u.x + 1, y: u.y },
        { x: u.x, y: u.y - 1 },
        { x: u.x, y: u.y + 1 },
    ];
    neigbourCandidates = neigbourCandidates.filter(function (candidate) {
        return graph.has(coordinateToKey(candidate));
    });
    return neigbourCandidates;
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

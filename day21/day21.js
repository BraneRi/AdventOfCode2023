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
        var fileStream, rl, graph, x, source, _d, rl_1, rl_1_1, line, e_1_1, graphSize, steps, distances, viableGardenCoordinates;
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
                        if (c === "S") {
                            source = { x: x, y: index };
                            graph.set(coordinateToKey(source), 1);
                        }
                        if (c === ".") {
                            graph.set(coordinateToKey({ x: x, y: index }), 1);
                        }
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
                    graphSize = x;
                    steps = 500;
                    distances = dijkstra(graph, source, steps, graphSize, undefined);
                    viableGardenCoordinates = Array.from(distances.entries()).filter(function (entry) {
                        return entry[1] <= steps && entry[1] % 2 == 0;
                    });
                    console.log(viableGardenCoordinates.length);
                    return [2 /*return*/];
            }
        });
    });
}
function predictViableGardens(graph, source, steps, graphSize) {
    // Graph needs 3 adjacent graph paths, until numbers start to repeat with graph size difference
    var distancesFor4Graphs = dijkstra(graph, source, steps, graphSize, 4);
    var stableDiff = distancesFor4Graphs.get(coordinateToKey({ x: 0, y: 4 * graphSize })) -
        distancesFor4Graphs.get(coordinateToKey({ x: 0, y: 3 * graphSize }));
    console.log("STABLE DIFF: " + stableDiff);
    // 1. Calculate gardens in zero graph
    var zeroGardens = 0;
    for (var x = 0; x < graphSize; x++) {
        for (var y = 0; y < graphSize; y++) {
            var distance = distancesFor4Graphs.get(coordinateToKey({ x: x, y: y }));
            if (distance !== undefined && distance % 2 == 0) {
                zeroGardens++;
            }
        }
    }
    console.log(zeroGardens);
    // 2. Calculate gardens in adjacent graphs
    var adjacentGardens = 0;
    for (var x = graphSize; x < 2 * graphSize; x++) {
        for (var y = 0; y < graphSize; y++) {
            var distance = distancesFor4Graphs.get(coordinateToKey({ x: x, y: y }));
            if (distance !== undefined && distance % 2 == 0) {
                adjacentGardens++;
            }
        }
    }
    console.log(adjacentGardens);
    // for full grids, number of gardens will be ((FULL_GRIDS_NUM - 1) / 2) * adjacent_gardens + ((FULL_GRIDS_NUM - 1) / 2 + 1) * zero_gardens
    //
    // For top, left, bottom and right 3rd grid ->
    // 1. calculate max and min paths
    // 2. max + graph_size (x or y) * k <= steps -> k represents number of graphs after second one, that will have full grids => FULL_GRIDS_NUM = 3 + k
    // 3. min + graph_size (x or y) * l <= steps -> l represents number of graphs after second one, that will have both full and partial grids => k - l = partial graphs for this side
    //
    // Partial graphs repeat diagonally, but not taking into account one on main axis.
    // For each partial graph, calculate paths for one above and beyond and multiply them by number of their diagonal instances
    // RIGHT EDGE + full and partial graphs calculation
    var min = Number.POSITIVE_INFINITY;
    var max = Number.NEGATIVE_INFINITY;
    for (var x = 0; x < graphSize; x++) {
        for (var y = 3 * graphSize; y < 4 * graphSize; y++) {
            var coordinate = { x: x, y: y };
            var distance = distancesFor4Graphs.get(coordinateToKey(coordinate));
            if (distance && distance > max && distance % 2 == 0)
                max = distance;
            if (distance && distance < min && distance % 2 == 0)
                min = distance;
        }
    }
    // from 1 to k, same applies in other directions
    var fullGrids1Dimension = 3 + Math.floor((steps - max) / stableDiff) - 1;
    var fullAndPartialGrids1Dimension = 3 + Math.floor((steps - min) / stableDiff) + 1; // +1 to cover cases where min is not in the line with zero graph;
    var partialGraphs1Dimenesion = fullAndPartialGrids1Dimension - fullGrids1Dimension;
    console.log("Full:" + fullGrids1Dimension);
    console.log(fullAndPartialGrids1Dimension);
    console.log("Partial:" + partialGraphs1Dimenesion);
    var partialDiagonalsSum = 0;
    var partialGridMainAxisSum = 0;
    for (var i = fullGrids1Dimension; i <= fullAndPartialGrids1Dimension; i++) {
        console.log("------ grid = " + i + " ------");
        console.log("Main axis partials");
        // RIGHT EDGE
        var gardens = 0;
        for (var x = 0; x < graphSize; x++) {
            for (var y = 3 * graphSize; y < 4 * graphSize; y++) {
                var distance3 = distancesFor4Graphs.get(coordinateToKey({ x: x, y: y }));
                if (distance3 !== undefined &&
                    ((i % 2 == 0 && distance3 % 2 != 0) ||
                        (i % 2 != 0 && distance3 % 2 == 0)) &&
                    distance3 + stableDiff * (i - 3) <= steps) {
                    gardens++;
                }
            }
        }
        partialGridMainAxisSum += gardens;
        console.log("R:" + gardens);
        // LEFT EDGE
        var gardens = 0;
        for (var x = 0; x < graphSize; x++) {
            for (var y = -3 * graphSize; y < -2 * graphSize; y++) {
                var distance3 = distancesFor4Graphs.get(coordinateToKey({ x: x, y: y }));
                if (distance3 !== undefined &&
                    ((i % 2 == 0 && distance3 % 2 != 0) ||
                        (i % 2 != 0 && distance3 % 2 == 0)) &&
                    distance3 + stableDiff * (i - 3) <= steps) {
                    gardens++;
                }
            }
        }
        partialGridMainAxisSum += gardens;
        console.log("L:" + gardens);
        // UP EDGE
        var gardens = 0;
        for (var x = -3 * graphSize; x < -2 * graphSize; x++) {
            for (var y = 0; y < graphSize; y++) {
                var distance3 = distancesFor4Graphs.get(coordinateToKey({ x: x, y: y }));
                if (distance3 !== undefined &&
                    ((i % 2 == 0 && distance3 % 2 != 0) ||
                        (i % 2 != 0 && distance3 % 2 == 0)) &&
                    distance3 + stableDiff * (i - 3) <= steps) {
                    gardens++;
                }
            }
        }
        partialGridMainAxisSum += gardens;
        console.log("U:" + gardens);
        // DOWN EDGE
        var gardens = 0;
        for (var x = 3 * graphSize; x < 4 * graphSize; x++) {
            for (var y = 0; y < graphSize; y++) {
                var distance3 = distancesFor4Graphs.get(coordinateToKey({ x: x, y: y }));
                if (distance3 !== undefined &&
                    ((i % 2 == 0 && distance3 % 2 != 0) ||
                        (i % 2 != 0 && distance3 % 2 == 0)) &&
                    distance3 + stableDiff * (i - 3) <= steps) {
                    gardens++;
                }
            }
        }
        partialGridMainAxisSum += gardens;
        console.log("D:" + gardens);
        console.log("Diagonal partials");
        // RIGHT UP
        var gardens = 0;
        for (var x = -1 * graphSize; x < 0; x++) {
            for (var y = 3 * graphSize; y < 4 * graphSize; y++) {
                var distance3 = distancesFor4Graphs.get(coordinateToKey({ x: x, y: y }));
                if (distance3 !== undefined &&
                    ((i % 2 == 0 && distance3 % 2 != 0) ||
                        (i % 2 != 0 && distance3 % 2 == 0)) &&
                    distance3 + stableDiff * (i - 3) <= steps) {
                    gardens++;
                }
            }
        }
        // multiply diagonals
        gardens = i * gardens;
        partialDiagonalsSum += gardens;
        console.log("R up:" + gardens);
        // RIGHT DOWN
        var gardens = 0;
        for (var x = graphSize; x < 2 * graphSize; x++) {
            for (var y = 3 * graphSize; y < 4 * graphSize; y++) {
                var distance3 = distancesFor4Graphs.get(coordinateToKey({ x: x, y: y }));
                if (distance3 !== undefined &&
                    ((i % 2 == 0 && distance3 % 2 != 0) ||
                        (i % 2 != 0 && distance3 % 2 == 0)) &&
                    distance3 + stableDiff * (i - 3) <= steps) {
                    gardens++;
                }
            }
        }
        // multiply diagonals
        gardens = i * gardens;
        partialDiagonalsSum += gardens;
        console.log("R down:" + gardens);
        // LEFT UP
        var gardens = 0;
        for (var x = -1 * graphSize; x < 0; x++) {
            for (var y = -3 * graphSize; y < -2 * graphSize; y++) {
                var distance3 = distancesFor4Graphs.get(coordinateToKey({ x: x, y: y }));
                if (distance3 !== undefined &&
                    ((i % 2 == 0 && distance3 % 2 != 0) ||
                        (i % 2 != 0 && distance3 % 2 == 0)) &&
                    distance3 + stableDiff * (i - 3) <= steps) {
                    gardens++;
                }
            }
        }
        // multiply diagonals
        gardens = i * gardens;
        partialDiagonalsSum += gardens;
        console.log("L up:" + gardens);
        // LEFT DOWN
        var gardens = 0;
        for (var x = graphSize; x < 2 * graphSize; x++) {
            for (var y = -3 * graphSize; y < -2 * graphSize; y++) {
                var distance3 = distancesFor4Graphs.get(coordinateToKey({ x: x, y: y }));
                if (distance3 !== undefined &&
                    ((i % 2 == 0 && distance3 % 2 != 0) ||
                        (i % 2 != 0 && distance3 % 2 == 0)) &&
                    distance3 + stableDiff * (i - 3) <= steps) {
                    gardens++;
                }
            }
        }
        // multiply diagonals
        gardens = i * gardens;
        partialDiagonalsSum += gardens;
        console.log("L down:" + gardens);
    }
    // Finally SOLUTION = FULL_GRID_GARDENS + diagonal_partial_grid_gardens_sum + partial_grid_gardens_sum
    var fullGridGardensSum = 0;
    var lineFactor = 3;
    for (var fulls = 1; fulls < fullGrids1Dimension; fulls++) {
        fullGridGardensSum += lineFactor;
        lineFactor += 2;
    }
    fullGridGardensSum = fullGridGardensSum * 2 + (lineFactor - 2);
    console.log("Number of full grids:" + fullGridGardensSum);
    var zeroAdjacentDiff = (fullGrids1Dimension - 1) * 2 - 1;
    console.log("zeroAdjacentDiff:" + zeroAdjacentDiff);
    var fewerFullGrids = (fullGridGardensSum - zeroAdjacentDiff) / 2;
    var moreFullGrids = fewerFullGrids + zeroAdjacentDiff;
    console.log("More full grids:" + moreFullGrids);
    console.log("Fewer full grids:" + fewerFullGrids);
    var fullGridGardens;
    if (fullGrids1Dimension % 2 == 0) {
        // more zero type fullgrids
        fullGridGardens =
            fewerFullGrids * adjacentGardens + moreFullGrids * zeroGardens;
    }
    else {
        // more adjacent type full grids
        fullGridGardens =
            moreFullGrids * adjacentGardens + fewerFullGrids * zeroGardens;
    }
    console.log("------");
    console.log(fullGridGardens);
    console.log(partialDiagonalsSum);
    console.log(partialGridMainAxisSum);
    return fullGridGardens + partialDiagonalsSum + partialGridMainAxisSum;
}
function visualizeDistances(distances, graphSize, gridRepeats) {
    if (gridRepeats === void 0) { gridRepeats = 1; }
    for (var x = -1 * graphSize * gridRepeats; x < graphSize * (gridRepeats + 1); x++) {
        if (x % graphSize == 0) {
            console.log();
        }
        for (var y = -1 * graphSize * gridRepeats; y < graphSize * (gridRepeats + 1); y++) {
            if (y % graphSize == 0) {
                process.stdout.write(" |");
            }
            var coordinate = { x: x, y: y };
            var distance = distances.get(coordinateToKey(coordinate));
            if (distance !== undefined && distance % 2 == 0) {
                process.stdout.write(String(distance).padStart(2, " "));
                // process.stdout.write(" O");
            }
            else if (distance !== undefined) {
                process.stdout.write(" .");
            }
            else {
                process.stdout.write(" #");
            }
        }
        console.log();
    }
}
function coordinateToKey(coordinate) {
    return coordinate.x + "," + coordinate.y;
}
function dijkstra(graph, source, steps, graphSize, gridsLimit) {
    var distances = new Map();
    var Q = new PriorityQueue();
    distances.set(coordinateToKey(source), 0);
    Q.enqueue(source, 0);
    while (!Q.isEmpty()) {
        var currentCoordinate = Q.dequeue();
        if (!currentCoordinate) {
            break;
        }
        var neigbours = getNeighbours(currentCoordinate, graph, graphSize);
        for (var _i = 0, neigbours_1 = neigbours; _i < neigbours_1.length; _i++) {
            var neigbour = neigbours_1[_i];
            var newDistance = distances.get(coordinateToKey(currentCoordinate)) + 1;
            var oldDistance = distances.get(coordinateToKey(neigbour));
            // grids limit check is used for part 2, if checking part 1, consider gridsLimit === undefined
            if (((gridsLimit !== undefined &&
                neigbour.x < (gridsLimit + 1) * graphSize &&
                neigbour.x >= -1 * gridsLimit * graphSize &&
                neigbour.y < (gridsLimit + 1) * graphSize &&
                neigbour.y >= -1 * gridsLimit * graphSize &&
                newDistance <= steps) ||
                (gridsLimit === undefined && newDistance <= steps)) &&
                (oldDistance === undefined || newDistance < oldDistance)) {
                distances.set(coordinateToKey(neigbour), newDistance);
                Q.enqueue(neigbour, newDistance);
            }
        }
    }
    return distances;
}
// takes into account negative numbers as well
function properModulo(dividend, divisor) {
    return ((dividend % divisor) + divisor) % divisor;
}
// In part two getting neigbours must respect infinite graph :)
function getNeighbours(u, graph, graphSize) {
    var neigbourCandidates = [
        { x: u.x - 1, y: u.y },
        { x: u.x + 1, y: u.y },
        { x: u.x, y: u.y - 1 },
        { x: u.x, y: u.y + 1 },
    ];
    neigbourCandidates = neigbourCandidates.filter(function (candidate) {
        return isPartOfInfiniteGraph(candidate, graph, graphSize);
    });
    // console.log(neigbourCandidates);
    return neigbourCandidates;
}
function isPartOfInfiniteGraph(candidate, graph, graphSize) {
    return graph.has(coordinateToKey({
        x: properModulo(candidate.x, graphSize),
        y: properModulo(candidate.y, graphSize),
    }));
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

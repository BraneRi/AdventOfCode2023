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
function pathToKey(p) {
    return p.row + "," + p.column;
}
function keyToPath(p) {
    var elements = p.split(",");
    return {
        row: Number.parseInt(elements[0]),
        column: Number.parseInt(elements[1]),
    };
}
function processFile(filePath) {
    var _a, e_1, _b, _c;
    var _d;
    return __awaiter(this, void 0, void 0, function () {
        var fileStream, rl, island, row, startingColumn, _e, rl_1, rl_1_1, line, lineElements, e_1_1, finish, nodes, connections, result;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    fileStream = fs.createReadStream(filePath);
                    rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity, // Treats each line as a separate data event
                    });
                    island = new Map();
                    row = 0;
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 6, 7, 12]);
                    _e = true, rl_1 = __asyncValues(rl);
                    _f.label = 2;
                case 2: return [4 /*yield*/, rl_1.next()];
                case 3:
                    if (!(rl_1_1 = _f.sent(), _a = rl_1_1.done, !_a)) return [3 /*break*/, 5];
                    _c = rl_1_1.value;
                    _e = false;
                    line = _c;
                    lineElements = line.split("");
                    lineElements.forEach(function (pathType, index) {
                        if (row == 0 && pathType == WALK)
                            startingColumn = index;
                        island.set(pathToKey({ row: row, column: index }), pathType);
                    });
                    row++;
                    _f.label = 4;
                case 4:
                    _e = true;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _f.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _f.trys.push([7, , 10, 11]);
                    if (!(!_e && !_a && (_b = rl_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _b.call(rl_1)];
                case 8:
                    _f.sent();
                    _f.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    finish = keyToPath((_d = Array.from(island.entries()).find(function (e) { return keyToPath(e[0]).row == row - 1 && e[1] != FOREST; })) === null || _d === void 0 ? void 0 : _d[0]);
                    nodes = generateNodes({ row: 0, column: startingColumn }, finish, island);
                    console.log(nodes);
                    connections = generateConnections(nodes, island);
                    console.log(connections);
                    console.log("traversing graph");
                    result = longestPath(connections);
                    console.log("Done");
                    console.log(result);
                    return [2 /*return*/];
            }
        });
    });
}
function longestPath(connections, currentNodeId, visitedNodes) {
    if (currentNodeId === void 0) { currentNodeId = 0; }
    if (visitedNodes === void 0) { visitedNodes = new Map(); }
    // id = 1 for finish node
    if (currentNodeId == 1)
        return 0;
    var optionConnections = connections.filter(function (c) {
        return ((c.id1 == currentNodeId && !visitedNodes.has(c.id2)) ||
            (c.id2 == currentNodeId && !visitedNodes.has(c.id1)));
    });
    visitedNodes.set(currentNodeId, true);
    return optionConnections.reduce(function (max, connection) {
        return Math.max(max, 1 +
            connection.steps +
            longestPath(connections, connection.id1 == currentNodeId ? connection.id2 : connection.id1, new Map(visitedNodes)));
    }, 0);
}
function generateConnections(nodes, island) {
    var connections = [];
    var visited = new Map();
    nodes.forEach(function (node) {
        visited.set(pathToKey(node.path), true);
        var options = getOptions(node.path, island, visited);
        options.forEach(function (option) {
            var connection = findNode(node.id, option, nodes.filter(function (n) { return n != node; }), island, visited);
            if (connection) {
                connections.push(connection);
            }
        });
    });
    return connections;
}
function getOptions(path, island, visited) {
    var options = [];
    for (var _i = 0, _a = [
        { rowStep: 1, columnStep: 0 },
        { rowStep: 0, columnStep: 1 },
        { rowStep: -1, columnStep: 0 },
        { rowStep: 0, columnStep: -1 },
    ]; _i < _a.length; _i++) {
        var steps = _a[_i];
        var optionPath = {
            row: path.row + steps.rowStep,
            column: path.column + steps.columnStep,
        };
        var optionPathType = island.get(pathToKey(optionPath));
        if (optionPathType &&
            optionPathType != FOREST &&
            !visited.has(pathToKey(optionPath))) {
            options.push(optionPath);
        }
    }
    return options;
}
function findNode(id1, optionPath, nodes, island, visited) {
    var currentPath = optionPath;
    var steps = 0;
    visited.set(pathToKey(currentPath), true);
    var nodeCandidate = undefined;
    while (!nodeCandidate) {
        nodeCandidate = reachedNode(currentPath, nodes);
        if (nodeCandidate)
            break;
        steps += 1;
        var newCurrent = getOptions(currentPath, island, visited)[0];
        if (!newCurrent) {
            // we ignore visited paths if reached node
            // we need to know which node is it
            var nodeOptions = getOptions(currentPath, island, new Map());
            nodeCandidate = nodeOptions
                .map(function (n) { return reachedNode(n, nodes); })
                .filter(function (n) { return n != undefined; })[0];
            break;
        }
        currentPath = newCurrent;
        visited.set(pathToKey(currentPath), true);
    }
    if (!nodeCandidate)
        return undefined;
    return { steps: steps, id1: id1, id2: nodeCandidate.id };
}
function reachedNode(path, nodes) {
    return nodes.find(function (node) { return node.path.row == path.row && node.path.column == path.column; });
}
function generateNodes(start, finish, island) {
    // add start and finish
    var nodes = [
        { path: start, id: 0 },
        { path: finish, id: 1 },
    ];
    var nodeIdCounter = 1;
    Array.from(island.entries()).forEach(function (e) {
        if (e[1] != FOREST) {
            var path = keyToPath(e[0]);
            var optionCount = 0;
            for (var _i = 0, _a = [
                { rowStep: 1, columnStep: 0 },
                { rowStep: 0, columnStep: 1 },
                { rowStep: -1, columnStep: 0 },
                { rowStep: 0, columnStep: -1 },
            ]; _i < _a.length; _i++) {
                var steps = _a[_i];
                var optionCandidate = island.get(pathToKey({
                    row: path.row + steps.rowStep,
                    column: path.column + steps.columnStep,
                }));
                if (optionCandidate && optionCandidate != FOREST) {
                    optionCount++;
                }
            }
            if (optionCount > 2) {
                nodeIdCounter += 1;
                nodes.push({ path: path, id: nodeIdCounter });
            }
        }
    });
    return nodes;
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

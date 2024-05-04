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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var fs = require("fs");
function processFile(filePath) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var fileStream, rl, connections, keys, _loop_1, _d, rl_1, rl_1_1, e_1_1, graph, connCount, _i, _e, key, paths, _f, _g, _h, key_1, keyPaths, pathValues, i, one, two, countKey, count, keysToRemove, c1Parts, c1, c2Parts, c2, c3Parts, c3;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    fileStream = fs.createReadStream(filePath);
                    rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity, // Treats each line as a separate data event
                    });
                    connections = new Set();
                    keys = new Set();
                    _j.label = 1;
                case 1:
                    _j.trys.push([1, 6, 7, 12]);
                    _loop_1 = function () {
                        _c = rl_1_1.value;
                        _d = false;
                        var line = _c;
                        var lineParts = line.split(":");
                        var key = lineParts[0].trim();
                        var connectedNodes = lineParts[1].trim().split(/\s+/);
                        connectedNodes.forEach(function (connectedNode) {
                            keys.add(key);
                            keys.add(connectedNode);
                            var sortedKeys = [key, connectedNode].sort();
                            connections.add({ one: sortedKeys[0], two: sortedKeys[1] });
                        });
                    };
                    _d = true, rl_1 = __asyncValues(rl);
                    _j.label = 2;
                case 2: return [4 /*yield*/, rl_1.next()];
                case 3:
                    if (!(rl_1_1 = _j.sent(), _a = rl_1_1.done, !_a)) return [3 /*break*/, 5];
                    _loop_1();
                    _j.label = 4;
                case 4:
                    _d = true;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _j.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _j.trys.push([7, , 10, 11]);
                    if (!(!_d && !_a && (_b = rl_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _b.call(rl_1)];
                case 8:
                    _j.sent();
                    _j.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    graph = getConnectionGraph(connections);
                    connCount = new Map();
                    for (_i = 0, _e = Array.from(keys); _i < _e.length; _i++) {
                        key = _e[_i];
                        paths = dijkstra(key, graph);
                        for (_f = 0, _g = Array.from(paths.entries()); _f < _g.length; _f++) {
                            _h = _g[_f], key_1 = _h[0], keyPaths = _h[1];
                            pathValues = Array.from(keyPaths);
                            for (i = 0; i < pathValues.length - 1; i++) {
                                one = pathValues[i];
                                two = pathValues[i + 1];
                                countKey = getConnKey(one, two);
                                count = connCount.get(countKey);
                                if (count) {
                                    connCount.set(countKey, count + 1);
                                }
                                else {
                                    connCount.set(countKey, 1);
                                }
                            }
                        }
                    }
                    keysToRemove = getTopThree(connCount);
                    c1Parts = keysToRemove[0][0].toString().split(",");
                    c1 = { one: c1Parts[0], two: c1Parts[1] };
                    c2Parts = keysToRemove[1][0].toString().split(",");
                    c2 = { one: c2Parts[0], two: c2Parts[1] };
                    c3Parts = keysToRemove[2][0].toString().split(",");
                    c3 = { one: c3Parts[0], two: c3Parts[1] };
                    console.log(c1, c2, c3);
                    areTwoGroups(keys, filterConnections(connections, c1, c2, c3));
                    return [2 /*return*/];
            }
        });
    });
}
function getTopThree(connCount) {
    var sortedEntries = Array.from(connCount.entries()).sort(function (a, b) { return b[1] - a[1]; });
    var topThree = sortedEntries.slice(0, 3);
    return topThree;
}
function dijkstra(key, graph) {
    var paths = new Map();
    var visited = new Set();
    var queue = [];
    queue.push([key, [key]]);
    while (queue.length > 0) {
        var _a = queue.shift(), currentNode = _a[0], currentPath = _a[1];
        visited.add(currentNode);
        for (var _i = 0, _b = Array.from(graph.get(currentNode)); _i < _b.length; _i++) {
            var neighbor = _b[_i];
            var newPath = __spreadArray(__spreadArray([], currentPath, true), [neighbor], false);
            if (neighbor == key || currentPath.includes(neighbor))
                continue;
            if (!paths.has(neighbor)) {
                paths.set(neighbor, [newPath]);
            }
            else {
                paths.get(neighbor).push(newPath);
            }
            if (!visited.has(neighbor)) {
                queue.push([neighbor, newPath]);
            }
        }
    }
    var shortestPaths = new Map();
    for (var _c = 0, _d = Array.from(paths); _c < _d.length; _c++) {
        var _e = _d[_c], key_2 = _e[0], path = _e[1];
        shortestPaths.set(key_2, path[0]);
    }
    return shortestPaths;
}
function getConnectionGraph(connections) {
    var graph = new Map();
    for (var _i = 0, _a = Array.from(connections); _i < _a.length; _i++) {
        var connection = _a[_i];
        if (!graph.has(connection.one)) {
            graph.set(connection.one, new Set());
        }
        if (!graph.has(connection.two)) {
            graph.set(connection.two, new Set());
        }
        graph.get(connection.one).add(connection.two);
        graph.get(connection.two).add(connection.one);
    }
    return graph;
}
function filterConnections(connections) {
    var elementsToRemove = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        elementsToRemove[_i - 1] = arguments[_i];
    }
    var filteredConnections = new Set(connections); // Create a copy of the original set
    Array.from(filteredConnections).forEach(function (c) {
        Array.from(elementsToRemove).forEach(function (e) {
            if (c.one == e.one && c.two == e.two) {
                filteredConnections.delete(c);
            }
        });
    });
    return filteredConnections;
}
function getConnKey(key1, key2) {
    var sortedKeys = [key1, key2].sort();
    return sortedKeys.join(",");
}
function areTwoGroups(keys, connections) {
    // console.log("Initial connections:", connections);
    var current = Array.from(keys)[0];
    var passingKeys = [current];
    var foundKeys = new Set([current]);
    while (passingKeys.length > 0) {
        current = passingKeys.shift();
        // console.log("Finding all connections of:", current);
        var _a = getAllConnectionsForKey(current, connections), newFoundKeys = _a.newFoundKeys, newConnections = _a.newConnections;
        // console.log(newConnections);
        newFoundKeys.forEach(function (k) {
            if (!foundKeys.has(k)) {
                passingKeys.push(k);
            }
            foundKeys.add(k);
        });
        connections = newConnections;
    }
    if (foundKeys.size < keys.size) {
        console.log("Found two groups!");
        console.log("Group 1:", Array.from(foundKeys).sort(), foundKeys.size);
        var remainingKeys_1 = new Set();
        keys.forEach(function (k) {
            if (!foundKeys.has(k)) {
                remainingKeys_1.add(k);
            }
        });
        console.log("Group 2:", Array.from(remainingKeys_1).sort(), remainingKeys_1.size);
        console.log("Group 1 x Group 2:", foundKeys.size * remainingKeys_1.size);
    }
    else {
        // console.log("Still one group after removal");
    }
    return foundKeys.size < keys.size;
}
function getAllConnectionsForKey(key, connections) {
    var newConnections = new Set(connections);
    var newFoundKeys = new Set();
    connections.forEach(function (c) {
        if (c.one == key) {
            newFoundKeys.add(c.two);
            newConnections.delete(c);
        }
        else if (c.two == key) {
            newFoundKeys.add(c.one);
            newConnections.delete(c);
        }
    });
    return { newFoundKeys: newFoundKeys, newConnections: newConnections };
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

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
        var fileStream, rl, bricks, _d, rl_1, rl_1_1, line, startEnd, _e, startX, startY, startZ, _f, endX, endY, endZ, e_1_1, bricksOnTop, supportedBricks, keys, i, key, valuesForKey, _i, valuesForKey_1, value, numberOfValue, cannotBeDestroyedKeys, i, key, valuesForKey, _g, valuesForKey_2, value, numberOfValue, sum, topOnes;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    fileStream = fs.createReadStream(filePath);
                    rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity, // Treats each line as a separate data event
                    });
                    bricks = [];
                    _h.label = 1;
                case 1:
                    _h.trys.push([1, 6, 7, 12]);
                    _d = true, rl_1 = __asyncValues(rl);
                    _h.label = 2;
                case 2: return [4 /*yield*/, rl_1.next()];
                case 3:
                    if (!(rl_1_1 = _h.sent(), _a = rl_1_1.done, !_a)) return [3 /*break*/, 5];
                    _c = rl_1_1.value;
                    _d = false;
                    line = _c;
                    startEnd = line.split("~");
                    _e = startEnd[0].split(",").map(Number), startX = _e[0], startY = _e[1], startZ = _e[2];
                    _f = startEnd[1].split(",").map(Number), endX = _f[0], endY = _f[1], endZ = _f[2];
                    bricks.push({
                        start: { x: startX, y: startY, z: startZ },
                        end: { x: endX, y: endY, z: endZ },
                    });
                    _h.label = 4;
                case 4:
                    _d = true;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _h.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _h.trys.push([7, , 10, 11]);
                    if (!(!_d && !_a && (_b = rl_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _b.call(rl_1)];
                case 8:
                    _h.sent();
                    _h.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    // sort them from lowest to highest
                    bricks = bricks.sort(function (a, b) { return Math.min(a.start.z, a.end.z) - Math.min(b.start.z, b.end.z); });
                    bricksOnTop = new Map();
                    freeFall(bricks, bricksOnTop);
                    supportedBricks = new Map();
                    keys = Array.from(bricksOnTop.keys());
                    for (i = 0; i < keys.length; i++) {
                        key = keys[i];
                        valuesForKey = bricksOnTop.get(key);
                        for (_i = 0, valuesForKey_1 = valuesForKey; _i < valuesForKey_1.length; _i++) {
                            value = valuesForKey_1[_i];
                            numberOfValue = supportedBricks.get(value);
                            if (numberOfValue) {
                                supportedBricks.set(value, numberOfValue + 1);
                            }
                            else {
                                supportedBricks.set(value, 1);
                            }
                        }
                    }
                    cannotBeDestroyedKeys = new Set();
                    for (i = 0; i < keys.length; i++) {
                        key = keys[i];
                        valuesForKey = bricksOnTop.get(key);
                        for (_g = 0, valuesForKey_2 = valuesForKey; _g < valuesForKey_2.length; _g++) {
                            value = valuesForKey_2[_g];
                            numberOfValue = supportedBricks.get(value);
                            if (numberOfValue == 1) {
                                cannotBeDestroyedKeys.add(key);
                                break;
                            }
                        }
                    }
                    sum = 0;
                    console.log(supportedBricks);
                    cannotBeDestroyedKeys.forEach(function (key) {
                        alreadyDestroyed.clear();
                        var currentChain = countChainBricks(key, bricksOnTop, new Map(supportedBricks)) - 1;
                        // console.log(currentChain);
                        sum += currentChain;
                        console.log("---------------------");
                    });
                    // 16269
                    // 27454 - too low
                    // 43246 - not correct
                    // 102227 - too high
                    // 103102 - too hgh
                    console.log("Part two: " + sum);
                    console.log("cannotBeDestroyed: " + cannotBeDestroyedKeys.size);
                    topOnes = bricks.filter(function (_, index) { return !bricksOnTop.has(index); }).length;
                    // not even using top ones if we count cannot's
                    console.log("There are " + topOnes + " bricks on top");
                    console.log("We can destroy " + (bricks.length - cannotBeDestroyedKeys.size) + " bricks");
                    return [2 /*return*/];
            }
        });
    });
}
var alreadyDestroyed = new Set();
function countChainBricks(currentKey, bricksOnTop, supportedBricks) {
    console.log("key: " + currentKey);
    var supportedKeys = bricksOnTop.get(currentKey);
    console.log("supportedKeys: " + supportedKeys);
    if (!supportedKeys) {
        console.log("dodajem 1 za top key: " + currentKey);
        return 1;
    }
    console.log("dodajem 1 za: " + currentKey);
    var sum = 1;
    for (var _i = 0, supportedKeys_1 = supportedKeys; _i < supportedKeys_1.length; _i++) {
        var key = supportedKeys_1[_i];
        var bricksSupporting = supportedBricks.get(key) - 1;
        supportedBricks.set(key, bricksSupporting);
        if (!alreadyDestroyed.has(key)) {
            if (bricksSupporting == 0) {
                alreadyDestroyed.add(key);
                console.log("Ulazim u novi chain za: " + key);
                sum += countChainBricks(key, bricksOnTop, supportedBricks);
            }
            else {
                console.log("Netko drugi drzi za ovog: " + key);
            }
        }
    }
    return sum;
}
function freeFall(bricks, bricksOnTop) {
    var index = 0;
    // key is coordinate and value is how high we reached on that coordinate, with coordinate of brick occupying it
    var tallestCoordinates = new Map();
    for (var _i = 0, bricks_1 = bricks; _i < bricks_1.length; _i++) {
        var brick = bricks_1[_i];
        if (brick.start.z == brick.end.z) {
            resolveHorizontalBricks(brick, tallestCoordinates, bricksOnTop, index);
        }
        else {
            resolveVerticalBricks(brick, tallestCoordinates, bricksOnTop, index);
        }
        index++;
    }
}
function coordinate2DtoKey(coordinate2D) {
    return coordinate2D.x + "," + coordinate2D.y;
}
function resolveHorizontalBricks(brick, tallestCoordinates, bricksOnTop, index) {
    var tallestBelowList = [];
    for (var _i = 0, _a = coordinates(brick); _i < _a.length; _i++) {
        var coordinate2D = _a[_i];
        var currentBelow = tallestCoordinates.get(coordinate2DtoKey(coordinate2D));
        if (currentBelow &&
            (!tallestBelowList.length ||
                currentBelow.height > tallestBelowList[0].height)) {
            tallestBelowList = [currentBelow];
        }
        else if (currentBelow &&
            currentBelow.height === tallestBelowList[0].height) {
            tallestBelowList.push(currentBelow);
        }
    }
    // remove duplicates that have same id
    tallestBelowList = tallestBelowList.reduce(function (acc, curr) {
        if (!acc.some(function (item) { return item.id === curr.id; })) {
            acc.push(curr);
        }
        return acc;
    }, []);
    if (tallestBelowList.length) {
        for (var _b = 0, tallestBelowList_1 = tallestBelowList; _b < tallestBelowList_1.length; _b++) {
            var tallestBelow = tallestBelowList_1[_b];
            updateBricksOnTop(bricksOnTop, tallestBelow, index);
        }
        for (var _c = 0, _d = coordinates(brick); _c < _d.length; _c++) {
            var coordinate2D = _d[_c];
            tallestCoordinates.set(coordinate2DtoKey(coordinate2D), {
                id: index,
                height: tallestBelowList[0].height + 1, // we know height is 1 because it is horizontal brick
            });
        }
    }
    else {
        for (var _e = 0, _f = coordinates(brick); _e < _f.length; _e++) {
            var coordinate2D = _f[_e];
            tallestCoordinates.set(coordinate2DtoKey(coordinate2D), {
                id: index,
                height: 1,
            });
        }
    }
}
function updateBricksOnTop(bricksOnTop, tallestBelow, index) {
    var topBricks = bricksOnTop.get(tallestBelow.id);
    if (topBricks) {
        bricksOnTop.set(tallestBelow.id, __spreadArray(__spreadArray([], topBricks, true), [index], false));
    }
    else {
        bricksOnTop.set(tallestBelow.id, [index]);
    }
}
function resolveVerticalBricks(brick, tallestCoordinates, bricksOnTop, index) {
    var lowestSection;
    var highestSection;
    if (brick.start.z < brick.end.z) {
        lowestSection = brick.start;
        highestSection = brick.end;
    }
    else {
        highestSection = brick.start;
        lowestSection = brick.end;
    }
    // we know there can be only one tallest below because it is vertical brick
    var tallestBelow = tallestCoordinates.get(coordinate2DtoKey({
        x: lowestSection.x,
        y: lowestSection.y,
    }));
    if (tallestBelow) {
        updateBricksOnTop(bricksOnTop, tallestBelow, index);
        tallestCoordinates.set(coordinate2DtoKey({ x: lowestSection.x, y: lowestSection.y }), {
            id: index,
            height: tallestBelow.height + highestSection.z - lowestSection.z + 1,
        });
    }
    else {
        tallestCoordinates.set(coordinate2DtoKey({ x: lowestSection.x, y: lowestSection.y }), { id: index, height: highestSection.z - lowestSection.z + 1 });
    }
}
function coordinates(brick) {
    var result = [];
    for (var x = brick.start.x; x <= brick.end.x; x++) {
        for (var y = brick.start.y; y <= brick.end.y; y++) {
            result.push({ x: x, y: y });
        }
    }
    return result;
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

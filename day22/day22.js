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
        var fileStream, rl, bricks, _d, rl_1, rl_1_1, line, startEnd, _e, startX, startY, startZ, _f, endX, endY, endZ, e_1_1, bricksOnTop;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    fileStream = fs.createReadStream(filePath);
                    rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity, // Treats each line as a separate data event
                    });
                    bricks = [];
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 6, 7, 12]);
                    _d = true, rl_1 = __asyncValues(rl);
                    _g.label = 2;
                case 2: return [4 /*yield*/, rl_1.next()];
                case 3:
                    if (!(rl_1_1 = _g.sent(), _a = rl_1_1.done, !_a)) return [3 /*break*/, 5];
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
                    _g.label = 4;
                case 4:
                    _d = true;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _g.trys.push([7, , 10, 11]);
                    if (!(!_d && !_a && (_b = rl_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _b.call(rl_1)];
                case 8:
                    _g.sent();
                    _g.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    // sort them from lowest to highest
                    bricks = bricks.sort(function (a, b) { return a.start.z - b.end.z; });
                    bricksOnTop = new Map();
                    freeFall(bricks, bricksOnTop);
                    console.log(bricksOnTop);
                    return [2 /*return*/];
            }
        });
    });
}
function freeFall(bricks, bricksOnTop) {
    bricksOnTop.set(1, [1]);
    var index = 1;
    // key is coordinate and value is how high we reached on that coordinate, with coordinate of brick occupying it
    var tallestCoordinates = new Map();
    for (var _i = 0, bricks_1 = bricks; _i < bricks_1.length; _i++) {
        var brick = bricks_1[_i];
        if (brick.start.z == brick.start.z) {
            resolveHorizontalBricks(brick, tallestCoordinates, bricksOnTop, index);
        }
        else {
            resolveVerticalBricks(brick, tallestCoordinates, bricksOnTop, index);
        }
        index++;
    }
}
function resolveHorizontalBricks(brick, tallestCoordinates, bricksOnTop, index) {
    var tallestBelow = { id: -1, height: 0 };
    for (var _i = 0, _a = coordinates(brick); _i < _a.length; _i++) {
        var coordinate2D = _a[_i];
        var currentBelow = tallestCoordinates.get(coordinate2D);
        if (currentBelow && currentBelow.height > tallestBelow.height) {
            tallestBelow = currentBelow;
        }
    }
    if (tallestBelow.id != -1) {
        var topBricks = bricksOnTop.get(tallestBelow.id);
        if (topBricks) {
            topBricks.push(index);
        }
        else {
            bricksOnTop.set(tallestBelow.id, [index]);
        }
        for (var _b = 0, _c = coordinates(brick); _b < _c.length; _b++) {
            var coordinate2D = _c[_b];
            tallestCoordinates.set(coordinate2D, {
                id: index,
                height: tallestBelow.height + 1,
            });
        }
    }
    else {
        for (var _d = 0, _e = coordinates(brick); _d < _e.length; _d++) {
            var coordinate2D = _e[_d];
            tallestCoordinates.set(coordinate2D, {
                id: index,
                height: 1,
            });
        }
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
    var tallestBelow = tallestCoordinates.get({
        x: lowestSection.x,
        y: lowestSection.y,
    });
    if (tallestBelow) {
        var topBricks = bricksOnTop.get(tallestBelow.id);
        if (topBricks) {
            topBricks.push(index);
        }
        else {
            bricksOnTop.set(tallestBelow.id, [index]);
        }
        tallestCoordinates.set({ x: lowestSection.x, y: lowestSection.y }, {
            id: index,
            height: tallestBelow.height + highestSection.z - lowestSection.z,
        });
    }
    else {
        tallestCoordinates.set({ x: lowestSection.x, y: lowestSection.y }, { id: index, height: highestSection.z - lowestSection.z });
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

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
function seedEnd(seed) {
    return seed.start + seed.length - 1;
}
var Range = /** @class */ (function () {
    function Range(start, end, destDiff) {
        this.start = start;
        this.end = end;
        this.destDiff = destDiff;
    }
    // if range contains seed
    Range.prototype.contains = function (input) {
        return this.start <= input.start && this.end >= seedEnd(input);
    };
    // if seed is outside range
    Range.prototype.outside = function (input) {
        return this.end < input.start || this.start > seedEnd(input);
    };
    // if seed intersects range from left side
    Range.prototype.intersectsFromLeft = function (input) {
        return input.start <= this.start && this.start <= seedEnd(input);
    };
    // if seed intersects range from right side
    Range.prototype.intersectsFromRight = function (input) {
        return this.start <= input.start && input.start <= this.end;
    };
    Range.prototype.output = function (input) {
        return input + this.destDiff;
    };
    return Range;
}());
var Category = /** @class */ (function () {
    function Category() {
        this.ranges = [];
    }
    Category.prototype.add = function (range) {
        this.ranges.push(range);
    };
    Category.prototype.output = function (input) {
        var newSeeds = [];
        // console.log("ranges: ");
        // console.log(this.ranges);
        for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
            var seed = input_1[_i];
            var hasMatch = false;
            for (var _a = 0, _b = this.ranges; _a < _b.length; _a++) {
                var range = _b[_a];
                if (range.contains(seed)) {
                    hasMatch = true;
                    // console.log("Contains");
                    newSeeds.push({
                        start: range.output(seed.start),
                        length: seed.length,
                    });
                }
                else if (range.intersectsFromLeft(seed)) {
                    hasMatch = true;
                    // console.log("From left");
                    input.push({
                        start: seed.start,
                        length: range.start - seed.start,
                    });
                    newSeeds.push({
                        start: range.output(range.start),
                        length: seedEnd(seed) - range.start + 1,
                    });
                }
                else if (range.intersectsFromRight(seed)) {
                    hasMatch = true;
                    // console.log("From right");
                    input.push({
                        start: range.end + 1,
                        length: seedEnd(seed) - (range.end + 1) + 1,
                    });
                    newSeeds.push({
                        start: range.output(seed.start),
                        length: range.end - seed.start + 1,
                    });
                }
            }
            if (hasMatch == false) {
                // console.log("Outside all ranges");
                newSeeds.push({ start: seed.start, length: seed.length });
            }
        }
        return newSeeds;
    };
    return Category;
}());
function processFile(filePath) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var fileStream, rl, seedLineNumbers, seeds, numbersRegex, categories, currentCategory, lineNumbers, _d, rl_1, rl_1_1, line, seedsMatch, i, startSeed, seedLength, lineNumbersMatch, dest, source, length_1, e_1_1, minLocation, currentSeeds;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    fileStream = fs.createReadStream(filePath);
                    rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity, // Treats each line as a separate data event
                    });
                    seedLineNumbers = [];
                    seeds = [];
                    numbersRegex = /\d+/g;
                    categories = [];
                    currentCategory = null;
                    lineNumbers = [];
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
                    if (line.startsWith("seeds")) {
                        seedsMatch = void 0;
                        while ((seedsMatch = numbersRegex.exec(line)) !== null) {
                            seedLineNumbers.push(Number(seedsMatch[0]));
                        }
                        for (i = 0; i < seedLineNumbers.length; i += 2) {
                            startSeed = seedLineNumbers[i];
                            seedLength = i + 1 < seedLineNumbers.length ? seedLineNumbers[i + 1] : 0;
                            seeds.push({ start: startSeed, length: seedLength });
                        }
                    }
                    else if (line.includes(":")) {
                        if (currentCategory != null) {
                            categories.push(currentCategory);
                        }
                        currentCategory = new Category();
                    }
                    else {
                        lineNumbers = [];
                        lineNumbersMatch = void 0;
                        while ((lineNumbersMatch = numbersRegex.exec(line)) !== null) {
                            lineNumbers.push(Number(lineNumbersMatch[0]));
                        }
                        if (currentCategory != null && lineNumbers.length > 0) {
                            dest = lineNumbers[0];
                            source = lineNumbers[1];
                            length_1 = lineNumbers[2];
                            currentCategory.add(new Range(source, source + length_1 - 1, dest - source));
                        }
                    }
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
                    console.log(seeds);
                    if (currentCategory != null) {
                        categories.push(currentCategory);
                    }
                    minLocation = Number.MAX_SAFE_INTEGER;
                    currentSeeds = [];
                    seeds.forEach(function (seed) {
                        currentSeeds = [seed];
                        categories.forEach(function (category) {
                            currentSeeds = category.output(currentSeeds);
                        });
                        // console.log(currentSeeds);
                        minLocation = Math.min(minLocation, currentSeeds
                            .map(function (resultSeed) { return resultSeed.start; })
                            .reduce(function (acc, result) { return Math.min(acc, result); }));
                        currentSeeds = [];
                    });
                    console.log(minLocation);
                    return [2 /*return*/];
            }
        });
    });
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

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
        var fileStream, rl, coordinateNumbers, coordinateSymbols, sum, lineIndex, symbolsRegex, numbersRegex, gearSymvol, _d, rl_1, rl_1_1, line, matchSymbols, matchNumbers, e_1_1, _i, coordinateSymbols_1, symbol, adjacentCount, gearRatio, _e, coordinateNumbers_1, coordinateNumber;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    fileStream = fs.createReadStream(filePath);
                    rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity, // Treats each line as a separate data event
                    });
                    coordinateNumbers = [];
                    coordinateSymbols = [];
                    sum = 0;
                    lineIndex = 0;
                    symbolsRegex = /[^A-Za-z0-9.]/g;
                    numbersRegex = /\d+/g;
                    gearSymvol = "*";
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 6, 7, 12]);
                    _d = true, rl_1 = __asyncValues(rl);
                    _f.label = 2;
                case 2: return [4 /*yield*/, rl_1.next()];
                case 3:
                    if (!(rl_1_1 = _f.sent(), _a = rl_1_1.done, !_a)) return [3 /*break*/, 5];
                    _c = rl_1_1.value;
                    _d = false;
                    line = _c;
                    matchSymbols = void 0;
                    while ((matchSymbols = symbolsRegex.exec(line)) !== null) {
                        if (matchSymbols[0] == gearSymvol) {
                            coordinateSymbols.push({ x: lineIndex, y: matchSymbols.index });
                        }
                    }
                    matchNumbers = void 0;
                    while ((matchNumbers = numbersRegex.exec(line)) !== null) {
                        coordinateNumbers.push({
                            x: lineIndex,
                            y: matchNumbers.index,
                            lineNumber: Number(matchNumbers[0]),
                        });
                    }
                    lineIndex++;
                    _f.label = 4;
                case 4:
                    _d = true;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _f.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _f.trys.push([7, , 10, 11]);
                    if (!(!_d && !_a && (_b = rl_1.return))) return [3 /*break*/, 9];
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
                    // console.log(coordinateNumbers);
                    // console.log(coordinateSymbols);
                    for (_i = 0, coordinateSymbols_1 = coordinateSymbols; _i < coordinateSymbols_1.length; _i++) {
                        symbol = coordinateSymbols_1[_i];
                        adjacentCount = 0;
                        gearRatio = 1;
                        for (_e = 0, coordinateNumbers_1 = coordinateNumbers; _e < coordinateNumbers_1.length; _e++) {
                            coordinateNumber = coordinateNumbers_1[_e];
                            if (adjacent({ x: symbol.x, y: symbol.y }, {
                                xLineStart: coordinateNumber.x,
                                yLineStart: coordinateNumber.y,
                                length: lengthOfANumber(coordinateNumber.lineNumber),
                            })) {
                                adjacentCount++;
                                gearRatio *= coordinateNumber.lineNumber;
                                // console.log("Adjacent");
                                // console.log(symbol);
                                // console.log(coordinateNumber);
                                // coordinateNumbers = coordinateNumbers.filter(
                                //   (obj) => obj !== coordinateNumber
                                // );
                            }
                        }
                        if (adjacentCount == 2) {
                            sum += gearRatio;
                        }
                    }
                    console.log(sum);
                    return [2 /*return*/];
            }
        });
    });
}
function lengthOfANumber(number) {
    return Math.abs(number).toString().length;
}
function adjacent(_a, _b) {
    var x = _a.x, y = _a.y;
    var xLineStart = _b.xLineStart, yLineStart = _b.yLineStart, length = _b.length;
    var withinHorizontalRange = y >= yLineStart - 1 && y <= yLineStart + length;
    var withinVerticalRange = Math.abs(x - xLineStart) <= 1;
    return withinHorizontalRange && withinVerticalRange;
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

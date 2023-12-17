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
        var fileStream, rl, patterns, currentPattern, _d, rl_1, rl_1_1, line, e_1_1, sum;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    fileStream = fs.createReadStream(filePath);
                    rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity, // Treats each line as a separate data event
                    });
                    patterns = [];
                    currentPattern = [];
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
                    if (line == "") {
                        patterns.push(currentPattern);
                        currentPattern = [];
                    }
                    else {
                        currentPattern.push(line);
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
                    patterns.push(currentPattern);
                    sum = 0;
                    patterns.forEach(function (pattern) { return (sum += countReflections(pattern)); });
                    console.log(sum);
                    return [2 /*return*/];
            }
        });
    });
}
function countReflections(pattern) {
    var columnMirror;
    var rowMirror;
    var columnsData = findRightColumnIndex(pattern);
    if (columnsData.rightMirrorIndex) {
        // console.log("Left columns: " + columnsData.rightMirrorIndex);
        columnMirror = columnsData.rightMirrorIndex;
    }
    var rowsData = findBottomRowIndex(pattern);
    if (rowsData.bottomMirrorIndex) {
        // console.log("Above rows: " + rowsData.bottomMirrorIndex);
        rowMirror = rowsData.bottomMirrorIndex;
    }
    if (columnMirror && rowMirror) {
        if (columnMirror < rowMirror) {
            return columnMirror;
        }
        else {
            return 100 * rowMirror;
        }
    }
    else if (columnMirror) {
        return columnMirror;
    }
    else if (rowMirror) {
        return 100 * rowMirror;
    }
    // 17312 too low
    console.log("Haven't found mirror column or row");
    return -1;
}
function makesPerfectRowMirror(bottomColumnIndex, rowsByIndex, smudgeUsed) {
    var count = 0;
    var currentIndexBelow = bottomColumnIndex + 1;
    var currentIndexAbove = bottomColumnIndex - 2;
    while (true) {
        var aboveRow = rowsByIndex.get(currentIndexAbove);
        var belowRow = rowsByIndex.get(currentIndexBelow);
        if (aboveRow && belowRow && aboveRow == belowRow) {
            count++;
            if (currentIndexAbove == 0 &&
                currentIndexBelow == rowsByIndex.keys.length - 1 &&
                smudgeUsed) {
                return true;
            }
        }
        else if (aboveRow &&
            belowRow &&
            !smudgeUsed &&
            areSameWithTolerance(aboveRow, belowRow, 1)) {
            smudgeUsed = true;
            count++;
            if (currentIndexAbove == 0 &&
                currentIndexBelow == rowsByIndex.keys.length - 1) {
                return true;
            }
        }
        else if (aboveRow && belowRow == undefined && smudgeUsed) {
            // I can ignore most above if below is out of bounds
            return true;
        }
        else if (belowRow && aboveRow == undefined && smudgeUsed) {
            // I can ignore most below if above is out of bounds
            return true;
        }
        else {
            return false;
        }
        currentIndexBelow += 1;
        currentIndexAbove -= 1;
    }
}
function findBottomRowIndex(pattern) {
    var rows = pattern.length;
    var rowsByIndex = new Map();
    var mirrorCandidates = [];
    for (var row = 0; row < rows; row++) {
        rowsByIndex.set(row, pattern[row]);
        var previous = rowsByIndex.get(row - 1);
        if (previous && previous == pattern[row]) {
            mirrorCandidates.push({ index: row, smudgeUsed: false });
        }
        else if (previous && areSameWithTolerance(previous, pattern[row], 1)) {
            mirrorCandidates.push({ index: row, smudgeUsed: true });
        }
    }
    var botomMirrorCandidate = mirrorCandidates.find(function (candidate) {
        return makesPerfectRowMirror(candidate.index, rowsByIndex, candidate.smudgeUsed);
    });
    return {
        bottomMirrorIndex: botomMirrorCandidate === null || botomMirrorCandidate === void 0 ? void 0 : botomMirrorCandidate.index,
        rowsByIndex: rowsByIndex,
    };
}
function findRightColumnIndex(pattern) {
    var columns = pattern[0].length;
    var rows = pattern.length;
    var columnsByIndex = new Map();
    // can be multiple same lines, but not all of them make perfect mirror
    var mirrorCandidates = [];
    var currentColumn = "";
    for (var col = 0; col < columns; col++) {
        currentColumn = "";
        for (var row = 0; row < rows; row++) {
            currentColumn += pattern[row][col];
        }
        columnsByIndex.set(col, currentColumn);
        var previous = columnsByIndex.get(col - 1);
        if (previous && previous == currentColumn) {
            mirrorCandidates.push({ index: col, smudgeUsed: false });
        }
        else if (previous && areSameWithTolerance(previous, currentColumn, 1)) {
            mirrorCandidates.push({ index: col, smudgeUsed: true });
        }
    }
    var rightMirrorCandidate = mirrorCandidates.find(function (candidate) {
        return makesPerfectColumnMirror(candidate.index, columnsByIndex, candidate.smudgeUsed);
    });
    return { rightMirrorIndex: rightMirrorCandidate === null || rightMirrorCandidate === void 0 ? void 0 : rightMirrorCandidate.index, columnsByIndex: columnsByIndex };
}
function areSameWithTolerance(a, b, tolerance) {
    var differences = 0;
    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            differences++;
            if (differences > tolerance) {
                return false;
            }
        }
    }
    return true;
}
function makesPerfectColumnMirror(candidateIndex, columnsByIndex, smudgeUsed) {
    var count = 0;
    var currentIndexRight = candidateIndex + 1;
    var currentIndexLeft = candidateIndex - 2;
    while (true) {
        var leftCol = columnsByIndex.get(currentIndexLeft);
        var rightCol = columnsByIndex.get(currentIndexRight);
        if (leftCol && rightCol && leftCol == rightCol) {
            count++;
            if (currentIndexLeft == 0 &&
                currentIndexRight == columnsByIndex.keys.length - 1 &&
                smudgeUsed) {
                return true;
            }
        }
        else if (leftCol &&
            rightCol &&
            !smudgeUsed &&
            areSameWithTolerance(leftCol, rightCol, 1)) {
            smudgeUsed = true;
            count++;
            if (currentIndexLeft == 0 &&
                currentIndexRight == columnsByIndex.keys.length - 1) {
                return true;
            }
        }
        else if (rightCol && leftCol == undefined && smudgeUsed) {
            // I can ignore most right if left is out of bounds
            return true;
        }
        else if (leftCol && rightCol == undefined && smudgeUsed) {
            // I can ignore most lest if right is out of bounds
            return true;
        }
        else {
            return false;
        }
        currentIndexRight += 1;
        currentIndexLeft -= 1;
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

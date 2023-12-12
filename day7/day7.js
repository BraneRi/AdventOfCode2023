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
        var fileStream, rl, entries, _d, rl_1, rl_1_1, line, lineParts, e_1_1, sum;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    fileStream = fs.createReadStream(filePath);
                    rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity, // Treats each line as a separate data event
                    });
                    entries = [];
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
                    lineParts = line.split(/\s+/);
                    entries.push({ hand: lineParts[0], bid: Number(lineParts[1]) });
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
                    entries.sort(function (a, b) {
                        var result = handComparison(a, b);
                        return result;
                    });
                    sum = 0;
                    entries.forEach(function (entry, index) {
                        sum += (index + 1) * entry.bid;
                    });
                    console.log(sum); // 255101931 255101931 254660528
                    return [2 /*return*/];
            }
        });
    });
}
function handComparison(a, b) {
    var handA = a.hand;
    var handB = b.hand;
    var charCountMapA = getCharCountMap(handA);
    var charCountMapB = getCharCountMap(handB);
    var strengthA = getStrength(charCountMapA);
    var strengthB = getStrength(charCountMapB);
    if (strengthA != strengthB) {
        return strengthA > strengthB ? 1 : -1;
    }
    var template = "AKQT98765432J";
    // console.log("Jaci je");
    for (var i = 0; i < handA.length; i++) {
        var aCard = handA[i];
        var bCard = handB[i];
        if (template.indexOf(aCard) < template.indexOf(bCard)) {
            // console.log(sortedA);
            return 1;
        }
        else if (template.indexOf(aCard) > template.indexOf(bCard)) {
            // console.log(sortedB);
            return -1;
        }
    }
    // console.log("Error"); 254350549
    // negative returns a, positive returns b
    return -1;
}
function numberOfJokers(charCountMap) {
    var count = charCountMap.get("J");
    if (count)
        return count;
    else
        return 0;
}
function isOfAKind(charCountMap, amount, jokers) {
    return ((amount == 5 && jokers == 5) ||
        Array.from(charCountMap.entries()).find(function (entry) { return entry[1] == amount && entry[0] != "J"; }) ||
        (jokers > 0 && isOfAKind(charCountMap, amount - jokers, 0)));
}
function isFullHouse(charCountMap, jokers) {
    return ((Array.from(charCountMap.keys()).length == 2 && jokers == 0) ||
        (Array.from(charCountMap.keys()).length == 3 && jokers == 1));
}
function isTwoPairs(charCountMap, jokers) {
    return Array.from(charCountMap.keys()).length == 3 && jokers == 0;
}
function isOnePair(charCountMap, jokers) {
    return ((Array.from(charCountMap.keys()).length == 4 && jokers == 0) ||
        (Array.from(charCountMap.keys()).length == 5 && jokers == 1));
}
function isHighCard(charCountMap, jokers) {
    return Array.from(charCountMap.keys()).length == 5 && jokers == 0;
}
function getCharCountMap(hand) {
    var charCountMap = new Map();
    for (var i = 0; i < hand.length; i++) {
        var card = hand[i];
        if (charCountMap.has(card)) {
            charCountMap.set(card, charCountMap.get(card) + 1);
        }
        else {
            charCountMap.set(card, 1);
        }
    }
    return charCountMap;
}
function getStrength(charCountMap) {
    var jokers = numberOfJokers(charCountMap);
    if (isOfAKind(charCountMap, 5, jokers)) {
        // console.log("Five of a kind");
        return 7;
    }
    else if (isOfAKind(charCountMap, 4, jokers)) {
        // console.log("Four of a kind");
        return 6;
    }
    else if (isFullHouse(charCountMap, jokers)) {
        // console.log("Full house");
        return 5;
    }
    else if (isOfAKind(charCountMap, 3, jokers)) {
        // console.log("Three of a kind");
        return 4;
    }
    else if (isTwoPairs(charCountMap, jokers)) {
        // console.log("Two pairs");
        return 3;
    }
    else if (isOnePair(charCountMap, jokers)) {
        // console.log("One pair");
        return 2;
    }
    else if (isHighCard(charCountMap, jokers)) {
        // console.log("High card");
        return 1;
    }
    // console.log("Error");
    return -1;
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

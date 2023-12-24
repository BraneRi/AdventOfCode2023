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
var Condition;
(function (Condition) {
    Condition[Condition["SMALLER"] = 0] = "SMALLER";
    Condition[Condition["BIGGGER"] = 1] = "BIGGGER";
})(Condition || (Condition = {}));
function processFile(filePath) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var fileStream, rl, workflows, inputs, ruleRegex, inputsRegex, _d, rl_1, rl_1_1, line, match, workflow, rulesString, match_1, x, m, a, s, e_1_1, solutions;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    fileStream = fs.createReadStream(filePath);
                    rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity, // Treats each line as a separate data event
                    });
                    workflows = new Map();
                    inputs = [];
                    ruleRegex = /([^{}]+){([^}]+)}/;
                    inputsRegex = /x=(\d+),m=(\d+),a=(\d+),s=(\d+)/;
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
                    match = line.match(ruleRegex);
                    if (match) {
                        workflow = match[1];
                        rulesString = match[2];
                        workflows.set(workflow, parseRules(rulesString));
                    }
                    else {
                        match_1 = line.match(inputsRegex);
                        if (match_1) {
                            x = Number(match_1[1]);
                            m = Number(match_1[2]);
                            a = Number(match_1[3]);
                            s = Number(match_1[4]);
                            inputs.push({ x: x, m: m, a: a, s: s });
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
                    solutions = Array.from(totalCombinations(workflows));
                    console.log(solutions.reduce(function (acc, solution) {
                        return acc +
                            (solution.x.to - solution.x.from + 1) *
                                (solution.m.to - solution.m.from + 1) *
                                (solution.a.to - solution.a.from + 1) *
                                (solution.s.to - solution.s.from + 1);
                    }, 0));
                    console.log(solutions);
                    return [2 /*return*/];
            }
        });
    });
}
// Part two
function totalCombinations(workflows, currentWorkflow, x, m, a, s, solutions) {
    if (currentWorkflow === void 0) { currentWorkflow = "in"; }
    if (x === void 0) { x = { from: 1, to: 4000 }; }
    if (m === void 0) { m = { from: 1, to: 4000 }; }
    if (a === void 0) { a = { from: 1, to: 4000 }; }
    if (s === void 0) { s = { from: 1, to: 4000 }; }
    if (solutions === void 0) { solutions = new Set(); }
    if (currentWorkflow === "R")
        return solutions;
    if (currentWorkflow === "A") {
        // console.log("Ok ranges for: " + currentWorkflow);
        // console.log(x);
        // console.log(m);
        // console.log(a);
        // console.log(s);
        // console.log("---------");
        return solutions.add({ x: x, m: m, a: a, s: s });
    }
    var currentRules = workflows.get(currentWorkflow) || [];
    for (var _i = 0, currentRules_1 = currentRules; _i < currentRules_1.length; _i++) {
        var rule = currentRules_1[_i];
        var isLastRule = rule === currentRules[currentRules.length - 1];
        var conditionOk = { from: 0, to: 0 };
        var conditionNotOk = { from: 0, to: 0 };
        switch (rule.category) {
            case "x":
                conditionOk.from =
                    rule.condition === Condition.SMALLER
                        ? x.from
                        : rule.conditionValue + 1;
                conditionOk.to =
                    rule.condition === Condition.SMALLER ? rule.conditionValue - 1 : x.to;
                conditionNotOk.from =
                    rule.condition === Condition.SMALLER ? rule.conditionValue : x.from;
                conditionNotOk.to =
                    rule.condition === Condition.SMALLER ? x.to : rule.conditionValue;
                if (conditionOk.to - conditionOk.from > 0) {
                    totalCombinations(workflows, rule.conditionOkWorkflow, conditionOk, m, a, s, solutions).forEach(function (element) {
                        solutions.add(element);
                    });
                }
                if (isLastRule && conditionNotOk.to - conditionNotOk.from > 0) {
                    totalCombinations(workflows, rule.conditionNotOkWorkflow, conditionNotOk, m, a, s, solutions).forEach(function (element) {
                        solutions.add(element);
                    });
                }
                else if (isLastRule) {
                    return solutions;
                }
                x = { from: conditionNotOk.from, to: conditionNotOk.to };
                break;
            case "m":
                conditionOk.from =
                    rule.condition === Condition.SMALLER
                        ? m.from
                        : rule.conditionValue + 1;
                conditionOk.to =
                    rule.condition === Condition.SMALLER ? rule.conditionValue - 1 : m.to;
                conditionNotOk.from =
                    rule.condition === Condition.SMALLER ? rule.conditionValue : m.from;
                conditionNotOk.to =
                    rule.condition === Condition.SMALLER ? m.to : rule.conditionValue;
                if (conditionOk.to - conditionOk.from > 0) {
                    totalCombinations(workflows, rule.conditionOkWorkflow, x, conditionOk, a, s, solutions).forEach(function (element) {
                        solutions.add(element);
                    });
                }
                if (isLastRule && conditionNotOk.to - conditionNotOk.from > 0) {
                    totalCombinations(workflows, rule.conditionNotOkWorkflow, x, conditionNotOk, a, s, solutions).forEach(function (element) {
                        solutions.add(element);
                    });
                }
                else if (isLastRule) {
                    return solutions;
                }
                m = { from: conditionNotOk.from, to: conditionNotOk.to };
                break;
            case "a":
                conditionOk.from =
                    rule.condition === Condition.SMALLER
                        ? a.from
                        : rule.conditionValue + 1;
                conditionOk.to =
                    rule.condition === Condition.SMALLER ? rule.conditionValue - 1 : a.to;
                conditionNotOk.from =
                    rule.condition === Condition.SMALLER ? rule.conditionValue : a.from;
                conditionNotOk.to =
                    rule.condition === Condition.SMALLER ? a.to : rule.conditionValue;
                if (conditionOk.to - conditionOk.from > 0) {
                    totalCombinations(workflows, rule.conditionOkWorkflow, x, m, conditionOk, s, solutions).forEach(function (element) {
                        solutions.add(element);
                    });
                }
                if (isLastRule && conditionNotOk.to - conditionNotOk.from > 0) {
                    totalCombinations(workflows, rule.conditionNotOkWorkflow, x, m, conditionNotOk, s, solutions).forEach(function (element) {
                        solutions.add(element);
                    });
                }
                else if (isLastRule) {
                    return solutions;
                }
                a = { from: conditionNotOk.from, to: conditionNotOk.to };
                break;
            default:
                conditionOk.from =
                    rule.condition === Condition.SMALLER
                        ? s.from
                        : rule.conditionValue + 1;
                conditionOk.to =
                    rule.condition === Condition.SMALLER ? rule.conditionValue - 1 : s.to;
                conditionNotOk.from =
                    rule.condition === Condition.SMALLER ? rule.conditionValue : s.from;
                conditionNotOk.to =
                    rule.condition === Condition.SMALLER ? s.to : rule.conditionValue;
                if (conditionOk.to - conditionOk.from > 0) {
                    totalCombinations(workflows, rule.conditionOkWorkflow, x, m, a, conditionOk, solutions).forEach(function (element) {
                        solutions.add(element);
                    });
                }
                if (isLastRule && conditionNotOk.to - conditionNotOk.from > 0) {
                    totalCombinations(workflows, rule.conditionNotOkWorkflow, x, m, a, conditionNotOk, solutions);
                }
                else if (isLastRule) {
                    return solutions;
                }
                s = { from: conditionNotOk.from, to: conditionNotOk.to };
                break;
        }
    }
    return solutions;
}
// Part one
function sumOfAccepted(workflows, inputs) {
    var sum = 0;
    inputs.forEach(function (input) {
        var currentWorkflow = "in";
        var currentRules;
        while (currentWorkflow != "A" && currentWorkflow != "R") {
            currentRules = workflows.get(currentWorkflow);
            var isLastRule = false;
            var rule;
            for (var i = 0; i < currentRules.length; i++) {
                rule = currentRules[i];
                // console.log(rule);
                isLastRule = i == currentRules.length - 1;
                var inputNumber;
                switch (rule.category) {
                    case "x": {
                        inputNumber = input.x;
                        break;
                    }
                    case "m": {
                        inputNumber = input.m;
                        break;
                    }
                    case "a": {
                        inputNumber = input.a;
                        break;
                    }
                    default: {
                        inputNumber = input.s;
                        break;
                    }
                }
                // console.log(inputNumber);
                if (rule.condition == Condition.SMALLER) {
                    if (inputNumber < rule.conditionValue) {
                        currentWorkflow = rule.conditionOkWorkflow;
                        // console.log("SMALLER: " + currentWorkflow);
                        break;
                    }
                    else if (isLastRule) {
                        currentWorkflow = rule.conditionNotOkWorkflow;
                        // console.log("NOT SMALLER: " + currentWorkflow);
                        break;
                    }
                }
                else {
                    if (inputNumber > rule.conditionValue) {
                        currentWorkflow = rule.conditionOkWorkflow;
                        // console.log("BIGGER: " + currentWorkflow);
                        break;
                    }
                    else if (isLastRule) {
                        currentWorkflow = rule.conditionNotOkWorkflow;
                        // console.log("NOT BIGGER: " + currentWorkflow);
                        break;
                    }
                }
            }
        }
        if (currentWorkflow == "A") {
            // console.log(input);
            sum += input.x + input.m + input.a + input.s;
        }
    });
    return sum;
}
function parseRules(rulesString) {
    var rules = [];
    var ruleParts = rulesString.split(",");
    var finalConditionNotOkWorkflow = ruleParts[ruleParts.length - 1];
    var conditionRegex = /([a-zA-Z]+)([<>])(\d+):([a-zA-Z]+)/;
    ruleParts.slice(0, -1).forEach(function (rule) {
        var match = rule.match(conditionRegex);
        if (match) {
            var category = match[1];
            var condition = match[2] == "<" ? Condition.SMALLER : Condition.BIGGGER;
            var conditionValue = Number(match[3]);
            var conditionOkWorkflow = match[4];
            rules.push({
                category: category,
                condition: condition,
                conditionValue: conditionValue,
                conditionOkWorkflow: conditionOkWorkflow,
                conditionNotOkWorkflow: undefined,
            });
        }
    });
    var lastRule = rules[rules.length - 1];
    lastRule.conditionNotOkWorkflow = finalConditionNotOkWorkflow;
    return rules;
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

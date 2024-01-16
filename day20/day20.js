"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Pulse;
(function (Pulse) {
    Pulse[Pulse["HIGH"] = 1] = "HIGH";
    Pulse[Pulse["LOW"] = 0] = "LOW";
})(Pulse || (Pulse = {}));
var Module = /** @class */ (function () {
    function Module() {
    }
    return Module;
}());
var FlipFLop = /** @class */ (function (_super) {
    __extends(FlipFLop, _super);
    function FlipFLop(key, destinationKeys) {
        var _this = _super.call(this) || this;
        _this.isOn = false;
        _this.key = key;
        _this.destinationKeys = destinationKeys;
        _this.parentModules = [];
        return _this;
    }
    FlipFLop.prototype.getParents = function () {
        return this.parentModules;
    };
    FlipFLop.prototype.addParentModule = function (connectedModuleKey) {
        this.parentModules.push(connectedModuleKey);
    };
    FlipFLop.prototype.getDestinations = function () {
        return this.destinationKeys;
    };
    FlipFLop.prototype.getKey = function () {
        return this.key;
    };
    FlipFLop.prototype.getOutput = function () {
        return this.output;
    };
    FlipFLop.prototype.calculateOutput = function (key, input) {
        switch (input) {
            case Pulse.HIGH: {
                this.output = undefined;
                break;
            }
            case Pulse.LOW: {
                switch (this.isOn) {
                    case true: {
                        this.isOn = false;
                        this.output = Pulse.LOW;
                        break;
                    }
                    case false: {
                        this.isOn = true;
                        this.output = Pulse.HIGH;
                        break;
                    }
                }
            }
        }
    };
    return FlipFLop;
}(Module));
var Conjunction = /** @class */ (function (_super) {
    __extends(Conjunction, _super);
    function Conjunction(key, destinatonModuleKeys) {
        var _this = _super.call(this) || this;
        _this.key = key;
        _this.connectedModuleKeys = [];
        _this.destinatonModuleKeys = destinatonModuleKeys;
        _this.mostRecentPulseForModule = new Map();
        return _this;
    }
    Conjunction.prototype.getParents = function () {
        return this.connectedModuleKeys;
    };
    Conjunction.prototype.getDestinations = function () {
        return this.destinatonModuleKeys;
    };
    Conjunction.prototype.addParentModule = function (connectedModuleKey) {
        this.connectedModuleKeys.push(connectedModuleKey);
        this.mostRecentPulseForModule.set(connectedModuleKey, Pulse.LOW);
    };
    Conjunction.prototype.getKey = function () {
        return this.key;
    };
    Conjunction.prototype.getOutput = function () {
        return this.output;
    };
    Conjunction.prototype.calculateOutput = function (moduleKey, input) {
        this.mostRecentPulseForModule.set(moduleKey, input);
        if (input == Pulse.LOW) {
            this.output = Pulse.HIGH;
            return;
        }
        if (Array.from(this.mostRecentPulseForModule.values()).find(function (pulse) { return pulse == Pulse.LOW; }) != undefined) {
            this.output = Pulse.HIGH;
        }
        else {
            this.output = Pulse.LOW;
        }
    };
    return Conjunction;
}(Module));
var Broadcast = /** @class */ (function (_super) {
    __extends(Broadcast, _super);
    function Broadcast(key, destinationKeys) {
        var _this = _super.call(this) || this;
        _this.destinationKeys = destinationKeys;
        _this.key = key;
        return _this;
    }
    Broadcast.prototype.getParents = function () {
        return [];
    };
    Broadcast.prototype.addParentModule = function (connectedModuleKey) {
        // button
    };
    Broadcast.prototype.getDestinations = function () {
        return this.destinationKeys;
    };
    Broadcast.prototype.getKey = function () {
        return this.key;
    };
    Broadcast.prototype.getOutput = function () {
        return this.output;
    };
    Broadcast.prototype.calculateOutput = function (key, input) {
        this.output = input;
    };
    return Broadcast;
}(Module));
function pushTheButton(modules) {
    var _a;
    var destinations = [];
    var broadcast = modules.get("broadcaster");
    broadcast.calculateOutput("broadcaster", Pulse.LOW);
    broadcast.getDestinations().forEach(function (d) {
        return destinations.push({
            key: d,
            input: broadcast.getOutput(),
            parentKey: broadcast.getKey(),
        });
    });
    // we count initial low
    var lowCount = 1;
    var highCount = 0;
    var _loop_1 = function () {
        var newDestinations = [];
        var _loop_2 = function (destination) {
            if (destination.input != undefined) {
                destination.input == Pulse.LOW ? lowCount++ : highCount++;
            }
            // console.log(destination);
            var module_1 = modules.get(destination.key);
            if (destination.input != undefined && module_1 != undefined) {
                // console.log("SIG");
                // console.log(destination.key);
                // console.log(destination.input);
                module_1.calculateOutput(destination.parentKey, destination.input);
                // console.log(module.getDestinations());
                // console.log("--------");
                if (module_1.getOutput() != undefined) {
                    module_1.getDestinations().forEach(function (d) {
                        return newDestinations.push({
                            key: d,
                            input: module_1.getOutput(),
                            parentKey: destination.key,
                        });
                    });
                }
            }
        };
        // console.log(destinations);
        for (var _i = 0, destinations_1 = destinations; _i < destinations_1.length; _i++) {
            var destination = destinations_1[_i];
            _loop_2(destination);
        }
        destinations = newDestinations;
    };
    while (destinations.length > 0) {
        _loop_1();
    }
    // console.log(lowCount);
    // console.log(highCount);
    return {
        low: lowCount,
        high: highCount,
        rxIsLow: ((_a = modules.get("mf")) === null || _a === void 0 ? void 0 : _a.getOutput()) == Pulse.LOW,
    };
}
function processFile(filePath) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var fileStream, rl, modules, _d, rl_1, rl_1_1, line, destinationsLinePart, destinations, key, key, e_1_1, buttonPushes, result;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    fileStream = fs.createReadStream(filePath);
                    rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity, // Treats each line as a separate data event
                    });
                    modules = new Map();
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
                    destinationsLinePart = line.substring(line.indexOf(">") + 1).trim();
                    destinations = destinationsLinePart
                        .split(",")
                        .map(function (destination) { return destination.trim(); });
                    if (line.startsWith("broadcaster")) {
                        modules.set("broadcaster", new Broadcast("broadcaster", destinations));
                    }
                    else if (line.startsWith("%")) {
                        key = line.substring(1, line.indexOf("-")).trim();
                        modules.set(key, new FlipFLop(key, destinations));
                    }
                    else if (line.startsWith("&")) {
                        key = line.substring(1, line.indexOf("-")).trim();
                        modules.set(key, new Conjunction(key, destinations));
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
                    // fill conjunction modules connections
                    Array.from(modules.values()).forEach(function (module) {
                        module.getDestinations().forEach(function (destination) {
                            var destinationModule = modules.get(destination);
                            destinationModule === null || destinationModule === void 0 ? void 0 : destinationModule.addParentModule(module.getKey());
                        });
                    });
                    buttonPushes = 0;
                    do {
                        buttonPushes++;
                        result = pushTheButton(modules);
                        // console.log("button push " + buttonPushes);
                        // // console.log(result.low + result.high);
                        // console.log(result.low + result.high);
                        // console.log("-----");
                    } while (buttonPushes <
                        2048 * 5
                    // 2048 + 1024 + 512 + 256 + 128 + 64 + 32 + 16 + 8 + 4 + 2
                    );
                    console.log(modules);
                    return [2 /*return*/];
            }
        });
    });
}
function calculateLCM(num1, num2) {
    // Calculate the Greatest Common Divisor (GCD) using Euclid's algorithm
    var calculateGCD = function (a, b) {
        if (b === 0) {
            return a;
        }
        else {
            return calculateGCD(b, a % b);
        }
    };
    // LCM = (num1 * num2) / GCD(num1, num2)
    var gcd = calculateGCD(num1, num2);
    var lcm = (num1 * num2) / gcd;
    return lcm;
}
var pulseCache = new Map();
function pulseAndModuleToKey(pulse, moduleKey) {
    return pulse.toString() + "," + moduleKey;
}
function pulseEveryNthTime(pulse, moduleKey, modules) {
    console.log(moduleKey);
    var currentModule = modules.get(moduleKey);
    var cache = pulseCache.get(pulseAndModuleToKey(pulse, moduleKey));
    if (cache) {
        return cache;
    }
    else if (currentModule instanceof Broadcast) {
        switch (pulse) {
            case Pulse.HIGH:
                console.log("ERROR");
                return Number.NEGATIVE_INFINITY;
            case Pulse.LOW:
                pulseCache.set[pulseAndModuleToKey(pulse, moduleKey)] = 1;
                return 1;
        }
    }
    else if (currentModule instanceof FlipFLop) {
        var repeats = currentModule
            .getParents()
            .reduce(function (acc, parent) {
            return Math.min(acc, pulseEveryNthTime(Pulse.LOW, parent, modules));
        }, Number.POSITIVE_INFINITY);
        switch (pulse) {
            case Pulse.HIGH:
                pulseCache.set[pulseAndModuleToKey(pulse, moduleKey)] = 2 * repeats - 1;
                return 2 * repeats - 1;
            case Pulse.LOW:
                pulseCache.set[pulseAndModuleToKey(pulse, moduleKey)] = 2 * repeats;
                return 2 * repeats;
        }
    }
    else if (currentModule instanceof Conjunction) {
        var result;
        switch (pulse) {
            case Pulse.HIGH:
                result = currentModule
                    .getParents()
                    .reduce(function (acc, parent) {
                    return calculateLCM(acc, pulseEveryNthTime(Pulse.HIGH, parent, modules));
                }, 1);
                pulseCache.set[pulseAndModuleToKey(pulse, moduleKey)] = result;
                return result;
            case Pulse.LOW:
                result = currentModule
                    .getParents()
                    .reduce(function (acc, parent) {
                    return Math.min(acc, pulseEveryNthTime(Pulse.LOW, parent, modules));
                }, Number.POSITIVE_INFINITY);
                pulseCache.set[pulseAndModuleToKey(pulse, moduleKey)] = result;
                return result;
        }
    }
    return Number.NEGATIVE_INFINITY;
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

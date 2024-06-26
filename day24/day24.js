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
var fs = require("fs");
var readline = require("readline");
var INPUT_REGEX = /(\d+),\s*(\d+),\s*(\d+)\s*@\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)/;
function processFile(filePath) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var fileStream, rl, hailstones, _d, rl_1, rl_1_1, line, match, _, px, py, pz, vx, vy, vz, e_1_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    fileStream = fs.createReadStream(filePath);
                    rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity, // Treats each line as a separate data event
                    });
                    hailstones = [];
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
                    match = line.match(INPUT_REGEX);
                    if (match) {
                        _ = match[0], px = match[1], py = match[2], pz = match[3], vx = match[4], vy = match[5], vz = match[6];
                        hailstones.push({
                            point: { x: parseInt(px), y: parseInt(py), z: parseInt(pz) },
                            velocity: {
                                x: parseInt(vx),
                                y: parseInt(vy),
                                z: parseInt(vz),
                            },
                        });
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
                    solve(hailstones.slice(0, 3));
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
function solve(hailstones) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, init, killThreads, api, _b, Solver, Real, solver, px, py, pz, vx, vy, vz, i, t, hp, hv, hpx, hpy, hpz, hvx, hvy, hvz, result, model, sum;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = require("z3-solver"), init = _a.init, killThreads = _a.killThreads;
                    return [4 /*yield*/, init()];
                case 1:
                    api = _c.sent();
                    _b = new api.Context("main"), Solver = _b.Solver, Real = _b.Real;
                    solver = new Solver();
                    px = Real.const("px");
                    py = Real.const("py");
                    pz = Real.const("pz");
                    vx = Real.const("vx");
                    vy = Real.const("vy");
                    vz = Real.const("vz");
                    for (i = 0; i < hailstones.length; i++) {
                        t = Real.const("t".concat(i + 1));
                        hp = hailstones[i].point;
                        hv = hailstones[i].velocity;
                        hpx = Real.val(hp.x);
                        hpy = Real.val(hp.y);
                        hpz = Real.val(hp.z);
                        hvx = Real.val(hv.x);
                        hvy = Real.val(hv.y);
                        hvz = Real.val(hv.z);
                        solver.add(px.eq(hpx.add(hvx.mul(t)).sub(vx.mul(t))), py.eq(hpy.add(hvy.mul(t)).sub(vy.mul(t))), pz.eq(hpz.add(hvz.mul(t)).sub(vz.mul(t))));
                    }
                    return [4 /*yield*/, solver.check()];
                case 2:
                    result = _c.sent();
                    if (result === "sat") {
                        model = solver.model();
                        console.log("px: ".concat(model.get(px)));
                        console.log("py: ".concat(model.get(py)));
                        console.log("pz: ".concat(model.get(pz)));
                        console.log("vx: ".concat(model.get(vx)));
                        console.log("vy: ".concat(model.get(vy)));
                        console.log("vz: ".concat(model.get(vz)));
                        sum = Number.parseInt(model.get(px)) +
                            Number.parseInt(model.get(py)) +
                            Number.parseInt(model.get(pz));
                        console.log("Sum of coordinates: ", sum);
                    }
                    else {
                        console.log("No solution found.");
                    }
                    api.em.PThread.terminateAllThreads();
                    return [2 /*return*/];
            }
        });
    });
}

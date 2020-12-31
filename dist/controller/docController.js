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
        while (_) try {
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postImg = exports.delDocs = exports.putDocs = exports.postDocs = exports.getDocById = exports.searchDocs = exports.getDocsByUser = exports.getDocs = void 0;
var docs_1 = __importDefault(require("../model/docs"));
var user_1 = __importDefault(require("../model/user"));
var mongoose_1 = __importDefault(require("mongoose"));
var getDocs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var docs, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, docs_1.default.find({}).sort({ _id: -1 }).limit(20)];
            case 1:
                docs = _a.sent();
                res.status(200).json(docs);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(401);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getDocs = getDocs;
var getDocsByUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1.default.findById(id).populate("docs")];
            case 2:
                user = _a.sent();
                res.status(200).json(user);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.error(err_2);
                res.status(401);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getDocsByUser = getDocsByUser;
var searchDocs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var q, text, docs, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                q = req.query.q;
                text = q;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, docs_1.default.find({
                        description: { $regex: text, $options: "i" },
                    })
                        .populate("creator")
                        .sort({ _id: -1 })];
            case 2:
                docs = _a.sent();
                res.status(200).json(docs);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                console.error(err_3);
                res.status(401);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.searchDocs = searchDocs;
var getDocById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, docs, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, docs_1.default.findById(id)
                        .populate("contributer")
                        .populate("creator")
                        .populate("recentCreator")];
            case 2:
                docs = _a.sent();
                res.status(200).json(docs);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                console.error(err_4);
                res.status(401);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getDocById = getDocById;
var postDocs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, content, stack, creator, doc, user, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, description = _a.description, content = _a.content, stack = _a.stack, creator = _a.creator;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, docs_1.default.create({
                        title: title,
                        secret: false,
                        description: description,
                        content: content,
                        stack: __spreadArrays(stack),
                        creator: creator,
                        createDate: new Date().toLocaleDateString(),
                        recentCreator: creator,
                        recentUpdate: new Date().toLocaleDateString(),
                        contributer: [creator],
                    })];
            case 2:
                doc = _b.sent();
                return [4 /*yield*/, user_1.default.findById(creator)];
            case 3:
                user = (_b.sent());
                user.contribute += 100;
                user.docs.push(doc._id);
                user.save();
                res.status(200).json(doc._id);
                return [3 /*break*/, 5];
            case 4:
                err_5 = _b.sent();
                console.error(err_5);
                res.status(401);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.postDocs = postDocs;
var putDocs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, content, stack, creator, id, doc, user, checkDocsInUser, checkContriInUser, err_6;
    var _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _a = req.body, title = _a.title, description = _a.description, content = _a.content, stack = _a.stack, creator = _a.creator;
                id = req.params.id;
                _f.label = 1;
            case 1:
                _f.trys.push([1, 6, , 7]);
                return [4 /*yield*/, docs_1.default.findByIdAndUpdate({ _id: id }, {
                        title: title,
                        description: description,
                        content: content,
                        stack: stack,
                        recentCreator: creator
                            ? creator
                            : mongoose_1.default.Types.ObjectId("5fec21a5a66346e4f6fb44bc"),
                        recentUpdate: new Date().toLocaleDateString(),
                    })];
            case 2:
                doc = _f.sent();
                if (creator === "") {
                    console.log(creator);
                    return [2 /*return*/, res.status(200).json(id)];
                }
                if (!(!((_b = doc === null || doc === void 0 ? void 0 : doc.contributer) === null || _b === void 0 ? void 0 : _b.includes(creator)) && (doc === null || doc === void 0 ? void 0 : doc.creator) !== creator)) return [3 /*break*/, 4];
                return [4 /*yield*/, ((_c = doc === null || doc === void 0 ? void 0 : doc.contributer) === null || _c === void 0 ? void 0 : _c.push(creator))];
            case 3:
                _f.sent();
                doc.save();
                _f.label = 4;
            case 4: return [4 /*yield*/, user_1.default.findById(creator)];
            case 5:
                user = (_f.sent());
                checkDocsInUser = (_d = user.docs) === null || _d === void 0 ? void 0 : _d.includes(id);
                checkContriInUser = (_e = user.contriDocs) === null || _e === void 0 ? void 0 : _e.includes(id);
                // 만약 기여를 하지 않았고, 작성자도 아니라면 기여도 +50점
                if (!checkDocsInUser && !checkContriInUser) {
                    user.contriDocs.push(id);
                    user.contribute += 50;
                    user.save();
                }
                res.status(200).json(id);
                return [3 /*break*/, 7];
            case 6:
                err_6 = _f.sent();
                console.error(err_6);
                res.status(401);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.putDocs = putDocs;
var delDocs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, router, id, user, checkDocs, index, err_7;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = req.params, router = _a.router, id = _a.id;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 4, , 5]);
                return [4 /*yield*/, docs_1.default.findByIdAndDelete({ _id: router })];
            case 2:
                _e.sent();
                return [4 /*yield*/, user_1.default.findById(id)];
            case 3:
                user = _e.sent();
                checkDocs = (_b = user === null || user === void 0 ? void 0 : user.docs) === null || _b === void 0 ? void 0 : _b.includes(router);
                if (checkDocs) {
                    index = (_c = user === null || user === void 0 ? void 0 : user.docs) === null || _c === void 0 ? void 0 : _c.indexOf(router);
                    (_d = user === null || user === void 0 ? void 0 : user.docs) === null || _d === void 0 ? void 0 : _d.splice(index, 1);
                    user === null || user === void 0 ? void 0 : user.save();
                }
                res.status(200);
                return [3 /*break*/, 5];
            case 4:
                err_7 = _e.sent();
                console.error(err_7);
                res.status(401);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.delDocs = delDocs;
var postImg = function (req, res) {
    var file = req.file;
    var location = file.location;
    console.log(location);
    try {
        res.status(200).json(location);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};
exports.postImg = postImg;
//# sourceMappingURL=docController.js.map
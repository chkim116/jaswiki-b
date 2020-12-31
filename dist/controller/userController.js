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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.sendUserData = exports.getAuth = exports.postRegister = exports.getLogin = void 0;
var user_1 = __importDefault(require("../model/user"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var passport_1 = __importDefault(require("passport"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var getLogin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        passport_1.default.authenticate("local", function (err, user, info) {
            if (err)
                return next(err);
            if (!user) {
                res.status(400).json("아이디나 비밀번호를 다시 입력해 주세요.");
            }
            else {
                req.logIn(user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    var token = jsonwebtoken_1.default.sign({ userID: user._id }, process.env.JWT_SECRET);
                    user.token = token;
                    user.save(function (err, user) {
                        if (err) {
                            return res.status(400).json(err);
                        }
                        var options = {
                            maxAge: 1000 * 60 * 60 * 24 * 7,
                            domain: undefined,
                            path: "/",
                            httpOnly: process.env.NODE_ENV === "production",
                            secure: process.env.NODE_ENV === "production",
                            sameSite: process.env.NODE_ENV === "production"
                                ? "none"
                                : "lax",
                        };
                        return res
                            .cookie("x_auth", user.token, options)
                            .status(200)
                            .json({
                            _id: user._id,
                            email: user.email,
                            userId: user.userId,
                            contribute: user.contribute,
                            level: user.level,
                            docs: user.docs,
                            token: user.token,
                        });
                    });
                });
            }
        })(req, res, next);
        return [2 /*return*/];
    });
}); };
exports.getLogin = getLogin;
var postRegister = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, password, email, salt, hashPassword, user, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, userId = _a.userId, password = _a.password, email = _a.email;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 2:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
            case 3:
                hashPassword = _b.sent();
                return [4 /*yield*/, new user_1.default({
                        userId: userId,
                        password: hashPassword,
                        email: email,
                        level: 1,
                    })];
            case 4:
                user = _b.sent();
                return [4 /*yield*/, user_1.default.register(user, password)];
            case 5:
                _b.sent();
                next();
                return [3 /*break*/, 7];
            case 6:
                err_1 = _b.sent();
                console.error(err_1);
                res.status(401).json("회원가입에 실패하셨습니다.");
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.postRegister = postRegister;
var levelUp = [
    {
        level: 1,
        contribute: 0,
    },
    {
        level: 2,
        contribute: 1000,
    },
    {
        level: 3,
        contribute: 2000,
    },
    {
        level: 4,
        contribute: 3000,
    },
    {
        level: 5,
        contribute: 4000,
    },
    {
        level: 6,
        contribute: 5000,
    },
    {
        level: 7,
        contribute: 6000,
    },
];
var getAuth = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token;
    return __generator(this, function (_a) {
        token = req.cookies.x_auth;
        if (token === undefined || token === "") {
            return [2 /*return*/];
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                return res.status(500).json({ message: "token decode 실패" });
            }
            user_1.default.findOne({ _id: decoded.userID }, function (err, user) {
                if (err) {
                    return res.json("유저가 존재하지 않습니다.");
                }
                if (!user) {
                    return res
                        .status(400)
                        .json("token과 맞는 유저가 없습니다.");
                }
                if (user) {
                    var userLevelIcons = function (contribute) {
                        var icon = levelUp.filter(function (icon) { return icon.contribute <= contribute; });
                        var level = icon[icon.length - 1].level;
                        return level;
                    };
                    var userLevel = userLevelIcons(user.contribute);
                    user.level = userLevel;
                    user.save();
                    req.token = token;
                    req.user = user;
                }
                next();
            });
        });
        return [2 /*return*/];
    });
}); };
exports.getAuth = getAuth;
var sendUserData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(200).json({
            _id: req.user._id,
            email: req.user.email,
            userId: req.user.userId,
            contribute: req.user.contribute,
            level: req.user.level,
            docs: req.user.docs,
        });
        return [2 /*return*/];
    });
}); };
exports.sendUserData = sendUserData;
var logout = function (req, res) {
    req.token = "";
    return res.clearCookie("x_auth").status(200).json("clear!");
};
exports.logout = logout;
//# sourceMappingURL=userController.js.map
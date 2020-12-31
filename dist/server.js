"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
require("./db");
var docsRouter_1 = __importDefault(require("./router/docsRouter"));
var userRouter_1 = __importDefault(require("./router/userRouter"));
var passport_1 = __importDefault(require("passport"));
require("./passport");
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
var App = /** @class */ (function () {
    function App() {
        this.application = express_1.default();
    }
    return App;
}());
var app = new App().application;
app.use(morgan_1.default("dev"));
app.use(cookie_parser_1.default());
app.use(cors_1.default({
    origin: process.env.NODE_ENV === "production"
        ? true
        : "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.get("/", function (req, res) {
    res.send("반갑습니다");
});
app.use("/user", userRouter_1.default);
app.use("/docs", docsRouter_1.default);
app.listen(process.env.PORT, function () {
    console.log("server on", "http://localhost:" + process.env.PORT + " ");
});
//# sourceMappingURL=server.js.map
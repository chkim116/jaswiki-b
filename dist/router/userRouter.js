"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_1 = require("../controller/userController");
var userRouter = express_1.default.Router();
// user
userRouter.post("/", userController_1.getLogin);
userRouter.post("/register", userController_1.postRegister, userController_1.getLogin);
userRouter.get("/auth", userController_1.getAuth, userController_1.sendUserData);
userRouter.get("/logout", userController_1.logout);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map
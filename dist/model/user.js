"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
var UserSchema = new mongoose_1.default.Schema({
    userId: String,
    password: String,
    email: String,
    contribute: { type: Number, default: 0 },
    level: { type: Number, default: 1, max: 7 },
    docs: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Docs",
        },
    ],
    contriDocs: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Docs",
        },
    ],
});
UserSchema.plugin(passport_local_mongoose_1.default, {
    usernameField: "userId",
    passwordField: "password",
});
var model = mongoose_1.default.model("User", UserSchema);
exports.default = model;
//# sourceMappingURL=user.js.map
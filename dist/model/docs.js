"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var DocsSchema = new mongoose_1.default.Schema({
    title: String,
    secret: Boolean,
    description: String,
    content: String,
    stack: Array,
    creator: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    recentCreator: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    contributer: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    createDate: String,
    recentUpdate: String,
});
var model = mongoose_1.default.model("Docs", DocsSchema);
exports.default = model;
//# sourceMappingURL=docs.js.map
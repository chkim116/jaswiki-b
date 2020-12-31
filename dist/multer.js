"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
var multer_1 = __importDefault(require("multer"));
var multer_s3_1 = __importDefault(require("multer-s3"));
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var s3 = new aws_sdk_1.default.S3({
    secretAccessKey: process.env.AMAZONE_ACCESS_KEY,
    accessKeyId: process.env.AMAZONE_PASSWORD,
    region: "ap-northeast-2",
});
var multerImg = multer_1.default({
    storage: multer_s3_1.default({
        s3: s3,
        acl: "public-read",
        bucket: "jaswiki/wikiimg",
    }),
});
exports.uploadImage = multerImg.single("image");
//# sourceMappingURL=multer.js.map
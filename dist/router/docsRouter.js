"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var docController_1 = require("../controller/docController");
var multer_1 = require("../multer");
var docsRouter = express_1.default.Router();
// docs
docsRouter.get("/", docController_1.getDocs);
docsRouter.get("/:id", docController_1.getDocById);
docsRouter.get("/user/:id", docController_1.getDocsByUser);
docsRouter.post("/search", docController_1.searchDocs);
docsRouter.post("/post", docController_1.postDocs);
docsRouter.put("/put/:id", docController_1.putDocs);
docsRouter.delete("/del/:router/:id", docController_1.delDocs);
docsRouter.post("/img", multer_1.uploadImage, docController_1.postImg);
exports.default = docsRouter;
//# sourceMappingURL=docsRouter.js.map
import express from "express";
import {
    delDocs,
    getDocById,
    getDocs,
    postDocs,
    postImg,
    putDocs,
    searchDocs,
} from "../controller/docController";
import { uploadImage } from "../multer";

const docsRouter = express.Router();

// docs

docsRouter.get("/", getDocs);

docsRouter.get("/:id", getDocById);

docsRouter.post("/search", searchDocs);

docsRouter.post("/post", postDocs);

docsRouter.put("/put/:id", putDocs);

docsRouter.delete("/del/:router/:id", delDocs);

docsRouter.post("/img", uploadImage, postImg);

export default docsRouter;

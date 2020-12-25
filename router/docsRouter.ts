import express from "express";
import {
    delDocs,
    getDocs,
    postDocs,
    putDocs,
} from "../controller/docController";

const docsRouter = express.Router();

// docs

docsRouter.get("/", getDocs);

docsRouter.post("/post", postDocs);

docsRouter.put("/put", putDocs);

docsRouter.delete("/del", delDocs);

export default docsRouter;

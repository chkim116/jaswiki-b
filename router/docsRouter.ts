import express from "express";
import {
    delDocs,
    getDocById,
    getDocs,
    postDocs,
    putDocs,
} from "../controller/docController";

const docsRouter = express.Router();

// docs

docsRouter.get("/", getDocs);

docsRouter.get("/:id", getDocById);

docsRouter.post("/post", postDocs);

docsRouter.put("/put/:id", putDocs);

docsRouter.delete("/del/:id", delDocs);

export default docsRouter;

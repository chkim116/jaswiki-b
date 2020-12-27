import express from "express";
import {
    delDocs,
    getDocById,
    getDocs,
    postDocs,
    putDocs,
    searchDocs,
} from "../controller/docController";

const docsRouter = express.Router();

// docs

docsRouter.get("/", getDocs);

docsRouter.get("/:id", getDocById);

docsRouter.post("/search", searchDocs);

docsRouter.post("/post", postDocs);

docsRouter.put("/put/:id", putDocs);

docsRouter.delete("/del/:router/:id", delDocs);

export default docsRouter;

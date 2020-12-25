import mongoose from "mongoose";

const DocsScheme = new mongoose.Schema({
    title: String,
    secret: String,
    description: String,
    content: String,
    stack: [{ type: Number }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    recentCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    contributer: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    createDate: String,
    recentUpdate: String,
});

const model = mongoose.model("Docs", DocsScheme);

export default model;

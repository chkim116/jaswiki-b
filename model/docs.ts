import mongoose, { Document, Schema } from "mongoose";

export interface DocsType extends Document {
    _id?: string;
    title: string;
    description: string;
    content: string;
    stack: number[];
    creator: string;
    createDate: string;
    recentCreator: string;
    recentUpdate: string;
    contributer?: string[];
    secret?: boolean;
}

const DocsSchema: Schema = new mongoose.Schema({
    title: String,
    secret: Boolean,
    description: String,
    content: String,
    stack: Array,
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

const model = mongoose.model<DocsType>("Docs", DocsSchema);

export default model;

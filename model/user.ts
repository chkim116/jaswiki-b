import mongoose from "mongoose";

const UserScheme = new mongoose.Schema({
    userId: String,
    password: String,
    email: String,
    contribute: Number,
    level: Number,
    docs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "docs",
        },
    ],
});

const model = mongoose.model("User", UserScheme);

export default model;

import mongoose, { Document, PassportLocalSchema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

export interface UserType extends Document {
    _id?: string;
    userId: string;
    password: string;
    email: string;
    level: number;
    contribute?: number;
    docs?: string[];
    contriDocs?: string[];
    token?: string | any;
}

const UserSchema = new mongoose.Schema({
    userId: String,
    password: String,
    email: String,
    contribute: { type: Number, default: 0 },
    level: { type: Number, default: 1, max: 7 },
    docs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Docs",
        },
    ],
    contriDocs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Docs",
        },
    ],
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: "userId",
    passwordField: "password",
});

const model = mongoose.model<UserType>(
    "User",
    UserSchema as PassportLocalSchema
);

export default model;

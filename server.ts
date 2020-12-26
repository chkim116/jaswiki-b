import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import "./db";
import docsRouter from "./router/docsRouter";
import userRouter from "./router/userRouter";
import passport from "passport";
import "./passport";
import mongoose from "mongoose";
import mongoStore from "connect-mongo";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

class App {
    public application: express.Application;
    constructor() {
        this.application = express();
    }
}

const app = new App().application;
const cookieStore = mongoStore(session);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(
    session({
        secret: process.env.COOKIE_SECRET as string,
        resave: true,
        saveUninitialized: false,
        store: new cookieStore({ mongooseConnection: mongoose.connection }),
    })
);

app.get("/", (req, res) => {
    res.send("반갑습니다");
});

app.use("/user", userRouter);
app.use("/docs", docsRouter);

app.listen(process.env.PORT || 4000, () => {
    console.log("server on", `http://localhost:${process.env.PORT || 4000} `);
});

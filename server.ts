import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import "./db";

import userRouter from "./router/userRouter";

class App {
    public application: express.Application;
    constructor() {
        this.application = express();
    }
}

const app = new App().application;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", userRouter);

app.listen(process.env.PORT || 4000, () => {
    console.log("server on", `http://localhost:${process.env.PORT || 4000} `);
});

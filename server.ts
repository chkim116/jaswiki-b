import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import "./db";
import docsRouter from "./router/docsRouter";
import userRouter from "./router/userRouter";
import passport from "passport";
import "./passport";
import helmet from "helmet";
import hpp from "hpp";
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

app.use(morgan("dev"));
app.use(hpp());
app.use(helmet());
app.use(cookieParser());
app.use(
    cors({
        origin:
            process.env.NODE_ENV === "production"
                ? ["https://jaswiki.com", "https://jaswiki.netlify.app"]
                : "http://localhost:3000",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("반갑습니다");
});

app.use("/user", userRouter);
app.use("/docs", docsRouter);

app.listen(process.env.PORT || 4000, () => {
    console.log("server on", "https://jaswikib.ml");
});

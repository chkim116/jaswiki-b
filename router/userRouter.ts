import express from "express";
import {
    getAuth,
    getLogin,
    kakaoAuthCallback,
    kakaoLogin,
    logout,
    postRegister,
    sendUserData,
} from "../controller/userController";
import passport from "passport";

const userRouter = express.Router();

// user

userRouter.post("/", getLogin);
userRouter.post("/register", postRegister, getLogin);
userRouter.get("/auth", getAuth, sendUserData);
userRouter.get("/logout", logout);

userRouter.get("/kakao", passport.authenticate("kakao"));

userRouter.get(
    "/kakao/oauth",
    passport.authenticate("kakao", { failureRedirect: "/" }),
    (req, res) => {
        console.log(req);
        res.redirect("/");
    }
);

export default userRouter;

import express from "express";
import {
    getAuth,
    getLogin,
    kakaoAuthCallback,
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

userRouter.get("/kakao/oauth", kakaoAuthCallback);

export default userRouter;

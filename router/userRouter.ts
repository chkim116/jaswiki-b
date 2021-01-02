import express from "express";
import {
    getAuth,
    getLogin,
    logout,
    postRegister,
    sendUserData,
} from "../controller/userController";

const userRouter = express.Router();

// user

userRouter.post("/", getLogin);
userRouter.post("/register", postRegister, getLogin);
userRouter.get("/auth", getAuth, sendUserData);
userRouter.get("/logout", logout);

export default userRouter;

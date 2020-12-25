import express from "express";
import { getAuth, getLogin, postRegister } from "../controller/userController";

const userRouter = express.Router();

// user

userRouter.get("/", getLogin);
userRouter.post("/register", postRegister);
userRouter.get("/auth", getAuth);

export default userRouter;

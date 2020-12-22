import express from "express";
import { getLogin } from "../controller/userController";

const userRouter = express.Router();

userRouter.get("/", getLogin);

export default userRouter;

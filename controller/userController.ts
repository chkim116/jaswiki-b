import { NextFunction, Request, Response } from "express";
import User, { UserType } from "../model/user";
import bcrypt from "bcrypt";
import passport from "passport";

export const getLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            res.status(401).send({
                message: "아이디나 비밀번호를 다시 입력해 주세요.",
            });
        } else {
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                } else {
                    return res.json(user);
                }
            });
        }
    })(req, res, next);
};

export const postRegister = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId, password, email } = req.body;
    try {
        const salt = await bcrypt.genSalt(10); // hash
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await new User({
            userId,
            password: hashPassword,
            email,
            level: 1,
        });
        await User.register(user, password);
        next();
    } catch (err) {
        console.error(err);
        res.status(401);
    }
};

export const getAuth = async (req: Request, res: Response) => {
    const loggedUser = (await req.user) || null;
    if (!loggedUser) {
        console.log("유저없음");
        res.status(401).json({ message: "유저없음" });
        return;
    }
    try {
        const {
            _id,
            userId,
            email,
            contribute,
            level,
            docs,
        } = loggedUser as UserType;
        const user = {
            _id,
            userId,
            email,
            contribute,
            level,
            docs,
        };
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(401);
    }
};

export const logout = (req: Request, res: Response) => {
    try {
        req.logout();
        res.status(200);
    } catch (err) {
        console.log(err);
        res.status(401);
    }
};

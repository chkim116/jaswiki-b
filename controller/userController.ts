import { CookieOptions, NextFunction, Request, Response } from "express";
import User from "../model/user";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserType } from "../model/user";
dotenv.config();

export const getLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            res.status(400).json("아이디나 비밀번호를 다시 입력해 주세요.");
        } else {
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                const token = jwt.sign(
                    { userID: user._id },
                    process.env.JWT_SECRET as string
                );
                user.token = token;
                user.save((err: any, user: any) => {
                    if (err) {
                        return res.status(400).json(err);
                    }
                    const options: CookieOptions = {
                        maxAge: 1000 * 60 * 60 * 24 * 7,
                        httpOnly: process.env.NODE_ENV === "production",
                        secure: process.env.NODE_ENV === "production",
                        sameSite:
                            process.env.NODE_ENV === "production"
                                ? "none"
                                : "lax",
                    };
                    return res
                        .cookie("x_auth", user.token, options)
                        .status(200)
                        .json({
                            _id: user._id,
                            email: user.email,
                            userId: user.userId,
                            contribute: user.contribute,
                            level: user.level,
                            docs: user.docs,
                            token: user.token,
                        });
                });
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
        res.status(401).json("회원가입에 실패하셨습니다.");
    }
};

export const getAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.x_auth;
    if (token === undefined || token === "") {
        return;
    }

    jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        (err: any, decoded: any) => {
            if (err) {
                return res.status(500).json({ message: "token decode 실패" });
            }
            User.findOne({ _id: decoded.userID }, (err: any, user: any) => {
                if (err) {
                    return res.json("유저가 존재하지 않습니다.");
                }
                if (!user) {
                    return res
                        .status(400)
                        .json("token과 맞는 유저가 없습니다.");
                }
                if (user) {
                    (req as any).token = token;
                    req.user = user;
                }
                next();
            });
        }
    );
};

export const sendUserData = async (req: Request, res: Response) => {
    res.status(200).json({
        _id: (req.user as UserType)._id,
        email: (req.user as UserType).email,
        userId: (req.user as UserType).userId,
        contribute: (req.user as UserType).contribute,
        level: (req.user as UserType).level,
        docs: (req.user as UserType).docs,
    });
};

export const logout = (req: Request, res: Response) => {
    (req as any).token = "";
    return res.clearCookie("x_auth").status(200).json("clear!");
};

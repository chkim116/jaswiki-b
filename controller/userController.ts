import { Request, Response } from "express";

export const getLogin = (req: Request, res: Response) => {
    res.send("Hello server");
};

export const postRegister = (req: Request, res: Response) => {};

export const getAuth = (req: Request, res: Response) => {};

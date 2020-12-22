import { Request, Response } from "express";

export const getLogin = (req: Request, res: Response) => {
    res.send("Hello server");
};

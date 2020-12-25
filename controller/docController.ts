import { Request, Response } from "express";

export const getDocs = (req: Request, res: Response) => {
    res.send("Hello server");
};

export const postDocs = (req: Request, res: Response) => {};

export const putDocs = (req: Request, res: Response) => {};

export const delDocs = (req: Request, res: Response) => {};

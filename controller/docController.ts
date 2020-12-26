import { Request, Response } from "express";
import Docs, { DocsType } from "../model/docs";

export const getDocs = async (req: Request, res: Response) => {
    try {
        const docs = await Docs.find({}).sort({ _id: -1 });
        res.status(200).json(docs);
    } catch (err) {
        console.error(err);
        res.status(401);
    }
};

export const getDocById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const docs = await Docs.findById(id);
        res.status(200).json(docs);
    } catch (err) {
        console.error(err);
        res.status(401);
    }
};

export const postDocs = async (req: Request, res: Response) => {
    const { title, description, content, stack, creator }: DocsType = req.body;
    try {
        const doc = await Docs.create({
            title: title,
            secret: false,
            description: description,
            content: content,
            stack: stack,
            creator: creator,
            createDate: new Date().toLocaleString(),
            recentCreator: creator,
            recentUpdate: new Date().toLocaleString(),
            contributer: [creator],
        });
        (req as any).user.contribute += 100;
        (req as any).user.save();
        res.status(200).json(doc._id);
    } catch (err) {
        console.error(err);
        res.status(401);
    }
};

export const putDocs = async (req: Request, res: Response) => {
    const { title, description, content, stack, recentCreator } = req.body;
    const { id } = req.params;
    try {
        const doc = await Docs.findOneAndUpdate(
            { _id: id },
            {
                title,
                description,
                content,
                stack,
                recentCreator,
                recentUpdate: new Date().toLocaleString(),
            }
        );
        await doc?.contributer?.push(recentCreator._id);
        (req as any).user.docs.push(id);
        (req as any).user.contribute += 50;
        (req as any).user.save();
        res.status(200).json(id);
    } catch (err) {
        console.error(err);
        res.status(401);
    }
};

export const delDocs = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await Docs.findOneAndDelete({ _id: id });
        res.status(200);
    } catch (err) {
        console.error(err);
        res.status(401);
    }
};

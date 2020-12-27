import { Request, Response } from "express";
import Docs, { DocsType } from "../model/docs";
import User, { UserType } from "../model/user";

export const getDocs = async (req: Request, res: Response) => {
    try {
        const docs = await Docs.find({}).sort({ _id: -1 }).limit(10);
        res.status(200).json(docs);
    } catch (err) {
        console.error(err);
        res.status(401);
    }
};

export const searchDocs = async (req: Request, res: Response) => {
    const { q } = req.query;
    const text = q as string;
    try {
        const docs = await Docs.find({
            description: { $regex: text, $options: "i" },
        })
            .populate("creator")
            .sort({ _id: -1 });
        console.log(docs);
        res.status(200).json(docs);
    } catch (err) {
        console.error(err);
        res.status(401);
    }
};

export const getDocById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const docs = await Docs.findById(id)
            .populate("contributer")
            .populate("creator");
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
            stack: [...stack],
            creator: creator,
            createDate: new Date().toLocaleDateString(),
            recentCreator: creator,
            recentUpdate: new Date().toLocaleDateString(),
            contributer: [creator],
        });
        const user = (await User.findById(creator)) as UserType;
        (user as any).contribute += 100;
        (user as any).docs.push(doc._id);
        user.save();
        res.status(200).json(doc._id);
    } catch (err) {
        console.error(err);
        res.status(401);
    }
};

export const putDocs = async (req: Request, res: Response) => {
    const { title, description, content, stack, creator } = req.body;
    const { id } = req.params;
    try {
        const doc = await Docs.findByIdAndUpdate(
            { _id: id },
            {
                title,
                description,
                content,
                stack,
                recentCreator: creator,
                recentUpdate: new Date().toLocaleString(),
            }
        );
        await doc?.contributer?.push(creator);
        const user = (await User.findById(creator)) as UserType;
        (user as any).docs.push(id);
        (user as any).contribute += 50;
        user.save();
        res.status(200).json(id);
    } catch (err) {
        console.error(err);
        res.status(401);
    }
};

export const delDocs = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await Docs.findByIdAndDelete({ _id: id });
        res.status(200);
    } catch (err) {
        console.error(err);
        res.status(401);
    }
};

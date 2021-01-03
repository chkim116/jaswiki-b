import { Request, Response } from "express";
import Docs, { DocsType } from "../model/docs";
import User, { UserType } from "../model/user";
import mongoose from "mongoose";

const user = () => "userId level _id";

export const getDocs = async (req: Request, res: Response) => {
    try {
        const docs = await Docs.find({}).sort({ _id: -1 }).limit(20);
        res.status(200).json(docs);
    } catch (err) {
        console.error(err);
        res.status(401);
    }
};

export const getDocsByUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).populate("docs");
        res.status(200).json(user);
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
            .populate("creator", user())
            .sort({ _id: -1 });
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
            .populate("contributer", user())
            .populate("creator", user())
            .populate("recentCreator", user());
        res.status(200).json(docs);
    } catch (err) {
        console.error(err);
        res.status(401);
    }
};

export const postDocs = async (req: Request, res: Response) => {
    const {
        title,
        description,
        content,
        stack,
        creator,
        secret,
    }: DocsType = req.body;
    try {
        const doc = await Docs.create({
            title: title,
            secret,
            description: description,
            content: content,
            stack: [...stack],
            creator: creator,
            createDate: new Date().toLocaleDateString(),
            recentCreator: creator,
            recentUpdate: new Date().toLocaleDateString(),
            contributer: [creator],
        });

        // 글 작성시 100점 추가
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
    const { title, description, content, stack, creator, secret } = req.body;
    const { id } = req.params;

    try {
        const doc = await Docs.findByIdAndUpdate(
            { _id: id },
            {
                title,
                description,
                content,
                stack,
                secret,
                recentCreator: creator
                    ? creator
                    : mongoose.Types.ObjectId("5fec21a5a66346e4f6fb44bc"),
                recentUpdate: new Date().toLocaleDateString(),
            }
        );

        if (creator === "") {
            return res.status(200).json(id);
        }

        // 업데이트한 자가 작성자가 아니고, 기여자 목록에도 포함되어 있지 않는 유저라면 기여자 업데이트
        if (!doc?.contributer?.includes(creator) && doc?.creator !== creator) {
            await doc?.contributer?.push(creator);
            (doc as DocsType).save();
        }

        const user = (await User.findById(creator)) as UserType;
        const checkDocsInUser = user.docs?.includes(id as string);
        const checkContriInUser = user.contriDocs?.includes(id as string);

        // 만약 기여를 하지 않았고, 작성자도 아니라면 기여도 +50점
        if (!checkDocsInUser && !checkContriInUser) {
            (user as any).contriDocs.push(id);
            (user as any).contribute += 50;
            user.save();
        }
        res.status(200).json(id);
    } catch (err) {
        console.error(err);
        res.status(401);
    }
};

export const delDocs = async (req: Request, res: Response) => {
    const { router, id } = req.params;
    try {
        await Docs.findByIdAndDelete({ _id: router });

        const user = await User.findById(id);
        const checkDocs = user?.docs?.includes(router);
        if (checkDocs) {
            const index = user?.docs?.indexOf(router) as number;
            user?.docs?.splice(index, 1);
            user?.save();
        }

        res.status(200);
    } catch (err) {
        console.error(err);
        res.status(401);
    }
};

export const postImg = (req: Request, res: Response) => {
    const { file } = req;
    const location = (file as any).location;
    try {
        res.status(200).json(location);
    } catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
};

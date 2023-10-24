import { Request, Response } from "express";
import { getCoursesUserServices, getUserServices, postUserServices } from "../services/users.services";
import { ZodError } from "zod";

export const postUserController = async (req: Request, res: Response) => {
    try {
        const response = await postUserServices(req.body);
        return res.status(201).json(response);
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: "Invalid user data" });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getUserController = async (req: Request, res: Response) => {
    const response = await getUserServices(req.params.id);
    return res.status(200).json(response);
};

export const getCoursesUserController = async (req: Request, res: Response) => {
    const response = await getCoursesUserServices(req.params.id);
    return res.status(200).json(response);
};

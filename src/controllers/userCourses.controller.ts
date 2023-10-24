import { Request, Response } from "express";
import { ZodError } from "zod";
import { getUserCourseServices, postUserCourseServices } from "../services/userCourses.services";

export const postUserCourseController = async (req: Request, res: Response) => {
    try {
        const response = await postUserCourseServices(req.params.courseId, req.params.userId);
        return res.status(201).json(response);
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: "Invalid user data" });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getUserCourseController = async (req: Request, res: Response) => {
    const response = await getUserCourseServices(req.params.id);
    return res.status(200).json(response);
};

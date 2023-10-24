import { ZodError } from "zod";
import { deleteCoursesServices, getCourseServices, postCourseServices } from "../services/courses.services";
import { Request, Response } from "express";

export const postCourseController = async (req: Request, res: Response) => {
    try {
        const response = await postCourseServices(req.body);
        return res.status(201).json(response);
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: "Invalid user data" });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getCourseController = async (req: Request, res: Response) => {
    const response = await getCourseServices();
    return res.status(200).json(response);
};

export const deleteCoursesController = async (req: Request, res: Response) => {
    const response = await deleteCoursesServices(req.params.id);
    return res.status(204).json(response);
}

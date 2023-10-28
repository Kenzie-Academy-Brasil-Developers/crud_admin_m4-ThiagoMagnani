import { courseRead } from "../interfaces/courses.interfaces";
import { getCourseServices, postCourseServices } from "../services/courses.services";
import { Request, Response } from "express";

export const postCourseController = async (req: Request, res: Response) => {
    const response = await postCourseServices(req.body);
    return res.status(201).json(response);
}

export const getCourseController = async (req: Request, res: Response) => {
    const response: courseRead = await getCourseServices();
    return res.status(200).json(response);
};

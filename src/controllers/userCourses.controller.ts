import { Request, Response } from "express";
import { getUserCourseServices, postUserCourseServices } from "../services/userCourses.services";
import { updateCourseService } from "../services/courses.services";
import { UserCoursesRead, userCourses } from "../interfaces/userCourses.interfaces";

export const postUserCourseController = async (req: Request, res: Response) => {
    await postUserCourseServices(req.params.userId, req.params.courseId);
    return res.status(201).json({ message: "User successfully vinculed to course" });
}

export const getUserCourseController = async (req: Request, res: Response) => {
    const response: UserCoursesRead = await getUserCourseServices(req.params.id);
    return res.status(200).json(response);
};

export const updateCourseController = async (req: Request, res: Response) => {
    const response: userCourses = await updateCourseService(req.params.courseId, req.params.userId);
    return res.status(204).json(response);
}

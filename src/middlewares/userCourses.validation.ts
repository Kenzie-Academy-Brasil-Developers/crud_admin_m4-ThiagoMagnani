import { client } from "../database";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { userResult } from "../interfaces/users.interfaces";
import { courseResult } from "../interfaces/courses.interfaces";

export const userCourseExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { userId } = req.params;
    if (!userId) return next()
    const result: userResult = await client.query(
        `SELECT * FROM users WHERE id = $1;`,
        [userId]
    )
    if (!result.rowCount) {
        throw new AppError("User/course not found", 404);
    }
    return next()
}

export const couseUsersExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { courseId } = req.params;
    if (!courseId) return next()
    const result: courseResult = await client.query(
        `SELECT * FROM courses WHERE id = $1;`,
        [courseId]
    )
    if (!result.rowCount) {
        throw new AppError("User/course not found", 404);
    }
    return next()
}

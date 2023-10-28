import { client } from "../database";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { userResult } from "../interfaces/users.interfaces";

export const userCourseExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { userId } = req.params;
    if (!userId) return next()
    const result: userResult = await client.query(
        `SELECT * FROM users WHERE id = $1;`,
        [userId]
    )
    if (!result) {
        throw new AppError("User/course not found", 409);
    }
    return next()
}

export const couseUsersExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { curseId } = req.params;
    if (!curseId) return next()
    const result: userResult = await client.query(
        `SELECT * FROM curses WHERE id = $1;`,
        [curseId]
    )
    if (!result) {
        throw new AppError("User/course not found", 409);
    }
    return next()
}

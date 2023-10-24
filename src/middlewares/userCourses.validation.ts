import { QueryConfig } from "pg";
import { client } from "../database";
import { NextFunction, Request, Response } from "express";

export const userCourseExists = async (req: Request, res: Response, next: NextFunction) => {
    const queryString = `SELECT * FROM "userCourses" WHERE "userId" = $1;`;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.params.id],
    };
    const { rowCount } = await client.query(queryConfig);
    if (rowCount > 0) {
        return res.status(409).json({ message: "User/course not found" });
    }
    return next();
}

export const CoursesUserExists = async (req: Request, res: Response, next: NextFunction) => {
    const queryString = `SELECT * FROM "userCourses" WHERE "courseId" = $1;`;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.params.id],
    };
    const { rowCount } = await client.query(queryConfig);
    if (rowCount > 0) {
        return res.status(409).json({ message: "No course found" });
    }
    return next();
}

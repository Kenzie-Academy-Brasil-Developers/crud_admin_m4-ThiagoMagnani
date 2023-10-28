import { client } from "../database";
import format from "pg-format";
import { userCourses, userCoursesResult } from "../interfaces/userCourses.interfaces";
import { AppError } from "../errors";

export const postUserCourseServices = async (userId: string, courseId: string): Promise<userCourses> => {
    const queryFormat = format(
        `INSERT INTO "userCourses" ("userId", "courseId") VALUES ($1, $2) RETURNING *;`);
    const query: userCoursesResult = await client.query(queryFormat, 
    [userId, courseId]);
    return query.rows[0];
};

export const getUserCourseServices = async (id: string) => {
    const query: string = `
    SELECT 
    users.id AS "userId",
    users.name AS "userName",
    courses.id AS "courseId",
    courses.name AS "courseName",
    courses.description AS "courseDescription",
    "userCourses".active AS "userActiveInCourse"
    FROM users
    JOIN "userCourses" ON "userCourses"."userId" = users.id
    JOIN courses ON "userCourses"."courseId" = courses.id
    WHERE "courseId" = $1;`;
    const queryResult: userCoursesResult = await client.query(query, [id]);
    if (!queryResult.rowCount) {
        throw new AppError("User/course not found", 404)
    }
    return queryResult.rows;
};

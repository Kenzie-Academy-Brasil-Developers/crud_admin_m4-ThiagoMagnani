import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import format from "pg-format";
import { userCourses } from "../interfaces/userCourses.interfaces";

export const postUserCourseServices = async (courseId: string, userId: string) => {
    const queryString = format(`INSERT INTO "userCourses" ("userId", "courseId") VALUES ($1, $2) RETURNING *;`);
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId, courseId],
    };
    const data: QueryResult<userCourses> = await client.query(queryConfig);
    return data.rows[0];
}

export const getUserCourseServices = async (id: string) => {
    const queryString = `
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
    WHERE courses.id = $1;`;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };
    const data: QueryResult<userCourses> = await client.query(queryConfig);
    if (data.rows.length === 0) {
        return null;
    }
    return data.rows[0];
};

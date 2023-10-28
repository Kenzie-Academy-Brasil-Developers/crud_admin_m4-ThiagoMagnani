import { client } from "../database";
import { courseRead, courseResult, courses } from "../interfaces/courses.interfaces";
import format from 'pg-format';
import { userCourses, userCoursesResult } from "../interfaces/userCourses.interfaces";

export const postCourseServices = async (payload: courses): Promise<courses> => {
    const queryFormat: string = format(
        `INSERT INTO courses (name, description) VALUES ($1, $2) RETURNING *;`);
    const query: courseResult = await client.query(queryFormat,
        [payload.name, payload.description]);
    return query.rows[0];
};

export const getCourseServices = async (): Promise<courseRead> => {
    const query: courseResult = await client.query(`SELECT * FROM "userCourses";`);
    return query.rows;
};

export const updateCourseService = async (courseId: string, userId: string): Promise<userCourses> => {
    const queryFormat: string = format(
        `UPDATE "userCourses" SET active = FALSE WHERE "courseId" = $1 AND "userId" = $2;`);
    const query: userCoursesResult = await client.query(queryFormat, [courseId, userId]);
    return query.rows[0];
};

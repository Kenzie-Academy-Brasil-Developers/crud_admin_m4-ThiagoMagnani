import { userCreate, UserRead, userResult } from "../interfaces/users.interfaces";
import { client } from "../database";
import format from 'pg-format';
import { userCoursesResult } from "../interfaces/userCourses.interfaces";
import { hash } from "bcryptjs";
import { AppError } from "../errors";

export const createUserService = async (payload: userCreate): Promise<userCreate> => {
    payload.password = await hash(payload.password, 10);
    const queryFormat: string = format(
        'INSERT INTO users (%I) VALUES (%L) RETURNING id, name, email, admin;',
        Object.keys(payload),
        Object.values(payload)
    );
    const query: userResult = await client.query(queryFormat);
    return query.rows[0];
};

export const getUserServices = async (): Promise<UserRead[]> => {
    const query: userResult = await client.query(`SELECT name, email, admin FROM users;`);
    return query.rows;
};

export const getCoursesUserServices = async (id: string) => {
    const query: string = `
    SELECT 
    courses.id AS "courseId",
    courses.name AS "courseName",
    courses.description AS "courseDescription",
    "userCourses".active AS "userActiveInCourse",
    users.id AS "userId",
    users.name AS "userName"
    FROM users
    JOIN "userCourses" ON "userCourses"."userId" = users.id
    JOIN courses ON "userCourses"."courseId" = courses.id
    WHERE "userId" = $1;`;
    const queryResult: userCoursesResult = await client.query(query, [id]);
    if (!queryResult.rowCount) {
        throw new AppError('No course found', 404)
    }
    return queryResult.rows;
};

import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { courses } from "../interfaces/courses.interfaces";
import { courseSchema } from "../schemas/courses.schema";
import format from 'pg-format';
import { TCourseCreate } from "../__tests__/mocks/interfaces";

export const postCourseServices = async (body: TCourseCreate) => {
    const { name, description } = courseSchema.parse(body);
    const queryString = format(`INSERT INTO courses (name, description) VALUES ($1, $2) RETURNING *;`);
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [name, description],
    };
    const data: QueryResult<courses> = await client.query(queryConfig);
    return data.rows[0];
}

export const getCourseServices = async () => {
    const queryString = `SELECT * FROM courses`;
    const data: QueryResult<courses> = await client.query(queryString);
    return data.rows;
};

export const deleteCoursesServices = async (id: string) => {
    const queryString = `DELETE FROM courses WHERE id = $1;`;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    }
    const data: QueryResult<courses> = await client.query(queryConfig);
    await client.query(queryConfig);
    return data.rows[0];
}

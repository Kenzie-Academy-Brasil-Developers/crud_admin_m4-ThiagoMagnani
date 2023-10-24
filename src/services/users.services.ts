import { QueryConfig, QueryResult } from "pg";
import { users } from "../interfaces/users.interfaces";
import { client } from "../database";
import { userSchema } from "../schemas/users.schema";
import format from 'pg-format';
import { hashSync } from "bcryptjs";
import { TUserCreate } from "../__tests__/mocks/interfaces";

export const postUserServices = async (body: TUserCreate) => {
    body.password = hashSync(body.password, 12);
    const { name, email, password, admin } = userSchema.parse(body);
    const queryString = format(`INSERT INTO users (name, email, password, admin) VALUES ($1, $2, $3, $4) RETURNING *;`);
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [name, email, password, admin],
    };
    const data: QueryResult<users> = await client.query(queryConfig);
    return data.rows[0];
}

export const getUserServices = async (id: string) => {
    const queryString = `SELECT name, email, password, admin FROM users WHERE id = $1;`;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };
    const data: QueryResult<users> = await client.query(queryConfig);
    if (data.rows.length === 0) {
        return null;
    }
    return data.rows[0];
};

export const getCoursesUserServices = async (id: string) => {
    const queryString = `SELECT * FROM "userCourses" WHERE id = $1;`;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };
    const data: QueryResult<users> = await client.query(queryConfig);
    if (data.rows.length === 0) {
        return null;
    }
    return data.rows[0];
};

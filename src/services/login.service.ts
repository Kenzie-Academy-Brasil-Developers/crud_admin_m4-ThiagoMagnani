import "dotenv/config";
import { sign } from "jsonwebtoken";
import { client } from "../database";
import { AppError } from "../errors";
import { userResult, users } from "../interfaces/users.interfaces";
import { sessionRequest } from "../interfaces/session.interfaces";
import { compare } from "bcryptjs";

export const loginService = async (data: sessionRequest): Promise<{ token: string }> => {
    const queryString: string = `SELECT * FROM users WHERE email = $1;`;
    const queryResult: userResult = await client.query(queryString, [data.email])
    if (queryResult.rows.length === 0) {
        throw new AppError('Wrong email/password', 401);
    }
    const user: users = queryResult.rows[0]
    const passMatch = await compare(data.password, user.password);
    if (!passMatch) {
        throw new AppError('Wrong email/password', 401);
    }
    const token: string = sign(
        { email: user.email, admin: user.admin },
        process.env.SECRET_KEY!,
        { expiresIn: process.env.EXPIRES_IN!, subject: user.id.toString() }
    )
    return { token };
}

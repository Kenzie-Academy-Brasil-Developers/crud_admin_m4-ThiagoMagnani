import { client } from "../database";
import format from "pg-format";
import { compareSync } from "bcryptjs";
import { users } from "../interfaces/users.interfaces";
import { userLogin } from "../interfaces/userLogin.interfaces";
import { sign } from "jsonwebtoken";
import { AppError } from "../errors";
import "dotenv/config";

export const loginServices = async (body: userLogin) => {
    const { email, password } = body;
    const queryString: string = `SELECT * FROM users WHERE email = %L;`;
    const queryFormat: string = format(queryString, email);
    const queryResult = await client.query(queryFormat);
    const user: users = queryResult.rows[0];
    if (user == undefined) {
        throw new AppError("Wrong email/password", 401);
    }
    const passwordIsValid: boolean = compareSync(password, user.password);
    if (!passwordIsValid) {
        throw new AppError("Wrong email/password", 401);
    }
    const token = sign(
        {
            email: user.email,
            admin: user.admin
        },
        String(process.env.SECRET_KEY!),
        {
            expiresIn: process.env.EXPIRES_IN,
            subject: String(user.id),
        }
    );
    return token;
}

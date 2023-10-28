import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { AppError } from "../errors";
import { userResult } from "../interfaces/users.interfaces";

export const isUserValidEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email } = req.body;
    if (!email) return next()
    const user: userResult = await client.query(
        `SELECT * FROM users WHERE email = $1;`,
        [email]
    );
    if (user.rows[0]) {
        throw new AppError("Email already registered", 409);
    }
    return next();
}

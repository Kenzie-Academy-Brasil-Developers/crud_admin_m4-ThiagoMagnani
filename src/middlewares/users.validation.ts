import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { z } from 'zod';

export const isUserValidEmail = async (req: Request, res: Response, next: NextFunction) => {
    const email = z.string().email().parse(req.body.email);
    const queryString = "SELECT * FROM users WHERE email = $1";
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [email],
    };
    const { rowCount } = await client.query(queryConfig);
    if (rowCount > 0) {
        return res.status(409).json({ message: "Email already registered" });
    }
    return next();
}

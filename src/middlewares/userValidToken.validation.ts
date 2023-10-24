import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors";

export const userValidToken = (req: Request, res: Response, next: NextFunction): void => {
    const authorization: String | undefined = req.headers.authorization;
    if (authorization == undefined) {
        throw new AppError("Missing bearer token", 401);
    }
    const [_bearer, token] = authorization.split(" ");
    verify(token, String(process.env.SECRET_KEY), (error: any, decoded: any) => {
        if (error) {
            throw new AppError(error.message, 401);
        }
        res.locals.admin = decoded.admin;
        res.locals.email = decoded.email;
        res.locals.id = decoded.id;
    });
    return next();
}

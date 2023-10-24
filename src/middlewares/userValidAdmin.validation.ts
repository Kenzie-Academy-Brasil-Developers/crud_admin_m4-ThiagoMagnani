import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const userPermission = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const admin = res.locals.decoded;
    const sub = res.locals.decoded;
    if (admin) {
        return next();
    }
    if (userId !== sub) {
        throw new AppError("Insufficient permission", 403);
    }
    return next();
}

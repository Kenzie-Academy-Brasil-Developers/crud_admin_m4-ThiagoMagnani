import { NextFunction, Request, Response } from "express";
import { ZodError, ZodTypeAny } from "zod";

export const isBodyValid = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction): Response | void => {
    try {
        const validated = schema.parse(req.body);
        req.body = validated;
        return next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ message: error.flatten().fieldErrors });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export default isBodyValid;

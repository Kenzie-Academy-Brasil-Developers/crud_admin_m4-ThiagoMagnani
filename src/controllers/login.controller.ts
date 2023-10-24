import { Request, Response } from "express";
import { loginServices } from "../services/login.service";

export const login = async (req: Request, res: Response) => {
    const token = await loginServices(req.body);
    return res.status(200).json({ token });
}

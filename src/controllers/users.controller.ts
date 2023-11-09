import { Request, Response } from "express";
import { createUserService, getCoursesUserServices, getUserServices } from "../services/users.services";
import { UserRead, userCreate } from "../interfaces/users.interfaces";

export const postUserController = async (req: Request, res: Response): Promise<Response> => {
    const response: userCreate = await createUserService(req.body);
    return res.status(201).json(response);
}

export const getUserController = async (req: Request, res: Response): Promise<Response> => {
    const response: UserRead[] = await getUserServices();
    return res.status(200).json(response);
};

export const getCoursesUserController = async (req: Request, res: Response): Promise<Response> => {
    const response = await getCoursesUserServices(req.params.id);
    return res.status(200).json(response);
};

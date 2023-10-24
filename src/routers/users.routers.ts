import { Router } from "express";
import { isUserValidEmail } from "../middlewares/users.validation";
import { getCoursesUserController, getUserController, postUserController } from "../controllers/users.controller";
import isBodyValid from "../middlewares/body.validation";
import { userSchema } from "../schemas/users.schema";
import { CoursesUserExists } from "../middlewares/userCourses.validation";
import { userValidToken } from "../middlewares/userValidToken.validation";
import { userPermission } from "../middlewares/userValidAdmin.validation";

const usersRouter = Router();

usersRouter.post("/", isUserValidEmail, isBodyValid(userSchema), postUserController);
usersRouter.use(userValidToken, userPermission);
usersRouter.get("/:id", getUserController);
usersRouter.get("/:id/courses", CoursesUserExists, getCoursesUserController);

export default usersRouter;

import { Router } from "express";
import { isUserValidEmail } from "../middlewares/users.validation";
import { getCoursesUserController, getUserController, postUserController } from "../controllers/users.controller";
import { userCreateSchema } from "../schemas/users.schema";
import { verifyToken } from "../middlewares/verifyToken.validation";
import { userPermission } from "../middlewares/verifyPermissions.validation";
import { validateBody } from "../middlewares/body.validation";

const usersRouter = Router();

usersRouter.post("/", validateBody(userCreateSchema), isUserValidEmail, postUserController);
usersRouter.use(verifyToken, userPermission);
usersRouter.get("/:id", getUserController);
usersRouter.get("/:id/courses", getCoursesUserController);

export default usersRouter;

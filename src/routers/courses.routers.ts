import { Router } from "express";
import { getCourseController, postCourseController } from "../controllers/courses.controllers";
import { getUserCourseController, postUserCourseController, updateCourseController } from "../controllers/userCourses.controller";
import { couseUsersExists, userCourseExists } from "../middlewares/userCourses.validation";
import { userPermission } from "../middlewares/verifyPermissions.validation";
import { verifyToken } from "../middlewares/verifyToken.validation";
import { courseSchema } from "../schemas/courses.schema";
import { validateBody } from "../middlewares/body.validation";

const coursesRouter = Router();

coursesRouter.get("/", getCourseController);
coursesRouter.use(verifyToken, userPermission);
coursesRouter.post("/", validateBody(courseSchema), postCourseController);
coursesRouter.post("/:courseId/users/:userId", userCourseExists, couseUsersExists, postUserCourseController);
coursesRouter.get("/:id/users", getUserCourseController);
coursesRouter.delete("/:courseId/users/:userId", userCourseExists, couseUsersExists, updateCourseController);

export default coursesRouter;

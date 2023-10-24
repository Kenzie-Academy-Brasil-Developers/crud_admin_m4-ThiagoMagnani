import { Router } from "express";
import { deleteCoursesController, getCourseController, postCourseController } from "../controllers/courses.controllers";
import { getUserCourseController, postUserCourseController } from "../controllers/userCourses.controller";
import { userCourseExists } from "../middlewares/userCourses.validation";
import { userPermission } from "../middlewares/userValidAdmin.validation";
import { userValidToken } from "../middlewares/userValidToken.validation";

const coursesRouter = Router();

coursesRouter.use(userValidToken, userPermission);
coursesRouter.post("/", postCourseController);
coursesRouter.post("/:courseId/users/:userId", userCourseExists, postUserCourseController);
coursesRouter.get("/", getCourseController);
coursesRouter.get("/:id/users", getUserCourseController);
coursesRouter.delete("/:courseId/users/:userId", deleteCoursesController);

export default coursesRouter;

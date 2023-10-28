import { z } from "zod";
import { userCourseSchema } from "../schemas/userCourses.schema";
import { QueryResult } from "pg";

export type userCourses = z.infer<typeof userCourseSchema>;
export type UserCoursesRead = Array<userCourses>;
export type userCoursesResult = QueryResult<userCourses>;

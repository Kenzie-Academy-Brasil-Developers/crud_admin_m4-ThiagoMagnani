import { z } from "zod";
import { courseSchema, courseUpdateSchema } from "../schemas/courses.schema";
import { QueryResult } from "pg";

export type courses = z.infer<typeof courseSchema>;
export type courseRead = Array<courses>;
export type courseResult = QueryResult<courses>;
export type courseUpdate = z.infer<typeof courseUpdateSchema>;

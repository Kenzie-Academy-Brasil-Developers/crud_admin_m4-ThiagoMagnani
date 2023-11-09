import { z } from "zod";
import { userCreateSchema, userSchema } from "../schemas/users.schema";
import { QueryResult } from "pg";

export type users = z.infer<typeof userSchema>
export type userCreate = z.infer<typeof userCreateSchema>;
export type UserRead = z.infer<typeof userSchema>;
export type userResult = QueryResult<users>;

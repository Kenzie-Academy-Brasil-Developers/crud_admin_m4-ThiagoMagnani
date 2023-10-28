import { z } from "zod";
import { sessionSchema } from "../schemas/session.schema";
import { QueryResult } from "pg";

export type sessionRequest = z.infer<typeof sessionSchema>;
export type sessionResult = QueryResult<sessionRequest>;

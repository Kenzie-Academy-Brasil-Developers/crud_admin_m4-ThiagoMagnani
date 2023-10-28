import { Router } from "express";
import { login } from "../controllers/login.controller";
import { validateBody } from "../middlewares/body.validation";
import { sessionSchema } from "../schemas/session.schema";

const loginRouter = Router();

loginRouter.post("/", validateBody(sessionSchema), login);

export default loginRouter;

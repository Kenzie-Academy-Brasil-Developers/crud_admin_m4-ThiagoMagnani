import 'express-async-errors';
import express, { Application, json } from 'express';
import "dotenv/config";
import usersRouter from './routers/users.routers';
import coursesRouter from './routers/courses.routers';
import loginRouter from './routers/login.routers';
import { handleErrors } from './middlewares/handleError.validate';

const app: Application = express();
app.use(json());

app.use("/users", usersRouter);
app.use("/courses", coursesRouter);
app.use("/login", loginRouter)

app.use(handleErrors);

export default app;

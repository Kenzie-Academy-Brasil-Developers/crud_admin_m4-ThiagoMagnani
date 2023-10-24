import express, { Application, json } from 'express';
import "dotenv/config";
import usersRouter from './routers/users.routers';
import coursesRouter from './routers/courses.routers';
import loginRouter from './routers/login.routers';

const app: Application = express();
app.use(json());

app.use("/users", usersRouter);
app.use("/courses", coursesRouter);
app.use("/login", loginRouter)

export default app;

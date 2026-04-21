import "dotenv/config";
import express, { json } from "express";
import { connect } from "./config/database.js";
import cors from "cors";
import RegisterRouter from "./routes/RegisterRoutes.js";
import UsersRouter from "./routes/UsersRoutes.js";
import LoginRouter from "./routes/LoginRoutes.js";
import StudentRouter from "./routes/StudentRoutes.js";
import ClassRouter from "./routes/ClassRoutes.js";
import EnrollmentRouter from "./routes/EnrollmentRoutes.js";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }),
);
app.use(json());
app.use("/register", RegisterRouter);
app.use("/users", UsersRouter);
app.use("/login", LoginRouter);
app.use("/students", StudentRouter);
app.use("/class", ClassRouter);
app.use("/enrollment", EnrollmentRouter)


app.listen(PORT, async () => {
  await connect();
  console.log(`Servidor rodando na porta ${PORT} http://localhost:${PORT}`);
});

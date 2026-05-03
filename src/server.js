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
import ScoreRouter from "./routes/ScoreRoutes.js";
import ScheduleRouter from "./routes/ScheduleRoutes.js";

const PORT = process.env.PORT || 3000;
const app = express();

const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((o) => o.trim())
  : ["http://localhost:5173", "http://127.0.0.1:5173"];

app.use(
  cors({
    origin: corsOrigins,
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  }),
);
app.use(json());
app.use("/register", RegisterRouter);
app.use("/users", UsersRouter);
app.use("/login", LoginRouter);
app.use("/students", StudentRouter);
app.use("/classes", ClassRouter);
app.use("/enrollment", EnrollmentRouter);
app.use("/scores", ScoreRouter);
app.use("/schedules", ScheduleRouter);

try {
  await connect();
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("Falha ao iniciar o servidor:", err);
  process.exit(1);
}

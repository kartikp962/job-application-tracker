import express from "express";
import authRouter from "./routes/authRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";

const app = express();
app.use(express.json());

// app.get("/", (req, res, next) => {
//   return res.json({
//     message: "Job Application Tracker is working!!",
//   });
// });

// ROUTES
app.use("/api/auth", authRouter);
app.use("/api/applications", applicationRouter);

export default app;

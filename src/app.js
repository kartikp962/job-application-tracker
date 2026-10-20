import express from "express";
import authRouter from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

// app.get("/", (req, res, next) => {
//   return res.json({
//     message: "Job Application Tracker is working!!",
//   });
// });

// ROUTES
app.use("/api/auth", authRouter);

export default app;

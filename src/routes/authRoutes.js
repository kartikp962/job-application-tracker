import express from "express";
import { login, signup } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const authRouter = express.Router();



authRouter.post("/login", login);

authRouter.post("/signup", signup);


export default authRouter;

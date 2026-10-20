import express from "express";
import { signup } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.get("/login", (req, res, next) => {
  return res.json({
    message: "user is logged in!!",
  });
});

authRouter.post("/signup", signup);

export default authRouter;
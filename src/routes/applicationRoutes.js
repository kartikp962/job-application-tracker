import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const applicationRouter = express.Router();

function getApplications(req, res) {
  console.log("User ID from token:", req.user.id);

  return res.status(200).json({
    message: "Applications retrieved successfully.",
    userId: req.user.id,
  });
}

applicationRouter.get("/", authMiddleware, getApplications);

export default applicationRouter;

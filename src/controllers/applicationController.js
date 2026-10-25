import { getApplicationsByUserId } from "../models/applicationModel";

async function getApplications(req, res, next) {
  const { user } = req.body;

  const applications = await getApplicationsByUserId(user.id);

  return res.status(200).json({
    message: "Applications retreived successfully.",
    applications,
  });
}

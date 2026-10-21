import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const authHeaderParts = authHeader.split(" ");
    const authScheme = authHeaderParts[0];
    const token = authHeaderParts[1];

    if (authScheme !== "Bearer" || !token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
}

export { authMiddleware };

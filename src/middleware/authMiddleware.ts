import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

function authMiddleware(
  req: Request<{}> & { userId?: number },
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  try {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error("JWT secret key not configured");
    }
    const decoded = jwt.verify(token, secretKey);
    req.userId = (decoded as { id: number }).id;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export default authMiddleware;

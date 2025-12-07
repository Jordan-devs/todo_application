import jwt from "jsonwebtoken";
function authMiddleware(req, res, next) {
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
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
export default authMiddleware;
//# sourceMappingURL=authMiddleware.js.map
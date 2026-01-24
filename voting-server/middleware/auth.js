// middleware/auth.js
import jwt from "jsonwebtoken";

// Verify if user is logged in (student or admin)
export function authenticate(req, res, next) {
  try {
    // Get token from Authorization header or cookie
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Please login to access this resource" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// Check if user is admin
export function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  next();
}

// Check if user is student
export function isStudent(req, res, next) {
  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Access denied. Students only." });
  }
  next();
}

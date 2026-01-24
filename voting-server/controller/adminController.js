// controllers/adminAuth.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { mysql } from "../integrations/mysql_connection.js";

export function loginAdmin(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const query = "SELECT * FROM admin WHERE username = ?";

    mysql.query(query, [username], async (err, results) => {
      if (err) {
        console.error("Admin login error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const admin = results[0];

      // Compare password
      const isPasswordValid = await bcrypt.compare(password, admin.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          id: admin.adminId,
          username: admin.username,
          role: "admin",
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
      );

      res.status(200).json({
        message: "Admin login successful",
        token: token,
        admin: {
          id: admin.adminId,
          username: admin.username,
          email: admin.email,
        },
      });
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

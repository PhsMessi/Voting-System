import { mysql } from "../integrations/mysql_connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* async function for post or register students */
export async function registerStudent(req, res) {
  try {
    const { studentId, studentName, yearSection, email, password } = req.body;

    if (!studentId || !studentName || !yearSection || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const register =
      "INSERT INTO studentvoter (studentId, studentName, yearSection, email, password ,vote_created) VALUES (?, ?, ?, ?, NOW())";

    mysql.query(
      register,
      [studentId, studentName, yearSection, email, hashedPassword],
      (err, results) => {
        if (err) {
          console.error("Query failed:", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err.message });
        }

        return res.status(201).json({
          message: "Student registered successfully. Please Login.",
          studentId: studentId,
        });
      },
    );
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
}

/*function for login student*/

export function loginStudent(req, res) {
  try {
    const { studentId, password } = req.body;

    if (!studentId || !password) {
      return res
        .status(400)
        .json({ message: "Student ID and password are required" });
    }

    const query = "SELECT * FROM studentvoter WHERE studentId = ?";

    mysql.query(query, [studentId], async (err, results) => {
      if (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({ message: "Invalid student ID or password" });
      }

      const student = results[0];

      // Compare password
      const isPasswordValid = await bcrypt.compare(password, student.password);

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Invalid student ID or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          id: student.studentId,
          name: student.studentName,
          role: "student",
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
      );

      res.status(200).json({
        message: "Login successful",
        token: token,
        user: {
          studentId: student.studentId,
          name: student.studentName,
          yearSection: student.yearSection,
          email: student.email,
        },
      });
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

import { mysql } from "../integrations/mysql_connection.js";

export function registerStudent(req, res) {
  try {
    const { studentId, studentName, yearSection, email } = req.body;

    if (!studentId || !studentName || !yearSection || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const register =
      "INSERT INTO studentvoter (studentId, studentName, yearSection, email, vote_created) VALUES (?, ?, ?, ?, NOW())";

    mysql.query(
      register,
      [studentId, studentName, yearSection, email],
      (err, results) => {
        if (err) {
          console.error("Query failed:", err);
          return res
            .status(500)
            .json({ message: "Database error", error: err.message });
        }

        return res.status(201).json({
          message: "Student registered successfully",
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

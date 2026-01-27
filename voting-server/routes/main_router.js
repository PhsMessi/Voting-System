import express from "express";
import {
  registerStudent,
  loginStudent,
} from "../controller/registerController.js";
import { loginAdmin } from "../controller/adminController.js";
import { authenticate, isAdmin, isStudent } from "../middleware/auth.js";
import { api_key_auth } from "../middleware/api_key_auth.js";
const router = express.Router();

//register student
router.post("/postStudent", api_key_auth, registerStudent);
//student login
router.post("/studentLogin", loginStudent);
//admin login
router.post("/adminLogin", loginAdmin);

// PROTECTED STUDENT ROUTES (must be logged in as student)
router.get("/student/dashboard", authenticate, isStudent, (req, res) => {
  res.json({
    message: "Welcome to student dashboard",
    user: req.user,
  });
});

router.post("/student/vote", authenticate, isStudent, (req, res) => {
  // Handle voting logic
  res.json({ message: "Vote recorded" });
});

// PROTECTED ADMIN ROUTES (must be logged in as admin)
router.get("/admin/dashboard", authenticate, isAdmin, (req, res) => {
  res.json({
    message: "Welcome to admin dashboard",
    admin: req.user,
  });
});

router.get("/admin/students", authenticate, isAdmin, (req, res) => {
  // Return list of all students
});

router.delete("/admin/student/:id", authenticate, isAdmin, (req, res) => {
  // Delete student
});

export default router;

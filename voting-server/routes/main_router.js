import express from "express";
import { registerStudent } from "../controller/registerController.js";

const router = express.Router();

router.post("/postStudent", registerStudent);

export default router;

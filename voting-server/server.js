import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { database } from "./integrations/mysql_connection.js";
//import db here
//import router here
import router from "./routes/main_router.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const PORT = process.env.PORT;
const app = express();

//mysql integration
database();
//my middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//api use
app.use("/api", router);
app.listen(PORT, () => {
  console.log(`app is running in port ${PORT}`);
});

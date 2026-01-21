import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { database } from "./integrations/mysql_connection.js";
//import db here
//import router here

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
app.use(express.static(path.join(__dirname, "public")));
//api use

app.listen(PORT, () => {
  console.log(`app is running in port ${PORT}`);
});

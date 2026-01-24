import mysql2 from "mysql2";
import dotenv from "dotenv";

dotenv.config(); //need to read .env files
const mysql = mysql2.createConnection({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//initialization

const database = () => {
  mysql.connect((error) => {
    if (error) {
      console.error("Error connecting to database:", error.message);
      return;
    }
    console.log(`Connected to MySQL database successfully!`);
  });
};

export { mysql, database };

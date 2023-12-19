const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const app = express();
require('dotenv').config();
app.use(cors());
const apiPort = process.env.API_PORT;
const apiUser = process.env.API_USER;
const apiPassword = process.env.API_PASSWORD;
const apiHost = process.env.API_HOST;

const pool = new Pool({
  user: apiUser,
  host: apiHost,
  database: "users",
  password: apiPassword,
  port: 5432,
});
app.get("/", async (req, res) => {
  const page = req.query.page || 1;
  const limit = 10;
  const countOfUsers = await pool.query(
    "SELECT COUNT(id) as total_users FROM users"
  );
  const totalUser = Math.ceil(countOfUsers.rows[0].total_users / limit);
  const offset = (page - 1) * limit;
  pool.query(
    `SELECT * FROM users LIMIT ${limit} OFFSET ${offset} `,
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Veri alınamadı" });
      } else {
        res.json({ users: result.rows, totalUser })
      }
    }
  );
});

app.listen(apiPort, () => {
  console.log(`${apiPort} is runing`);
});

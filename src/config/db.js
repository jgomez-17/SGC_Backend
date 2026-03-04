// db.js
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.query("SELECT NOW()")
  .then(res => console.log("Conectado a Supabase:", res.rows[0]))
  .catch(err => console.error("Error de conexión:", err));

module.exports = { pool };
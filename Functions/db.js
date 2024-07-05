require('dotenv').config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 10
});

async function query(sql, values) {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(sql, values);
        return rows;
    } catch (err) {
        console.error(err);
    } finally {
        conn.release();
    }
}

module.exports = { query };
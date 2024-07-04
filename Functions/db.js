const mysql = require("mysql2/promise");
const config = require("../config.json");

const pool = mysql.createPool({
    host: config.hostname,
    user: config.user,
    password: config.password,
    database: config.database,
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
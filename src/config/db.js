const mysql = require('mysql2/promise');
require('dotenv').config({
    path: require('path').join(__dirname, '../../.env')
});

// Shared MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Verify that the database connection works
async function testConnection() {
    let connection;

    try {
        connection = await pool.getConnection();
        await connection.query('SELECT 1');
        console.log('Successfully connected to MySQL!');
    } catch (error) {
        console.error('MySQL connection failed:', error.message);
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

// Allow other project files to use the database
module.exports = { pool, testConnection };

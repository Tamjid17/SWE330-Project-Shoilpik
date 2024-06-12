import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// DB Connection Pool
export const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    port: process.env.MYSQL_PORT || 3306,
    database: process.env.MYSQL_DATABASE || 'Shoilpik'
}).promise();

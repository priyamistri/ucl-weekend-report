import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  options: {
    encrypt: false, // ❗ important for local setup
    trustServerCertificate: true
  }
};

export async function connectDB() {
  try {
    const pool = await sql.connect(config);
    console.log('✅ Connected to SQL Server');
    return pool;
  } catch (error) {
    console.error('❌ Database connection failed', error);
    throw error;
  }
}

export { sql };

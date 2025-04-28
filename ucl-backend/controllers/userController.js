import { sql, poolPromise } from '../database/connection.js';

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, username, password, role } = req.body;

    const pool = await poolPromise; // ✅ Get the connection pool

    const request = pool.request();
    await request
      .input('fullName', sql.NVarChar, fullName)
      .input('email', sql.NVarChar, email)
      .input('username', sql.NVarChar, username)
      .input('password', sql.NVarChar, password)
      .input('role', sql.NVarChar, role)
      .query(`
        INSERT INTO Users (fullName, email, username, password, role)
        VALUES (@fullName, @email, @username, @password, @role)
      `);

    res.status(201).json({ message: '✅ User registered successfully!' });
  } catch (error) {
    console.error('❌ Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

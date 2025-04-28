import { sql, poolPromise } from '../database/connection.js';

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, username, password, role } = req.body;

    const pool = await poolPromise;
    const request = pool.request();
    const result = await request
      .input('fullName', sql.NVarChar, fullName)
      .input('email', sql.NVarChar, email)
      .input('username', sql.NVarChar, username)
      .input('password', sql.NVarChar, password)
      .input('role', sql.NVarChar, role)
      .execute('sp_Insert_User');

    // ❗ Get the ResponseJson string
    const responseString = result.recordset[0].ResponseJson;

    // ❗ Parse the JSON array
    const responseArray = JSON.parse(responseString);

    // ❗ Directly send the full JSON array as response
    return res.status(200).json(responseArray);

  } catch (error) {
    console.error('❌ Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

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

export const LoginUser = async (req, res) => {
  try {
    const { username, password} = req.body;

    const pool = await poolPromise;
    const request = pool.request();
    const result = await request
      .input('username', sql.NVarChar, username)
      .input('password', sql.NVarChar, password)
      .execute('sp_Login_User');

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

export const GETALLUSERS = async (req, res) => {
  try {

    const pool = await poolPromise;
    const request = pool.request();
    const result = await request
      .execute('sp_Get_All_Users');

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

export const UpdateStatus = async (req, res) => {
  try {
    const { username, status} = req.body;

    const pool = await poolPromise;
    const request = pool.request();
    const result = await request
      .input('username', sql.NVarChar, username)
      .input('status', sql.NVarChar, status)
      .execute('sp_Update_User_Status');

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

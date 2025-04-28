import sql from 'mssql';

const dbSettings = {
  user: 'admin_ucl',        // ✅ Your username
  password: '1313',         // ✅ Your password
  server: 'localhost',      // ✅ localhost instead of DESKTOP-D2R91MK
  database: 'UCL',          // ✅ Your database
  port: 1433,               // ✅ Important! (default SQL TCP port)
  options: {
    encrypt: false,             // ✅ False for local dev
    trustServerCertificate: true // ✅ Local dev
  }
};

const poolPromise = new sql.ConnectionPool(dbSettings)
  .connect()
  .then(pool => {
    console.log('✅ Connected to MSSQL');
    return pool;
  })
  .catch(err => console.log('❌ Database Connection Failed: ', err));

export { sql, poolPromise };

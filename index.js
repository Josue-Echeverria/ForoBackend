const express = require('express');
const sql = require('mssql');
const app = express();
const config = require('./config.json');
const port = process.env.PORT || 3000;

const connection = {
  server: config.db.server,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
  port: config.db.port,
  options: {
      encrypt: true, 
      trustServerCertificate: true 
  },
};

app.get('/', (req, res) => {
  res.send('Hello World!zzzzzzzzzzzz');
});


app.get("/testUsers", async (req, res) => {
  try{
    await sql.connect(connection);
    const request = new sql.Request();
    // request.output('outResultCode', sql.Int);
    const result = await request.execute('getTestUsers');
    res.json(result.recordset);
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data.');
  } finally {
    sql.close();
  }
});


app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});

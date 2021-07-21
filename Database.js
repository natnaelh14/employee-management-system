const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: 'Fiyorina#22',
  database: 'company_DB',
});

module.exports = connection;
const mysql = require('mysql');

let connection = null;

function createConnection() {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
  });

  connection.connect((error) => {
    if (error) {
      console.log('El error de conexión es: ' + error);
      return;
    }
    console.log('Conectado a la base de datos!');
  });
}

function getConnection() {
  if (!connection) {
    createConnection();
  }
  return connection;
}

module.exports = getConnection();

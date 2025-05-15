import mysql from 'mysql2/promise';

// CONNECTION TO SERVER (NOT THE DATABASE.)
export async function connectToDatabase(dbName) {
  const config = {
    host: 'localhost',
    user: 'root',
    password: '12345',
    multipleStatements: true
  };
  // CONNECTION TO DATABASE
  if (dbName) {
    config.database = dbName;
  }

  const connection = await mysql.createConnection(config);
  return connection;
}

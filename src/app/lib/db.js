import mysql from 'mysql2/promise';

// Sunucuya bağlantı (DB olmadan)
export async function connectToDatabase(dbName) {
  const config = {
    host: 'localhost',
    user: 'root',
    password: '12345',
    multipleStatements: true
  };

  if (dbName) {
    config.database = dbName;
  }

  const connection = await mysql.createConnection(config);
  return connection;
}

import sqlite3 from 'sqlite3'
const db = new sqlite3.Database('./database.db')

export const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
}

export const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err)
      else resolve(this)
    })
  })
}






// import mysql from 'mysql2/promise';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// // DOTENV CONFIG HERE
// dotenv.config({ path: path.resolve(__dirname, '../../../.env.local') });

// // CONNECTION TO SERVER (NOT THE DATABASE.)
// export async function connectToDatabase(dbName) {
//   // THIS CONSOLE LOG IS FOR MAKE SURE THAT .ENV FILE READED.
//   console.log("ENV USER:", process.env.DB_USER);
//   const config = {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     multipleStatements: true
//   };
//   // CONNECTION TO DATABASE
//   if (dbName) {
//     config.database = dbName;
//   }

//   const connection = await mysql.createConnection(config);
//   return connection;
// }


// const sqlite3 = require('sqlite3').verbose();

// const db = new sqlite3.Database('./database.db');

// const query = (sql, params = []) => {
//   return new Promise((resolve, reject) => {
//     db.all(sql, params, (err, rows) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(rows);
//       }
//     });
//   });
// };

// const run = (sql, params = []) => {
//   return new Promise((resolve, reject) => {
//     db.run(sql, params, function (err) {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(this);
//       }
//     });
//   });
// };

// module.exports = { query, run };

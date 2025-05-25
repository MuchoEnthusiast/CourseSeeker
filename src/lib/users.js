import { query, run } from './db.js'
import bcrypt from 'bcrypt'

export async function addUser({ name, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await run(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, 'student']
    )
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      throw new Error('User already exists')
    }
    throw err
  }
}

export async function findUser(email, password) {
  const rows = await query('SELECT * FROM users WHERE email = ?', [email])
  const user = rows[0]
  if (!user) return null

  const match = await bcrypt.compare(password, user.password)
  return match ? user : null
}

export async function getAllUsers() {
  return await query('SELECT id, name, email, role FROM users')
}

export async function updateUserRole(email, role) {
  await run('UPDATE users SET role = ? WHERE email = ?', [role, email])
}

export async function findUserByEmail(email) {
  const rows = await query('SELECT * FROM users WHERE email = ?', [email])
  return rows[0] || null
}






// WITHOUT ROLES

// import { query, run } from './db.js'
// import bcrypt from 'bcrypt'

// export async function addUser({ name, email, password }) {
//     const hashedPassword = await bcrypt.hash(password, 10)

//     try {
//         await run(
//             'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
//             [name, email, hashedPassword]
//         )
//     } catch (err) {
//         if (err.message.includes('UNIQUE')) {
//             throw new Error('User already exists')
//         }
//         throw err
//     }
// }

// export async function findUser(email, password) {
//     const rows = await query(
//         'SELECT * FROM users WHERE email = ?',
//         [email]
//     )
//     const user = rows[0]
//     if (!user) return null

//     const match = await bcrypt.compare(password, user.password)
//     return match ? user : null
// }


// export async function getAllUsers() {
//     return await query('SELECT * FROM users')
// }




// import fs from 'fs/promises'
// const USERS_FILE = 'users.json'

// export async function loadUsers() {
//   try {
//     const data = await fs.readFile(USERS_FILE, 'utf8')
//     return JSON.parse(data)
//   } catch {
//     return []
//   }
// }

// export async function saveUsers(users) {
//   await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2))
// }

// export async function addUser({ username, password }) {
//   const users = await loadUsers()
//   if (users.find(u => u.username === username)) {
//     throw new Error('User already exists')
//   }
//   users.push({ username, password, role: 'student' })
//   await saveUsers(users)
// }

// export async function findUser(username, password) {
//   const users = await loadUsers()
//   return users.find(u => u.username === username && u.password === password)
// }


// const { query, run } = require('./db.js')

// // Додати користувача
// async function addUser({ username, password }) {
//   try {
//     await run(
//       'INSERT INTO users (username, password) VALUES (?, ?)',
//       [username, password]
//     )
//   } catch (err) {
//     if (err.message.includes('UNIQUE')) {
//       throw new Error('User already exists')
//     }
//     throw err
//   }
// }

// // Знайти користувача
// async function findUser(username, password) {
//   const rows = await query(
//     'SELECT * FROM users WHERE username = ? AND password = ?',
//     [username, password]
//   )
//   return rows[0] || null
// }

// // Отримати всіх
// async function getAllUsers() {
//   return await query('SELECT * FROM users')
// }

// module.exports = { addUser, findUser, getAllUsers }

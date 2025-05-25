import { getDB } from "./db"


function sortObj(obj) {
  return Object.keys(obj).sort().reduce((acc, key) => {
      acc[key] = obj[key]
      return acc
    }, {})
}
function listToObj(list) {
  return list.reduce((acc, item) => {
    acc[item.timestamp] = item
    return acc
}, {})
}
// let courses = {
//   "1": { 
//     id: "1", 
//     name: "React Basics",
//     topics: [
//       {
//         title: "Topic 1",
//         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         attachments: [
//           {
//             name: "Attachment1",
//             id: "1"
//           },
//           {
//             name: "Attachment2",
//             id: "2"
//           },
//           {
//             name: "Attachment3",
//             id: "3"
//           },
//           {
//             name: "Attachment4",
//             id: "4"
//           }
//         ]
//       },
//       {
//         title: "Topic 2",
//         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         attachments: [
//           {
//             name: "Attachment1",
//             id: "5"
//           }
//         ]
//       }
//     ],
//     users: [
//       {
//         username: "username",
//         role: "Student",
//         name: "Name",
//         surname: "Surname",
//         lastVisited: 0,
//       }
//     ],
//     chat: {
//       messages: {
//         "123": {
//           username: "User1",
//           text: "Ciao tutti ! ! !",
//           timestamp: "0"
//         },
//         "6372637": { username: "User2", text: "Ciao tutti ! ! !", timestamp: "0" },
//         "6372638": { username: "User2", text: "Ciao tutti ! ! !", timestamp: "0" },
//         "6372639": { username: "User2", text: "Ciao tutti ! ! !", timestamp: "0" },
//         "6372640": { username: "User2", text: "Ciao tutti ! ! !", timestamp: "0" },
//         "6372641": { username: "User2", text: "Ciao tutti ! ! !", timestamp: "0" },
//         "6372642": { username: "User2", text: "Ciao tutti ! ! !", timestamp: "0" },
//         "6372643": { username: "User2", text: "Ciao tutti ! ! !", timestamp: "0" },
//         "6372644": { username: "User2", text: "Ciao tutti ! ! !", timestamp: "0" },
//         "6372645": { username: "User2", text: "Ciao tutti ! ! !", timestamp: "0" },
//       }
//     }
//   },
//   "2": { 
//     id: "2", 
//     name: "Nextjs Advanced",
//     topics: [
//       {
//         title: "Topic 1",
//         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         attachments: [
//           {
//             name: "Attachment1",
//             id: "6"
//           }
//         ]
//       },
//       {
//         title: "Topic 2",
//         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         attachments: [
//           {
//             name: "Attachment1",
//             id: "7"
//           }
//         ]
//       }
//     ],
//     users: [
//       {
//         username: "username",
//         role: "Student",
//         name: "Name",
//         surname: "Surname",
//         lastVisited: 0,
//       }
//     ],
//     chat: {
//       messages: [
//         {
//           username: "User1",
//           message: "Ciao tutti ! ! !",
//           timestamp: 0
//         },
//         {
//           username: "User2",
//           message: "Ciao tutti ! ! !",
//           timestamp: 0
//         }
//       ]
//     }
//   }
// }

let populated = false

async function initDB() {
  const db = await getDB()
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      username TEXT PRIMARY KEY,
      role TEXT CHECK(role IN ('student', 'teacher')) NOT NULL,
      name TEXT NOT NULL,
      surname TEXT NOT NULL,
      passwordHash TEXT NOT NULL,
      salt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      teacher TEXT NOT NULL,
      FOREIGN KEY (teacher) REFERENCES users(username) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS user_course (
      username TEXT NOT NULL,
      courseId INTEGER NOT NULL,
      lastVisited INTEGER,
      PRIMARY KEY (username, courseId),
      FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      courseId INTEGER NOT NULL,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS attachments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      file TEXT NOT NULL,
      topicId INTEGER NOT NULL,
      FOREIGN KEY (topicId) REFERENCES topics(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS grades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      gradeNumber INTEGER NOT NULL,
      timestamp INTEGER NOT NULL,
      username TEXT NOT NULL,
      courseId INTEGER NOT NULL,
      FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      courseId INTEGER NOT NULL,
      timestamp INTEGER NOT NULL,
      text TEXT NOT NULL,
      FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE
    );
  `)

  return db
}
export async function populateDB() {

  // if(populated)
  //   return
  // populated = true

  await initDB()

  console.log("POPULATING DB")
  const db = await getDB()
  const tables = await db.all(`
    SELECT name
    FROM sqlite_master
    WHERE type = 'table'
    ORDER BY name;
  `)
  console.log(tables)

  // await db.exec(`
  //   DELETE FROM attachments;
  //   DELETE FROM topics;
  //   DELETE FROM grades;
  //   DELETE FROM messages;
  //   DELETE FROM user_course;
  //   DELETE FROM users;
  //   DELETE FROM courses;
  //   DELETE FROM sqlite_sequence;
  // `)

  const now = Math.floor(Date.now() / 1000)

  //in those test values the password is the username
  await db.run(`
    INSERT OR IGNORE INTO users (username, role, name, surname, passwordHash, salt)
    VALUES
      ('alice', 'student', 'Alice', 'Liddell', 'f3104e622245caf523d083fe2e65d79d7078a29c422062a14bf555735ee8168813073e9b9103d67b370662ac0ff836be3ec0d57e0642510e8e3fa2368bbe8e6d', '765e78308f78693541df54ef0785a084'),
      ('bob', 'teacher', 'Bob', 'Builder', '6072c6eb7c584cfe4c3761769eb136a912f542bfdd0a53f49949a1bf4bed5ed19e09f69aed62a2d1a797e4647b6aaf11e1673b350982df68cddd277691d10a20', 'e3ebe7cf7ad1a876f525d9234e3429ff')
  `)

  await db.run(`
    INSERT OR IGNORE INTO courses (id, name, password, teacher)
    VALUES (1, 'Math', '', 'bob'), (2, 'Physics', 'password', 'bob')
  `)

  await db.run(`
    INSERT OR IGNORE INTO user_course (username, courseId, lastVisited)
    VALUES ('alice', 1, ${now}), ('bob', 1, ${now + 100000}), ('bob', 2, ${now + 1000000})
  `)

  await db.run(`
    INSERT OR IGNORE INTO topics (title, description, courseId)
    VALUES
      ('Algebra', 'Basic Algebra concepts', 1),
      ('Algebra2', 'Basic Algebra concepts', 1),
      ('Algebra3', 'Basic Algebra concepts', 1),
      ('Kinematics', 'Intro to motion', 2)
  `)

  await db.run(`
    INSERT OR IGNORE INTO attachments (id, name, file, topicId)
    VALUES
      (1, 'Algebra Notes', 'algebra-notes.pdf', 1),
      (3, 'Algebra Notes', 'algebra-notes.pdf', 2),
      (4, 'Algebra Notes', 'algebra-notes.pdf', 3),
      (2, 'Motion Diagram', 'data:image/png;base64,ABC123==', 2)
  `)

  await db.run(`
    INSERT OR IGNORE INTO grades (id, name, gradeNumber, timestamp, username, courseId)
    VALUES
      (1, 'Midterm', 85, ${now}, 'alice', 1),
      (2, 'Final', 90, ${now + 3600}, 'alice', 1),
      (5, 'Midterm', 76, ${now + 3600}, 'bob', 1),
      (6, 'Final', 55, ${now + 3600}, 'bob', 1)
  `)

  await db.run(`
    INSERT OR IGNORE INTO messages (id, username, courseId, timestamp, text)
    VALUES
      (1, 'alice', 1, ${now}, 'When is the next exam?'),
      (2, 'bob', 1, ${now + 120}, 'Next week.')
  `)

}
async function db() {
  return initDB()
}

export async function execQuery(query, parameters) {
  try {
    const res = await (await db()).run(query, parameters)
    // console.log(query, "|", parameters, "|", res)
    return { ok: true }
  } catch(err) {
    console.log(err)
    return err
  }
}
export async function getList(query, parameters) {
  try {
    const users = await (await db()).all(query, parameters)
    // console.log(query, "|", parameters)
    return users
  } catch(err) {
    console.log(err)
    return []
  }
}
export async function getElement(query, parameters) {
  try {
    const user = await (await db()).get(query, parameters)
    // console.log(query, "|", parameters)
    return user
  } catch(err) {
    console.log(err)
    return {}
  }
}

// export async function addUser({ username, role, passwordHash, salt}) {
//   return await execQuery(`INSERT INTO users (username, role, passwordHash, salt) VALUES (?, ?, ?, ?)`, [username, role, passwordHash, salt])
// }



export async function getCourse(courseId) {
  const course = await getElement('SELECT * FROM courses WHERE id = ?', [courseId])
  if (!course) return null


  const users = await getList(`
    SELECT u.username, u.name, u.surname, u.role, uc.lastVisited
    FROM users u
    JOIN user_course uc ON uc.username = u.username
    WHERE uc.courseId = ?
  `, [courseId])

  const topics = await getList(`
    SELECT * FROM topics WHERE courseId = ?
  `, [courseId])

  for (let topic of topics) {
    const attachments = await getList(`
      SELECT * FROM attachments WHERE topicId = ?
    `, [topic.id])

    topic.attachments = attachments
  }

  return {
    ...course,
    users,
    topics
  }
}

export async function getGrades(username, courseId) {
  const grades = await getList(
      'SELECT * FROM grades WHERE username = ? AND courseId = ? ORDER BY timestamp ASC',
      [username, courseId]
    )
  return grades
}

export async function addMessage(id, message) {
  await execQuery('INSERT INTO messages (username, courseId, timestamp, text) VALUES (?, ?, ?, ?)', [message.username, id, message.timestamp, message.text])
}

export async function getMessages(id, afterTimestamp) {
  const allMessagesList = await getList('SELECT * FROM messages WHERE courseId = ? AND timestamp > ? ORDER BY timestamp ASC', [id, afterTimestamp])
  const allMessages = listToObj(allMessagesList)

  let messages = {}
  const originalMessages = sortObj(allMessages)
  
  for (const [timestamp, message] of Object.entries(originalMessages)) {
    if(Number(timestamp) <= Number(afterTimestamp)) continue
  
    messages[timestamp] = message
  }

  return sortObj(messages)
}

export async function isUserEnrolled(username, courseId) {
  const db = await getDB()
  const result = await db.get(
    'SELECT 1 FROM user_course WHERE username = ? AND courseId = ? LIMIT 1',
    [username, courseId]
  )
  return !!result
}

export async function updateLastVisited(username, courseId) {
  const db = await getDB()

  await db.run(
    'UPDATE user_course SET lastVisited = ? WHERE username = ? AND courseId = ?',
    [Date.now(), username, courseId]
  )
}
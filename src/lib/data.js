import { getDB } from "./db"


//Sort object by key
function sortObj(obj) {
  return Object.keys(obj).sort().reduce((acc, key) => {
      acc[key] = obj[key]
      return acc
    }, {})
}
//Convert a list of messages to an object mapping timpestamps to messages
function listToObj(list) {
  return list.reduce((acc, item) => {
    acc[item.timestamp] = item
    return acc
  }, {})
}


//TODO: For testing only
//A function to populate the db with test data
export async function populateDB() {

  console.log("POPULATING DB")
  const db = await getDB()
  const tables = await db.all(`
    SELECT name
    FROM sqlite_master
    WHERE type = 'table'
    ORDER BY name;
  `)
  console.log(tables)


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
    INSERT OR IGNORE INTO attachments (id, name, fileName, file, topicId)
    VALUES
      (1, 'Algebra Notes', 'file.txt', 'algebra-notes.pdf', 1),
      (3, 'Algebra Notes', 'file.txt', 'algebra-notes.pdf', 2),
      (4, 'Algebra Notes', 'file.txt', 'algebra-notes.pdf', 3),
      (2, 'Motion Diagram', 'file.txt', 'data:image/png;base64,ABC123==', 2)
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

export async function execQuery(query, parameters) {
  try {
    const res = await (await getDB()).run(query, parameters)
    // console.log(query, "|", parameters, "|", res)
    return { ok: true }
  } catch(err) {
    console.log(err)
    return err
  }
}
export async function getList(query, parameters) {
  try {
    const users = await (await getDB()).all(query, parameters)
    // console.log(query, "|", parameters)
    return users
  } catch(err) {
    console.log(err)
    return []
  }
}
export async function getElement(query, parameters) {
  try {
    const user = await (await getDB()).get(query, parameters)
    // console.log(query, "|", parameters)
    return user
  } catch(err) {
    console.log(err)
    return {}
  }
}


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

export async function isUserOwner(username, courseId) {
  const db = await getDB()
  const result = await db.get(
    'SELECT 1 FROM courses WHERE id = ? AND teacher = ?',
    [courseId, username]
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

export async function getUserDetailsAndCourses(username) {
  const db = await getDB();

  const user = await db.get(
    `SELECT u.username, u.role, u.name, u.surname, p.nationality, p.city, p.country, p.description, p.photo
     FROM users u
     LEFT JOIN profile p ON u.username = p.username
     WHERE u.username = ?`,
    [username]
  );

  if (!user) return null;

  const enrolledCourses = await db.all(
    `SELECT c.id, c.name FROM user_course uc
     JOIN courses c ON uc.courseId = c.id
     WHERE uc.username = ?`,
    [username]
  );

  const taughtCourses = await db.all(
    `SELECT id, name FROM courses WHERE teacher = ?`,
    [username]
  );

  // Combine courses based on user role
  const courses = user.role === 'teacher' ? taughtCourses : enrolledCourses;

  return {
    ...user,
    courses, // This is what UserCoursesCard expects
    enrolledCourses,
    taughtCourses,
  };
}


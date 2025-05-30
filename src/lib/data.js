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
  const course = await getElement('SELECT id, name, teacher FROM courses WHERE id = ?', [courseId])
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
    `SELECT u.username, u.role, u.name, u.surname, p.nationality, p.city, p.country, p.description
     FROM users u
     LEFT JOIN profile p ON u.username = p.username
     WHERE u.username = ?`,
    [username]
  );

  if (!user) return null;

 const enrolledCourses = await db.all(
  `SELECT c.id, c.name, c.teacher FROM user_course uc
   JOIN courses c ON uc.courseId = c.id
   WHERE uc.username = ?`,
  [username]
);

const taughtCourses = await db.all(
  `SELECT c.id, c.name, u.name || ' ' || u.surname AS teacher
   FROM courses c
   JOIN users u ON u.username = c.teacher
   WHERE c.teacher = ?`,
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
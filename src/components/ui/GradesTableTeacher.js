import { getDB } from "@/lib/db"
import AddGradeButton from "./AddGradeButton"
import DeleteGradeButton from "./DeleteGradeButton"

export default async function GradesTableTeacher({ user, id }) {
  const db = await getDB()

  const grades = await db.all(`
    SELECT id, username, name AS gradeName, gradeNumber
    FROM grades
    WHERE courseId = ?
  `, [id])

  const courseUsers = await db.all(`
    SELECT u.username, u.name, u.surname, u.role
    FROM users u
    JOIN user_course uc ON uc.username = u.username
    WHERE uc.courseId = ?
  `, [id])


  const users = {}
  const allGradeNames = new Set()

  for (const { username, gradeName, gradeNumber } of grades) {
    if (!users[username]) users[username] = {}
    users[username][gradeName] = gradeNumber
    allGradeNames.add(gradeName)
  }

  const sortedGradeNames = Array.from(allGradeNames).sort()

  const rows = Object.entries(users).map(([username, grades]) => {
    const gradeValues = sortedGradeNames.map(name => grades[name] ?? '-')
    const numericGrades = sortedGradeNames.map(name => grades[name]).filter(v => typeof v === 'number')
    const average = numericGrades.length
      ? (numericGrades.reduce((a, b) => a + b, 0) / numericGrades.length).toFixed(2)
      : '-'

    return { username, gradeValues, average }
  })

  return (
    <div className="container mt-5">
      <div className="d-flex gap-2">
        <DeleteGradeButton id = {id} users = {courseUsers} grades = {grades} />
        <AddGradeButton id = {id} users = {courseUsers} />
      </div>
    {grades.length > 0 ? (
      <table className="table table-bordered table-striped text-center align-middle">
        <thead className="table-dark">
          <tr>
            <th>User</th>
            {sortedGradeNames.map(name => (
              <th key={name}>{name}</th>
            ))}
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ username, gradeValues, average }) => (
            <tr key={username}>
              <td>{username}</td>
              {gradeValues.map((val, i) => (
                <td key={i}>{val}</td>
              ))}
              <td><strong>{average}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <span>No grades yet</span>
    )}
    </div>
  )
}
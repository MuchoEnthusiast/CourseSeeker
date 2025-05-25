import CourseGrid from '@/components/ui/CourseGrid'
import { getUserFromTokenCookie } from '@/lib/auth'
import { getDB } from '@/lib/db'
import Link from 'next/link'


export default async function Dashboard() {
  const user = await getUserFromTokenCookie()
  if(!user) return <>Not logged in</>

  const db = await getDB()
  const enrolledCourses = await db.all(`
    SELECT c.id, c.name, c.teacher
    FROM courses c
    JOIN user_course uc ON uc.courseId = c.id
    WHERE uc.username = ?
  `, [user.username])

  const allCourses = await db.all(`SELECT id, name, teacher FROM courses`)

  return (
    <CourseGrid
      user={user}
      enrolledCourses={enrolledCourses}
      allCourses={allCourses}
    />
  )
}
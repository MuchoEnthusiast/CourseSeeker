import CourseGrid from '@/components/ui/CourseGrid'
import { getUserFromTokenCookie } from '@/lib/auth'
import { getDB } from '@/lib/db'
import Link from 'next/link'


export default async function Dashboard({ searchParams }) {
  const user = await getUserFromTokenCookie()
  if(!user) return <>Not logged in</>

  const db = await getDB()
  let enrolledCourses = await db.all(`
    SELECT c.id, c.name, c.teacher
    FROM courses c
    JOIN user_course uc ON uc.courseId = c.id
    WHERE uc.username = ?
  `, [user.username])

  let allCourses = await db.all(`SELECT id, name, teacher FROM courses`)
  
  const q = (await searchParams).q
  if(q) {
    const aq = (c) => {return allCourses.filter(course => course.name.toLowerCase().includes(q.toLowerCase()) || course.teacher.toLowerCase().includes(q.toLowerCase()))}
    enrolledCourses = aq(enrolledCourses)
    allCourses = aq(allCourses)
  }
  

  return (
    <CourseGrid
      user={user}
      enrolledCourses={enrolledCourses}
      allCourses={allCourses}
      searchQuery={q}
    />
  )
}
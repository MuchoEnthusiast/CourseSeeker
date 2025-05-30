import CourseGrid from '@/components/ui/CourseGrid'
import { getUserFromTokenCookie } from '@/lib/auth'
import { getDB } from '@/lib/db'
import { redirect } from 'next/navigation'
import Link from 'next/link'


export default async function Courses({ searchParams }) {
  const user = await getUserFromTokenCookie()
  if(!user) {
    redirect('/login')
    return <>Not logged in</>
  }

  const db = await getDB()
  let enrolledCourses = await db.all(`
    SELECT c.id, c.name, c.teacher
    FROM courses c
    JOIN user_course uc ON uc.courseId = c.id
    WHERE uc.username = ?
  `, [user.username])

  let allCourses = await db.all(`SELECT id, name, teacher FROM courses`)
  
  //Filter by search in url search param '?q='
  const q = (await searchParams).q
  if(q) {
    const aq = (c) => {return c.filter(course => course.name.toLowerCase().includes(q.toLowerCase()) || course.teacher.toLowerCase().includes(q.toLowerCase()))}
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
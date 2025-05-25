// import { getUserFromTokenCookie } from '@/lib/auth'
// import { getDB } from '@/lib/db'
// import Link from 'next/link'


// export default async function Dashboard() {
//   const user = await getUserFromTokenCookie()
//   if(!user) return <>Not logged in</>

//   const db = await getDB()
//   const courses = await db.all(`
//     SELECT c.id, c.name
//     FROM courses c
//     JOIN user_course uc ON uc.courseId = c.id
//     WHERE uc.username = ?
//   `, [user.username])

//   return (
//     <div className="container my-5">
//       <h2 className="mb-4">Ciao, {user.username}!</h2>

//       <div className="row g-4">
//         {courses.map(course => (
//           <div key={course.id} className="col-md-4">
//             <div className="card shadow border-0" style={{
//               borderRadius: '20px',
//               border: '4px solid #9b30d9',
//               overflow: 'hidden'
//             }}>
//               <div className="card-body d-flex justify-content-between align-items-start" style={{ minHeight: '120px' }}>
//                 <div>
//                   <h5 className="card-title mb-1">{course.name}</h5>
//                   <p className="card-subtitle text-muted" style={{ fontSize: '0.9rem' }}>
//                     Prof's Name Surname
//                   </p>
//                 </div>
//                 <i className="bi bi-image text-muted fs-3"></i>
//               </div>
//               <div className="card-footer bg-light border-0 p-0">
//                 <Link
//                   href={`/courses/${course.id}`}
//                   className="btn btn-lg w-100 text-white"
//                   style={{
//                     backgroundColor: '#c287f5',
//                     borderTopLeftRadius: '0',
//                     borderTopRightRadius: '0',
//                     borderBottomLeftRadius: '16px',
//                     borderBottomRightRadius: '16px'
//                   }}
//                 >
//                   <div className="d-flex justify-content-between align-items-center px-3">
//                     <span>View details</span>
//                     <i className="bi bi-arrow-right"></i>
//                   </div>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

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
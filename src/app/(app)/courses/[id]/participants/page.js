import { getCourse, isUserEnrolled, isUserOwner } from "@/lib/data"
import { getUserFromTokenCookie } from "@/lib/auth"
import { redirect } from 'next/navigation'

function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}


export default async function Participants({ params }) {
  const user = await getUserFromTokenCookie()
  if(!user) {
    redirect('/login')
    return <>Not logged in</>
  }

  const { id } = await params;
  const course = await getCourse(id)
  if(!course) {
    notFound()
  }

  if(!await isUserEnrolled(user.username, id)) return <>Not enrolled</>

  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="w-50">Name / Surname</th>
            <th className="w-25">Role</th>
            <th className="w-25">Last visited</th>
          </tr>
        </thead>
        <tbody>
          {course.users.sort((a, b) => (a.name + a.surname).localeCompare(b.name + b.surname)).map((user, idx) => (
            <tr key={idx}>
              <td>
                <div className="d-flex align-items-center">
                  <span>{user.name + " " + user.surname + (course.teacher === user.username ? " (Owner)" : "")}</span>
                </div>
              </td>
              <td>{capitalize(user.role)}</td>
              <td>{new Date(user.lastVisited).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
import { notFound, redirect } from "next/navigation";
import { getCourse, getGrades, isUserEnrolled, isUserOwner } from "@/lib/data"
import { getUserFromTokenCookie } from "@/lib/auth"
import GradesTableStudent from "@/components/ui/GradesTableStudent";
import GradesTableTeacher from "@/components/ui/GradesTableTeacher";

export default async function Grades({ params }) {
  const user = await getUserFromTokenCookie()
  if(!user) {
    redirect('/login')
    return <>Not logged in</>
  }

  const { id } = await params
  const course = await getCourse(id)
  if(!course) {
    notFound()
  }

  if(!await isUserEnrolled(user.username, id)) return <>Not enrolled</>
  const userOwner = await isUserOwner(user.username, id)


  return (
    <div className="container mt-5">
      <h3 className="mb-4">Grades</h3>
      {user.role === "teacher" && userOwner ? (
          <GradesTableTeacher user={user} id={id} />
        ) : (
          <GradesTableStudent user={user} id={id} />
        )
      }
    </div>
  )
}

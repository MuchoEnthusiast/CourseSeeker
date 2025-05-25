import { notFound } from "next/navigation";
import { getCourse, getGrades, isUserEnrolled } from "@/lib/data"
import { getUserFromTokenCookie } from "@/lib/auth"
import GradesTableStudent from "@/components/ui/GradesTableStudent";
import GradesTableTeacher from "@/components/ui/GradesTableTeacher";

export default async function Grades({ params }) {
  const user = await getUserFromTokenCookie()
  if(!user) return <>Not logged in</>

  const { id } = await params
  const course = await getCourse(id)
  if(!course) {
    notFound()
  }

  if(!await isUserEnrolled(user.username, id)) return <>Not enrolled</>


  return (
    <div className="container mt-5">
      <h3 className="mb-4">Grades</h3>
      {user.role === "teacher" ? (
          <GradesTableTeacher user={user} id={id} />
        ) : (
          <GradesTableStudent user={user} id={id} />
        )
      }
    </div>
  )
}

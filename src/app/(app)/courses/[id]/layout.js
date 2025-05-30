import BackButton from "@/components/ui/BackButton";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCourse, isUserEnrolled, isUserOwner, updateLastVisited } from "@/lib/data"
import { getUserFromTokenCookie } from "@/lib/auth"
import EnrollDialog from "@/components/ui/EnrollDialog";
import UnenrollButton from "@/components/ui/UnenrollButton";
import DeleteCourseButton from "@/components/ui/DeleteCourseButton";
import ShareButton from "@/components/ui/ShareButton";
import { getDB } from "@/lib/db";

export default async function Layout({ children, params }) {
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

  updateLastVisited(user.username, id)
  const userEnrolled = await isUserEnrolled(user.username, id)
  const userOwner = await isUserOwner(user.username, id)

  const db = await getDB()
  const coursePassword = await db.get(
    'SELECT password FROM courses WHERE id = ?',
    [course.id]
  )

  return (
    <div>
      { userEnrolled ? (
      <>
        <div className="container position-relative d-flex align-items-center">
          <div className="me-auto"><BackButton /></div>

          <div className="position-absolute top-50 start-50 translate-middle">
            <h1 className="fw-bold">{course.name}</h1>
            
          </div>
          <ShareButton />
          <UnenrollButton user={user} id={id} />
          { user.role === "teacher" && userOwner && (<DeleteCourseButton id = {id} />) }
        </div>

        <div className="container mt-3">
          <div className="card shadow rounded-4 full-card px-4 py-3">
            <div className="card-header bg-white border-0">
              <nav className="nav justify-content-center gap-3">
                <Link className="btn border-0 text-black bg-transparent" href={`/courses/${id}`}>Topics</Link>
                <Link className="btn border-0 text-black bg-transparent" href={`/courses/${id}/participants`}>Participants</Link>
                <Link className="btn border-0 text-black bg-transparent" href={`/courses/${id}/grades`}>Grades</Link>
                <Link className="btn border-0 text-black bg-transparent" href={`/courses/${id}/chat`}>Chat</Link>
              </nav>
            </div>
            <div className="card-body">
              <main className="p-4">{children}</main>
            </div>
          </div>
        </div>
      </>
      ) : (
        <>
          <EnrollDialog id = {id} user = {user} askPassword = {coursePassword.password !== undefined && coursePassword.password !== ''} />
        </>
      )}
    </div>
  )
}
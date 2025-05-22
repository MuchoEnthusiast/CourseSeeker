import BackButton from "@/components/ui/BackButton";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourses } from "@/app/lib/data"
import { getUserFromTokenCookie } from "@/app/lib/auth"

export default async function Layout({ children, params }) {
  const user = await getUserFromTokenCookie()
  if(!user) return <>Not logged in</>

  const { id } = await params;
  const course = getCourses(id)
  if(!course) {
    notFound()
  }

  return (
    <div>
      <div className="container position-relative d-flex align-items-center">
        <div className="me-auto"><BackButton /></div>

        <div className="position-absolute top-50 start-50 translate-middle">
          <h1 className="fw-bold">{course.name}</h1>
        </div>
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

      {/* <div className="container h-100 d-flex justify-content-center align-items-center">
        <div className="card rounded-5 shadow" style={{maxWidth: "900px"}}>
          <div className="card-header bg-white border-0">
            <nav className="nav justify-content-center gap-3">
              <Link className="btn border-0 text-black bg-transparent" href={`/courses/${id}`}>Topics</Link>
              <Link className="btn border-0 text-black bg-transparent" href={`/courses/${id}/participants`}>Participants</Link>
              <Link className="btn border-0 text-black bg-transparent" href={`/courses/${id}/grades`}>Grades</Link>
              <Link className="btn border-0 text-black bg-transparent" href={`/courses/${id}/chat`}>Chat</Link>
            </nav>
          </div>

          <div className="card-body">
            <h5 className="card-title text-center">Welcome</h5>
            <p className="card-text text-center">This is a full-page card with rounded corners and a centered nav bar.</p>
          </div>

        </div>
      </div> */}

      
    </div>
  )
}
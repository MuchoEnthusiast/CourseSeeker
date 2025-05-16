import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Layout({ children, params }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:3000/api/courses/${id}`, {
    cache: "no-store",
  });

  if(!res.ok) {
    notFound()
  }

  const course = await res.json()

  return (
    <div>
      <div className="container py-4 text-center">
        <h1 className="fw-bold">{course.name}</h1>
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
          <div className="card-body d-flex">
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
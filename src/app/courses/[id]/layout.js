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
      <h1>
        {course.name}
      </h1>
      <nav className="p-4 bg-gray-200">
        <ul className="flex space-x-4">
          <li><Link href={`/courses/${id}`}>Topics</Link></li>
          <li><Link href={`/courses/${id}/participants`}>Participants</Link></li>
          <li><Link href={`/courses/${id}/grades`}>Grades</Link></li>
          <li><Link href={`/courses/${id}/chat`}>Chat</Link></li>
        </ul>
      </nav>
      <main className="p-4">{children}</main>
    </div>
  )
}
import Topic from "@/components/ui/Topic";
import { notFound } from "next/navigation";
import { getCourses } from "@/app/lib/data"
import { getUserFromTokenCookie } from "@/app/lib/auth"

export default async function Course({ params }) {
  const user = await getUserFromTokenCookie()
  if(!user) return <>Not logged in</>

  const { id } = await params;
  const course = getCourses(id)
  if(!course) {
    notFound()
  }
  
  return (
    <div>
      {
        course.topics.map((topic, index) => (
          <Topic key = {index} topic = {topic} />
        ))
      }
    </div>
  );
}

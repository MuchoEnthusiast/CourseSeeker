import Topic from "@/components/ui/Topic";
import { notFound } from "next/navigation";
import { getCourse, isUserEnrolled } from "@/lib/data"
import { getUserFromTokenCookie } from "@/lib/auth"
import CreateTopicButton from "@/components/ui/CreateTopicButton";

export default async function Course({ params }) {
  const user = await getUserFromTokenCookie()
  if(!user) return <>Not logged in</>

  const { id } = await params
  const course = await getCourse(id)
  if(!course) {
    notFound()
  }

  if(!await isUserEnrolled(user.username, id)) return <>Not enrolled</>
  
  return (
    <div>
      {user.role === 'teacher' && (<CreateTopicButton id={id} />)}
      {
        course.topics.map((topic, index) => (
          <Topic key = {index} id = {id} topic = {topic} user = {user} />
        ))
      }
    </div>
  );
}

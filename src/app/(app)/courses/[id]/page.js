import Topic from "@/components/ui/Topic";
import { notFound } from "next/navigation";
import { getCourse } from "@/lib/data"
import { getUserFromTokenCookie } from "@/lib/auth"
import CreateTopicButton from "@/components/ui/CreateTopicButton";

export default async function Course({ params }) {

  const { id } = await params
  const course = await getCourse(id)
  
  if(!course) {
    notFound()
  }
  
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





// import Topic from "@/components/ui/Topic";
// import { notFound } from "next/navigation";
// import { getCourseById } from "@/app/lib/courses"
// import { getUserFromTokenCookie } from "@/app/lib/auth"

// export default async function Course({ params }) {
//   const user = await getUserFromTokenCookie()
//   if(!user) return <>Not logged in</>

//   const { id }  = params;
//   const course = await getCourseById(id); 
//   if(!course) {
//     notFound()
//   }
  
//   return (
//     <div>
//       {
//         course.topics.map((topic, index) => (
//           <Topic key = {index} topic = {topic} />
//         ))
//       }
//     </div>
//   );
// }

import Topic from "@/components/ui/Topic";
import { notFound } from "next/navigation";
import { getCourseById, getCourseTopics } from "@/app/lib/courses";
import AddTopicForm from '@/components/AddTopicForm';
import { getUserFromTokenCookie } from '@/app/lib/auth';
import { cookies } from 'next/headers';








export default async function Course({ params }) {

  const { id } = params;
  const course = await getCourseById(id);
  if (!course) notFound();

  const user = getUserFromTokenCookie(cookies());
  const topics = await getCourseTopics(id);


  return (
    <div>
      {(user?.role === 'admin' || user?.role === 'teacher') && (
        <AddTopicForm courseId={id} />
      )}

      {topics.map((topic, index) => (
        <Topic key={index} topic={topic} />
      ))}
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

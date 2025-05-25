import Topic from "@/components/ui/Topic";
import { notFound } from "next/navigation";
import { getCourseById, getCourseTopics } from "@/app/lib/courses";
import { getUserFromTokenCookie } from "@/app/lib/auth";

export default async function Course({ params }) {

  const { id } = params;
  const course = await getCourseById(id);
  if (!course) notFound();

  const topics = await getCourseTopics(id);

  return (
    <div>
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

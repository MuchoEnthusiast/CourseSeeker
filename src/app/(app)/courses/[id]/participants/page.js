import { notFound } from "next/navigation";
import { getUserFromTokenCookie } from "@/app/lib/auth";
import { getCourseParticipants } from "@/app/lib/courses";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation"; 

export default async function Participants({ params }) {
  const user = getUserFromTokenCookie(cookies());
  if (!user) {
    redirect('/login')
  }

  const { id } = params;
  const participants = await getCourseParticipants(id);

  if (!participants || participants.length === 0) {
    return <p className="text-center mt-4">No participants found for this course.</p>;
  }

  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="w-50">Name / Surname</th>
            <th className="w-25">Role</th>
            <th className="w-25">Last visited</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((user, idx) => (
            <tr key={idx}>
              <td>
                <div className="d-flex align-items-center">
                  <span>{user.username}</span>
                </div>
              </td>
              <td>{user.role}</td>
              <td>{new Date(user.last_visited).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}





// import { getCourses } from "@/app/lib/data"
// import { notFound } from "next/navigation";
// import { getUserFromTokenCookie } from "@/app/lib/auth"
// import { getCourseParticipants } from "@/app/lib/courses";

// export default async function Participants({ params }) {
//   const user = await getUserFromTokenCookie()
//   if(!user) return <>Not logged in</>

//   const { id } = await params;
//   const participants = await getCourseParticipants(id);


//   const course = getCourses(id)
//   if(!course) {
//     notFound()
//   }

//   return (
//     <div>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th className="w-50">Name / Surname</th>
//             <th className="w-25">Role</th>
//             <th className="w-25">Last visited</th>
//           </tr>
//         </thead>
//         <tbody>
//           {course.participants.map((user, idx) => (
//             <tr key={idx}>
//               <td>
//                 <div className="d-flex align-items-center">
//                   {/* <div
//                     className="rounded-circle d-flex align-items-center justify-content-center"
//                     style={{
//                       width: '40px',
//                       height: '40px',
//                       marginRight: '10px',
//                       color: 'white',
//                       fontSize: '1.2rem',
//                     }}
//                   >
//                     <i className="bi bi-person" />
//                   </div> */}
//                   <span>{user.name + " " + user.surname}</span>
//                 </div>
//               </td>
//               <td>{user.role}</td>
//               <td>{new Date(user.lastVisited).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }
import UserProfilePage from '@/components/ui/UserProfilePage';
import { getUserFromTokenCookie } from '@/lib/auth';
import { getUserDetailsAndCourses } from '@/lib/data';
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await getUserFromTokenCookie()
  if(!user) {
    redirect('/login')
    return <>Not logged in</>
  }


  const fullUser = await getUserDetailsAndCourses(user.username);
  return <UserProfilePage user={fullUser} />
}
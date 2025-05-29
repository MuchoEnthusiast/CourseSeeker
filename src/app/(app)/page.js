import { getUserFromTokenCookie } from '@/lib/auth';
import { redirect } from 'next/navigation'
import Image from 'next/image';

export default async function Home() {
  const user = await getUserFromTokenCookie()
  if(!user) {
    redirect('/login')
    return <>Not logged in</>
  }


  return (
    <div>
      <main>
        <h1>Ciao, {user.username}!</h1>
      </main>

    </div>
  );
}
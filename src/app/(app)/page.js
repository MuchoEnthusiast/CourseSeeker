import { getUserFromTokenCookie } from '@/lib/auth';
import Image from 'next/image';

export default async function Home() {
  const user = await getUserFromTokenCookie()
  if(!user) return <>Not logged in</>


  return (
    <div>
      <main>
        <h1>Ciao, {user.username}!</h1>
        <p>still in development god help us all amen</p>
        <Image
          src="/волк фото-ловушка.jpg"
          width={500}
          height={500}
          alt="Courseseeker logo"
        />
        <p></p>
      </main>

    </div>
  );
}
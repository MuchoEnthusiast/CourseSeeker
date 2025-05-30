'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

//This page, when visited, calls the logout api endpoint which clears user's session
export default function Login() {
  const router = useRouter()
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/logout')

      if (res.ok) router.push('/login')
      else alert('Logout failed')
    })()
  }, [])


  return (
    <div>
      Logout
    </div>
  );
}

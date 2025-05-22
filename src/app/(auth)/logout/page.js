'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

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
      <h1>Logout Page</h1>
    </div>
  );
}

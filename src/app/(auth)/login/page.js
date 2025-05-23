'use client'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const login = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: "test",
        password: "test"
      })
    })

    if (res.ok) router.push('/courses/1')
    else alert('Login failed')
  }
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={login}>Login</button>
    </div>
  );
}

// 'use client'
// import { useRouter } from 'next/navigation'

// export default function Login() {
//   const router = useRouter()
//   const login = async () => {
//     const res = await fetch('/api/login', {
//       method: 'POST',
//       body: JSON.stringify({
//         username: "test",
//         password: "test"
//       })
//     })

//     if (res.ok) router.push('/courses/1')
//     else alert('Login failed')
//   }
//   return (
//     <div>
//       <h1>Login Page</h1>
//       <button onClick={login}>Login</button>
//     </div>
//   );
// }


'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import './login.css'

export default function Login() {
  const router = useRouter()
  const [email, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const login = async () => {
    setError('')
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (res.ok) {
      router.push('/courses')
    } else {
      setError('Invalid login or password')
    }
  }

  return (
    <div className="login-container">
      {/* <h1 className="login-title">/h1> */}
      <Image
        src="/courseseeker_logo_black.svg"
        width={250}
        height={50}
        alt="Courseseeker logo"
        className="mb-8" // 👈 отступ в Tailwind
      />

      <div className="login-form">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={e => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={login} className="login-button">Login</button>
        {error && <p className="login-error">{error}</p>}
        <div className="login-links">
          <Link href="/forgot-password" passHref>Forgot your password?</Link>
          <Link href="/register" passHref>Create a new account</Link>
        </div>

      </div>
    </div>
  )
}

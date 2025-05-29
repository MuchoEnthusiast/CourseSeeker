'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import './login.css'

export default function Login() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  //If already logged in skip login page
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/login')
      if (res.ok) router.push('/courses')
    })()
  }, [])

  const login = async (e) => {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    if (res.ok) {
      router.push('/courses')
    } else {
      setError('Invalid login or password')
    }
  }

  return (
    <div className="login-container">
      <Image
        src="/courseseeker_logo_black.svg"
        width={250}
        height={50}
        alt="Courseseeker logo"
        className="mb-8"
      />

      <div className="login-form">
        <form onSubmit={login} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
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
          <button type="submit" className="login-button">Login</button>
        
          {error && <p className="login-error">{error}</p>}
          <div className="login-links">
            <Link href="/register" passHref>Create a new account</Link>
            
          </div>
        </form>
      </div>
    </div>
  )
}

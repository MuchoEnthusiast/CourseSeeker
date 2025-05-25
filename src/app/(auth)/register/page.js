'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import "@/app/(auth)/login/login.css"
import Link from 'next/link'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [role, setRole] = useState('student')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/login')
      if (res.ok) router.push('/courses')
    })()
  }, [])

  const handleRegister = async () => {
    setError('')
    if(!email || !password || !name || !surname || !role) {
      setError('Missing fields')
      return
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password, role, name, surname })
    })

    if (!res.ok) {
      setError('Registration failed')
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Create an Account</h1>
      <div className="login-form">
        <input
          type="email"
          placeholder="Username"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="login-input"
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="login-input"
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={e => setSurname(e.target.value)}
          className="login-input"
        />
        <div className="mb-4">
          <label className="form-label">Role</label>
          <select className="form-select" name="role" value={role} onChange={e => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <button onClick={handleRegister} className="login-button">
          Register
        </button>
        {error && <p className="login-error">{error}</p>}
        <div className="login-links">
          <Link href="/login" passHref>Already registered?</Link>
        </div>
      </div>
    </div>
  )
}





'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import "@/app/(auth)/login/login.css"

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleRegister = async () => {
    setError('')

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'Registration failed')
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Create an Account</h1>
      <div className="login-form">
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="login-input"
        />
        <input
          type="email"
          placeholder="Email"
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
        <button onClick={handleRegister} className="login-button">
          Register
        </button>
        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  )
}







// // Registration page
// export default function RegisterPage() {
//   return (
//     <div>
//       <h1>Register Page</h1>
//     </div>
//   );
// }



'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function EnrollDialog({ user, id, askPassword }) {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleEnroll = async () => {
    const res = await fetch(`/api/courses/${id}/enroll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })

    if(res.ok) {
        router.refresh()
    } else if(res.status === 401) {
      setError('Wrong password')
    } else {
        alert('Error enrolling')
    }
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center px-3 rounded-4">
      <h3 className="mb-4 text-dark">You are not enrolled</h3>

      {askPassword && (
      <input
          type="password"
          className="form-control mb-3 w-auto"
          style={{ width: '250px' }}
          placeholder="Enter course password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      )}
      {error && (
                  <div className="alert alert-danger w-auto text-center py-2" role="alert">
                    {error}
                  </div>
                )}

      <div className="d-flex gap-3">
        <button
          className="btn btn-outline-secondary btn-lg"
          onClick={() => router.back()}
        >
          ← Go Back
        </button>

        <button
          className="btn btn-success btn-lg"
          onClick={handleEnroll}
          disabled ={askPassword && !password}
        >
          Enroll Now →
        </button>
      </div>
    </div>
  )
}
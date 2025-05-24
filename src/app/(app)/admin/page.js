'use client'

import { useEffect, useState } from 'react'

export default function AdminPage() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  const fetchUsers = async () => {
    const res = await fetch('/api/admin/users')
    if (res.ok) {
      const data = await res.json()
      setUsers(data)
    } else {
      setError('Access denied')
    }
  }

  const updateRole = async (email, newRole) => {
    await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role: newRole }),
    })
    fetchUsers()
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  if (error) return <p>{error}</p>

  return (
    <div className="container mt-5">
      <h2>Admin Panel – Users</h2>
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Current Role</th>
            <th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => updateRole(u.email, e.target.value)}
                  className="form-select"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateCourseButton() {
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleCreate = async () => {
    if (!title.trim()) return

    const res = await fetch('/api/courses/0', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: title, password })
    })

    const data = await res.json()
    if (res.ok && data.id) {
      setShow(false)
      setTitle('')
      router.push(`/courses/${data.id}`)
      router.refresh()
    } else if(res.status === 406) {
      alert('Name not available')
    } else {
      alert('Failed to create course')
    }
  }

  return (
    <>
      <button className="btn btn-success me-2" onClick={() => setShow(true)}>
        + Create Course
      </button>

      {show && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">New Course</h5>
                <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Course title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password (optional)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShow(false)}>Cancel</button>
                <button className="btn btn-success" onClick={handleCreate} disabled={!title.trim()}>
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
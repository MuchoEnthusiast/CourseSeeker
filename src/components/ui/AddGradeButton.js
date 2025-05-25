'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react'


export default function AddGradeButton({ id, users }) {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [selectedUser, setSelectedUser] = useState('')
  const [gradeNumber, setGradeNumber] = useState('')

  const handleAdd = async () => {
    if (!name || !selectedUser || !gradeNumber) return

    const res = await fetch(`/api/courses/${id}/grades/0`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        username: selectedUser,
        name,
        gradeNumber,
        }),
     })

     if(res.status === 406) {
      alert("This grade already exists")
      return
     } else if (!res.ok) {
      alert("Failed to create grade")
      return
    }

    setShow(false)
    router.refresh()
  }

  return (
    <>
      <button className="btn btn-outline-success mb-3" onClick={() => setShow(true)}>
        + Add Grade
      </button>

      {show && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content rounded-3 shadow">
              <div className="modal-header">
                <h5 className="modal-title">Add Grade</h5>
                <button className="btn-close" onClick={() => setShow(false)}></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                    <label className="form-label">Grade Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter grade name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                  <label className="form-label">User</label>
                  <select
                    className="form-select"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                  >
                    <option value="">Select a user</option>
                    {users.map((u) => (
                      <option key={u.username} value={u.username}>
                        {u.username}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Grade</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter grade"
                    value={gradeNumber}
                    onChange={(e) => setGradeNumber(e.target.value)}
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="modal-footer d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={() => setShow(false)}>
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  disabled={!selectedUser || gradeNumber === ''}
                  onClick={handleAdd}
                >
                  Add Grade
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
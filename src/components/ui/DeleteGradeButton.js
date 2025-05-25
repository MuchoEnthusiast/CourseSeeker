'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

function nameUsernameToGradeId(grades, gradeName, username) {
    const v = grades.filter(g => g.username === username && g.gradeName === gradeName)
    return v.length >= 1 ? v[0] : undefined
}

export default function DeleteGradeButton({ id, users, grades }) {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [selectedUser, setSelectedUser] = useState('')
  const [gradeName, setGradeName] = useState('')
  const [grade, setGrade] = useState(null)

  const handleDelete = async () => {
    if (!selectedUser || !gradeName) return

    if(!grade) {
      console.log("No grade selected")
      return
    }

    const res = await fetch(`/api/courses/${id}/grades/${grade.id}`, {
        method: 'DELETE'
    })

    if (!res.ok) {
        alert('Error deleting grade')
        return
    }

    setGrade(null)
    setShow(false)
    router.refresh()
  }

  useEffect(() => {
    setGrade(nameUsernameToGradeId(grades, gradeName, selectedUser))
  }, [selectedUser, gradeName])


  return (
    <>
      <button className="btn btn-outline-danger mb-3" onClick={() => setShow(true)}>
        - Delete Grade
      </button>

      {show && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content rounded-3 shadow">
              <div className="modal-header">
                <h5 className="modal-title">Delete Grade</h5>
                <button className="btn-close" onClick={() => setShow(false)}></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Grade Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter grade name"
                    value={gradeName}
                    onChange={(e) => setGradeName(e.target.value) }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">User</label>
                  <select
                    className="form-select"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value) }
                  >
                    <option value="">Select a user</option>
                    {users.map((u) => (
                      <option key={u.username} value={u.username}>
                        {u.username}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-footer d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={() => setShow(false)}>
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  disabled={!selectedUser || gradeName === '' || !grade}
                  onClick={handleDelete}
                >
                  Delete Grade
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
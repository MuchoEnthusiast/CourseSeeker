'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteCourseButton({ id }) {
  const [show, setShow] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    const res = await fetch(`/api/courses/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setShow(false)
      router.push('/courses') // or wherever you want
    } else {
      alert('Failed to delete course')
    }
  }

  return (
    <>
      <button
        className="btn btn-link btn-sm text-danger p-0"
        title="Delete"
        onClick={() => setShow(true)}
      >
        <i className="bi bi-trash fs-1"></i>
      </button>

      {show && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this course?
              </div>
              <div className="modal-footer d-flex gap-2">
                <button className="btn btn-secondary" onClick={() => setShow(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
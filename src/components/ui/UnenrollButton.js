'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UnenrollButton({ id, user }) {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const handleUnenroll = async () => {
    const res = await fetch(`/api/courses/${id}/unenroll`)

    if (res.ok) {
      setShowModal(false)
      router.push('/courses')
    } else {
      alert('Failed to unenroll.')
    }
  }

  return (
    <>
      <button className="btn btn-danger d-flex align-items-center gap-2" onClick={() => setShowModal(true)}>
        <i className="bi bi-person-dash"></i>
        Unenroll
      </button>

      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Unenrollment</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to unenroll from this course?</p>
              </div>
              <div className="modal-footer d-flex gap-2">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleUnenroll}>Unenroll</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
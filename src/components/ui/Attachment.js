import { useState } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";

export default function Attachment({ id, topicId, attachment, user }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const handleDeleteConfirmed = async () => {
    const res = await fetch('/api/courses/' + id + '/topics/' + topicId + '/attachments/' + attachment.id, {
      method: 'DELETE'
    })
    setShowConfirm(false)
    router.refresh()
  }

  return (
    <div className="d-flex align-items-center me-3 mb-2">
      <Link href={"/attachments/" + attachment.id}>
        <i className="bi bi-paperclip fs-3"></i>
        <span className="text-truncate fs-5">{attachment.name}</span>
      </Link>

      {user.role === 'teacher' && (
      <button className="btn btn-link btn-sm text-danger p-0" onClick={() => setShowConfirm(true)} title="Delete">
        <i className="bi bi-trash ms-2" style={{ fontSize: '24px', color: '#f28b8b' }}></i>
      </button>
      )}

      {showConfirm && (
          <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title text-danger">Confirm Deletion</h5>
                          <button type="button" className="btn-close" onClick={() => setShowConfirm(false)}></button>
                      </div>
                      <div className="modal-body">
                          <p>Are you sure you want to delete this item?</p>
                      </div>
                      <div className="modal-footer">
                          <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
                          <button className="btn btn-danger" onClick={handleDeleteConfirmed}>Delete</button>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}

"use client";
import { useState } from "react";
import Attachment from "./Attachment";
import UploadAttachmentButton from "./UploadAttachmentButton";
import { useRouter } from 'next/navigation'

export default function Topic({ id, topic, user, userOwner }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [title, setTitle] = useState(topic.title)
  const [description, setDescription] = useState(topic.description)
  const router = useRouter()
  

  const handleDeleteConfirmed = async () => {
      await fetch(`/api/courses/${id}/topics/${topic.id}`, {
          method: 'DELETE'
      })
      router.refresh()
  }

  const handleSave = async () => {
      await fetch(`/api/courses/${id}/topics/${topic.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description })
      })
      setIsEditing(false)
      router.refresh()
  }

  return (
    <div className="card w-100 border-0">
      <div className="d-flex align-items-center">
        <button className="btn btn-link text-decoration-none p-3 p-0 fs-4" onClick={() => setIsOpen(!isOpen)}>{isOpen ? (<i className="bi bi-chevron-up"></i>) : (<i className="bi bi-chevron-down"></i>)}</button>
        

        {isEditing ? (
            <input
                type="text"
                className="form-control form-control-sm me-2"
                style={{ maxWidth: '300px' }}
                value={title}
                onChange={e => setTitle(e.target.value)}
                onBlur={() => setIsEditing(false)}
            />
        ) : (        
        <h2 className="m-0 p-0">{title}</h2>
        )}
        {user.role === 'teacher' && userOwner && (
          <>
            <button className="btn btn-link btn-sm p-0 me-2" onClick={() => setIsEditing(!isEditing)} title="Edit">
              <i className="bi bi-pencil ms-3 fs-3" style={{ fontSize: '24px', color: 'gray' }}></i>
            </button>
            <button className="btn btn-link btn-sm text-danger p-0" onClick={() => setShowConfirm(true)} title="Delete">
              <i className="bi bi-trash ms-3" style={{ fontSize: '24px', color: '#f28b8b' }}></i>
            </button>

          </>
        )}
      </div>

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

      
      {isOpen && (
        <div className="card-body ms-4">
          {isEditing ? (
            <textarea
                className="form-control"
                rows="4"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
          ) : (
              <p>{description}</p>
          )}

          {user.role === 'teacher' && userOwner && isEditing && (
              <div className="d-flex gap-2 my-2">
                  <button className="btn btn-dark ms-auto" onClick={handleSave}>Save</button>
              </div>
          )}
          
          <div className="d-flex flex-wrap">
            {
              topic.attachments.map((attachment, index) => (
                <Attachment key={index} id = {id} topicId = {topic.id} attachment={attachment} user={user} userOwner={userOwner} />
              ))
            }
          </div>

          {user.role === 'teacher' && userOwner && (
            <div className="d-flex gap-2 my-2">
              <UploadAttachmentButton user = {user} id = {id} topicId={topic.id} onUpload={router.refresh}/>
            </div>
          )}
        </div>
      )}
      
    </div>
  );
}

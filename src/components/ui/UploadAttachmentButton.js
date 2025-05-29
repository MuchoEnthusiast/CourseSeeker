'use client'

import { useRef, useState } from 'react'

export default function AttachmentUploader({user, id, topicId, onUpload}) {
  const [show, setShow] = useState(false)
  const [file, setFile] = useState(null)
  const [name, setName] = useState('')
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) setFile(droppedFile)
  }

  const handleBrowse = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) setFile(selectedFile)
  }

  const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

  const handleUpload = async () => {
    
    //We store attachment files in the db encoded as base64 strings
    const base64file = await fileToBase64(file)

    const res = await fetch('/api/courses/' + id + '/topics/' + topicId + '/attachments/0', {
      method: 'POST',
      body: JSON.stringify({ name, fileName: file.name, file: base64file })
    })

    if (res.ok) {
      setShow(false)
      setFile(null)
      setName('')
    } else {
      alert('Upload failed.')
    }
    onUpload()
  }

  return (
    <>
      
      <button className="btn btn-success" onClick={() => setShow(true)}>
        Add an attachment
      </button>

      {show && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">Upload Attachment</h5>
                <button
                  className="btn-close"
                  onClick={() => setShow(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label fw-bold">Attachment Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div
                  className={`border rounded-3 text-center p-4 mb-3 ${
                    dragging ? 'bg-light border-primary' : 'bg-body-tertiary'
                  }`}
                  style={{
                    borderStyle: 'dashed',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDragging(true)
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current.click()}
                >
                  <p className="text-muted mb-2">
                    {file ? `Selected file: ${file.name}` : 'Drag and drop a file here'}
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      fileInputRef.current.click()
                    }}
                  >
                    Browse files
                  </button>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  className="d-none"
                  onChange={handleBrowse}
                />
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShow(false)}>
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={handleUpload}
                  disabled={!file || !name.trim()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateTopicButton({ id }) {
    const [show, setShow] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState(null)
    const [isError, setIsError] = useState(false)
    const router = useRouter()

    const handleCreate = async () => {
        const res = await fetch('/api/courses/' + id + '/topics/0', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        })
        console.log(await res.json())

        if (!res.ok) {
            setMessage('Save failed.')
            setIsError(true)
            return
        }

        setMessage('Save was successful!')
        setIsError(false)
        setShow(false)
        setTitle('')
        setDescription('')
        router.refresh()
    }

    return (
        <>
        <button
            className="btn btn-success"
            style={{ padding: '10px 20px', fontSize: '16px' }}
            onClick={() => setShow(true)}
        >
            Create new topic
        </button>

        {show && (
            <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Create New Topic</h5>
                    <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                </div>
                <div className="modal-body">
                    <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        rows="4"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    ></textarea>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setShow(false)}>Cancel</button>
                    <button className="btn btn-success" onClick={handleCreate} disabled={!title.trim() || !description.trim()}>Create</button>
                </div>
                </div>
            </div>
            </div>
        )}

            {message && (
                <div className={`alert mt-3 ${isError ? 'alert-danger' : 'alert-success'} alert-dismissible fade show`} role="alert">
                    {message}
                    <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
                </div>
            )}
        </>
    )
}
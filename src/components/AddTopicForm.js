'use client';
import { useState } from 'react';

export default function AddTopicForm({ courseId, onSuccess }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [attachmentInput, setAttachmentInput] = useState('');
    const [error, setError] = useState('');

    const handleAddAttachment = () => {
        if (attachmentInput.trim()) {
            setAttachments(prev => [...prev, attachmentInput.trim()]);
            setAttachmentInput('');
        }
    };

    const handleSubmit = async () => {
        const res = await fetch(`/api/courses/${courseId}/topics`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, attachments }),
        });

        if (res.ok) {
            setTitle('');
            setDescription('');
            setAttachments([]);
            setError('');
            onSuccess?.();
        } else {
            const data = await res.json();
            setError(data.error || 'Failed to add topic');
        }
    };

    return (
        <div className="mb-4">
            <h5>Add Topic</h5>
            <input className="form-control mb-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <textarea className="form-control mb-2" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />

            <div className="input-group mb-2">
                <input
                    className="form-control"
                    placeholder="Attachment name"
                    value={attachmentInput}
                    onChange={e => setAttachmentInput(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button" onClick={handleAddAttachment}>Add</button>
            </div>

            {attachments.length > 0 && (
                <ul className="list-group mb-2">
                    {attachments.map((att, idx) => (
                        <li key={idx} className="list-group-item py-1">{att}</li>
                    ))}
                </ul>
            )}

            <button className="btn btn-primary" onClick={handleSubmit}>Add Topic</button>
            {error && <p className="text-danger mt-2">{error}</p>}
        </div>
    );
}

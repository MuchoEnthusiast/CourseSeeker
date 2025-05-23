'use client'
import { useState } from 'react'

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      user: 'User1',
      text: 'Ciao tutti ! ! ! o(〃＾▽＾〃)o',
      time: '01:00 AM'
    },
    {
      user: 'User2',
      text: 'Buongiorno ! ! !  (≧▽≦)',
      time: '01:02 AM'
    }
  ])

  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim())
      return

    setMessages([...messages, {
      user: 'You',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }])
    setInput('')
  }

  return (
    <div className="d-flex flex-column p-3" style={{ maxWidth: 300, margin: 'auto', border: 'solid ', borderRadius: 10, height: '100vh' }}>
      <div className="text-center mb-2" style={{ fontSize: '0.9rem' }}>01 January 1970</div>
      <div className="flex-grow-1 overflow-auto mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <div style={{ fontStyle: 'italic', color: msg.user === 'User1' ? 'green' : msg.user === 'User2' ? 'orange' : 'black' }}>{msg.user}</div>
            <div className="bg-light p-2 rounded">{msg.text}</div>
            <div className="text-end text-muted" style={{ fontSize: '0.7rem' }}>{msg.time}</div>
          </div>
        ))}
      </div>
      <div className="input-group">
        <input type="text" className="form-control" value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message..." />
        <button className="btn btn-dark" onClick={handleSend}><i className="bi bi-send"></i></button>
      </div>
    </div>
  )
}
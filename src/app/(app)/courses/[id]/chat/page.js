'use client'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'


function generateColor(seed)  {
  let hash = 2166136261
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i)
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24)
  }

  hash = hash >>> 0

  const hex = (hash & 0xffffff).toString(16).padStart(6, '0')

  return "#" + hex
} 

export default function Chat() {
  const scrollRef = useRef(null)
  function scrollToBottom() {
    const el = scrollRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }
  const [, forceUpdate] = useState(0)
  function refresh() {
    forceUpdate(n => n + 1)
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }


  const params = useParams()
  const { id } = params

  const [data, setData] = useState({ messages: {}, lastTimestamp: 0 })
  const dataRef = useRef({ messages: {}, lastTimestamp: 0 })
  const [user, setUser] = useState({ username: "null" })

  const retrieveMessages = async () => {
    let currentData = dataRef.current

    if(Number(currentData.lastTimestamp) === 0) {
      setTimeout(scrollToBottom, 100)
    }

    const res = await fetch('/api/courses/' + id + '/chat?afterTimestamp=' + currentData.lastTimestamp)
    if(!res.ok) {
      console.log("Error retrieving messages")
      return
    }

    const newMessages = await res.json()
    if(Object.keys(newMessages).length === 0) {
      console.log(currentData)
      return
    }

    currentData.messages = { ...currentData.messages, ...newMessages }


    const timestamps = Object.keys(currentData.messages)
    currentData.lastTimestamp = timestamps[timestamps.length - 1]


    dataRef.current = currentData
    setData(currentData)
    refresh()
    setTimeout(scrollToBottom, 1)

    console.log(currentData)
  }

  // useEffect(() => {
  //   (async () => {
  //     await fetch('/api/websocketinit')

  //     socketRef.current = new WebSocket('ws://localhost:3000')

  //     socketRef.current.onmessage = (event) => {
  //       console.log(event)
  //     }
  //   })()

  //   return () => socketRef.current.close()
  // }, [])

  useEffect(() => {

    (async () => {
      const res = await fetch('/api/login')
      if(!res.ok) {
        console.log("Error retrieving user")
        return
      }

      setUser(await res.json())
    })()

    retrieveMessages()

    const interval = setInterval(retrieveMessages, 1000)
    return () => clearInterval(interval)
  }, [])

  const [input, setInput] = useState('')
  const handleSend = async () => {
    if (!input.trim())
      return

    const text = input
    setInput('')

    const res = await fetch('/api/courses/' + id + '/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({text})
    })

    if(!res.ok) {
      console.log("Error posting message")
      return
    }

    await retrieveMessages()
    refresh()
    setTimeout(scrollToBottom, 1)
  }

  const handleRefresh = () => {
    retrieveMessages()
  }

  return (
    <div className="d-flex flex-column p-3" style={{ margin: 'auto', border: 'solid ', borderRadius: 10, height: '100vh' }} >
      <div className="text-center mb-2" style={{ fontSize: '0.9rem' }}>Chat</div>
      <div className="flex-grow-1 overflow-auto mb-2" ref={scrollRef}>

        {Object.entries(data.messages).map(([timestamp, message]) => (
          <div key={timestamp} className="mb-2">
            <div style={{ fontStyle: 'italic', color: generateColor(message.username) }}>{message.username}</div>
            <div className="bg-light p-2 rounded">{message.text}</div>
            <div className="text-end text-muted" style={{ fontSize: '0.7rem' }}>{new Date(Number(timestamp)).toDateString()}</div>
          </div>
        ))}
      </div>
      
      <div className="input-group">
        <button className="btn btn-outline-primary d-flex align-items-center gap-2" onClick={handleRefresh}><i className="bi bi-arrow-clockwise"></i></button>
        <input type="text" className="form-control" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type a message..." />
        <button className="btn btn-dark" onClick={handleSend}><i className="bi bi-send"></i></button>
      </div>
    </div>
  )
}
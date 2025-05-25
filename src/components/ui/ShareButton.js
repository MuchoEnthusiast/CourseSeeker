'use client'

import { useState, useRef } from 'react'

export default function ShareButton() {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef(null)
  const buttonTextRef = useRef(null)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)

      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      timeoutRef.current = setTimeout(() => {
        setCopied(false)
        timeoutRef.current = null
      }, 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`btn d-flex align-items-center gap-2 me-2 ${copied ? 'btn-success' : 'btn-outline-primary'}`}
      style={{ width: "110px" }}
    >
      <i className={`bi ${copied ? 'bi-check-circle-fill' : 'bi-share-fill'}`}></i>
      <span ref={buttonTextRef} style={{ whiteSpace: 'nowrap' }}>
        {copied ? 'Copied!' : 'Share'}
      </span>
    </button>
  )
}
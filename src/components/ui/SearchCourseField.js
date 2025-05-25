'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

export default function SearchCourseField() {
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(searchParams.get('q') || '')
  const router = useRouter()

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        if(query.trim() !== '') {
            const encoded = encodeURIComponent(query.trim())
            router.push(`/courses?q=${encoded}`)
        } else {
            router.push(`/courses`)
        }
    }
  }

  return (
    <input
      type="text"
      className="form-control"
      placeholder="Find a course by name or teacher..."
      style={{ width: '19em' }}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  )
}
'use client'

import { useState, useEffect, useRef } from 'react'

export default function UserMenu() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="position-relative d-inline-block" ref={menuRef}>
      {open ? (
        <div
          className="position-absolute end-0 mt-2 p-3 shadow-lg"
          style={{
            backgroundColor: 'rgba(176, 131, 220, 0.85)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            minWidth: '220px',
            zIndex: 1050,
          }}
        >
          {/* Avatar in open state */}
          <div
            className="d-flex justify-content-between align-items-center mb-3"
            onClick={() => setOpen(false)}
            style={{ cursor: 'pointer' }}
          >
            <span className="text-white fw-semibold">Name Surname</span>
            <i className="bi bi-person-circle text-white fs-4"></i>
          </div>

          <ul className="list-unstyled m-0">
            {[
              { text: 'Profile', href: '#' },
              { text: 'Grades', href: '#' },
              { text: 'Calendar', href: '#' },
              { text: 'Settings', href: '#' },
              { text: 'Log out', href: '/logout' },
            ].map(({ text, href }) => (
              <li key={text}>
                <a
                  href={href}
                  className="text-white text-decoration-none d-block px-2 py-2 rounded small"
                  style={{ transition: 'background 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button
          className="btn btn-outline-light d-flex align-items-center justify-content-center"
          onClick={() => setOpen(true)}
          style={{ borderRadius: '50%', width: 42, height: 42 }}
          aria-label="Open user menu"
        >
          <i className="bi bi-person-fill fs-5 text-dark"></i>
        </button>
      )}
    </div>
  )
}
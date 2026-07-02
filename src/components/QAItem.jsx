import { useState } from 'react'

export default function QAItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{
      marginBottom: '0.5rem',
      borderRadius: '8px',
      border: '1px solid var(--border)',
      overflow: 'hidden',
      background: 'var(--bg-card)'
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          border: 'none',
          background: open ? 'var(--primary-light)' : 'transparent',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
          fontSize: '0.9rem',
          fontWeight: 500,
          color: 'var(--text)',
          textAlign: 'left',
          transition: 'background 0.15s'
        }}
      >
        <span>
          <span style={{ color: 'var(--primary)', fontWeight: 700, marginRight: '0.5rem' }}>Q:</span>
          {question}
        </span>
        <span style={{
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          transform: open ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.15s',
          flexShrink: 0
        }}>
          ▼
        </span>
      </button>
      {open && (
        <div style={{
          padding: '0 1rem 0.75rem',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6
        }}>
          <span style={{ color: 'var(--success)', fontWeight: 700, marginRight: '0.5rem' }}>A:</span>
          {answer}
        </div>
      )}
    </div>
  )
}

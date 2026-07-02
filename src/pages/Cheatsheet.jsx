import { useState, useEffect } from 'react'
import { BookOpenIcon } from '../components/Icons'

export default function Cheatsheet() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/modules/08-quick-cheatsheet.md')
      .then(res => res.text())
      .then(text => {
        setContent(text)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        Memuat...
      </div>
    )
  }

  const sections = content.split('## ').filter(Boolean)

  return (
    <div className="cheatsheet-page">
      <div className="cheatsheet-header">
        <BookOpenIcon size={28} />
        <h1>Cheatsheet</h1>
      </div>
      <p className="cheatsheet-subtitle">Ringkasan 1 kalimat per konsep — hafalkan H-1 interview!</p>

      {sections.map((section, idx) => {
        const lines = section.trim().split('\n')
        const title = lines[0].replace(/^#+\s*/, '').trim()
        const rest = lines.slice(1).join('\n')

        const items = []
        const itemLines = rest.split('\n')
        for (let i = 0; i < itemLines.length; i++) {
          const line = itemLines[i].trim()

          if (line.startsWith('|')) {
            const parts = line.split('|').filter(p => p.trim())
            if (parts.length >= 2 && parts[0].trim()) {
              items.push({
                term: parts[0].trim(),
                def: parts[1].trim()
              })
            }
          }

          const match = line.match(/^\*\*(.+?)\*\*\s*[-–—|]\s*(.+)/)
          if (match) {
            items.push({
              term: match[1].trim(),
              def: match[2].trim()
            })
          }
        }

        if (items.length === 0) return null

        return (
          <div key={idx} className="cheatsheet-section">
            <h2>{title}</h2>
            <div className="cheatsheet-grid">
              {items.map((item, i) => (
                <div key={i} className="cheatsheet-card">
                  <div className="cheatsheet-card-title">{item.term}</div>
                  <div className="cheatsheet-card-desc">{item.def}</div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

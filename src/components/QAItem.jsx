import { useState, useRef, useEffect } from 'react'

export default function QAItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef(null)
  const [height, setHeight] = useState('0px')

  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? `${contentRef.current.scrollHeight}px` : '0px')
    }
  }, [open])

  return (
    <div className="qa-item">
      <button
        className={`qa-btn ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
      >
        <span className="qa-btn-text">
          <span className="qa-q">Q:</span>
          {question}
        </span>
        <span className={`qa-arrow ${open ? 'open' : ''}`}>▼</span>
      </button>
      <div className="qa-answer-wrap" style={{ maxHeight: height, opacity: open ? 1 : 0 }}>
        <div ref={contentRef} className="qa-answer">
          <span className="qa-a">A:</span>
          {answer}
        </div>
      </div>
    </div>
  )
}

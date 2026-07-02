import { useRef, useEffect } from 'react'

export default function CodeEditor({ value, onChange, fontSize = 14 }) {
  const textareaRef = useRef(null)
  const lineNumbersRef = useRef(null)

  const lines = value.split('\n')

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.max(textareaRef.current.scrollHeight, 200) + 'px'
    }
  }, [value])

  function handleKeyDown(e) {
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.target.selectionStart
      const end = e.target.selectionEnd
      const newValue = value.substring(0, start) + '  ' + value.substring(end)
      onChange(newValue)
      requestAnimationFrame(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2
      })
    }
  }

  return (
    <div className="code-editor">
      <div className="code-editor-gutter" ref={lineNumbersRef}>
        {lines.map((_, i) => (
          <div key={i} className="code-editor-line-num">{i + 1}</div>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        className="code-editor-textarea"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        wrap="off"
        style={{ fontSize: `${fontSize}px` }}
      />
    </div>
  )
}

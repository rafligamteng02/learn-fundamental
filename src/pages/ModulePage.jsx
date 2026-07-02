import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { modules } from '../modules'
import { useProgress } from '../context/ProgressContext'
import QAItem from '../components/QAItem'

function extractQA(markdown) {
  const lines = markdown.split('\n')
  const qas = []
  let currentQ = null
  let currentA = null
  let inTable = false
  let isAnswer = false

  for (const line of lines) {
    if (line.trim().startsWith('|')) {
      inTable = true
      continue
    }
    if (inTable && !line.trim().startsWith('|')) {
      inTable = false
    }
    if (inTable) continue

    if (line.match(/^\|\s*\d+\s*\|\s*Pertanyaan/) || line.match(/^\| No/)) {
      continue
    }

    const qMatch = line.match(/^\|\s*\d+\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|$/)
    if (qMatch) {
      if (currentQ && currentA) {
        qas.push({ question: currentQ, answer: currentA })
      }
      currentQ = qMatch[1].trim()
      currentA = qMatch[2].trim()
      isAnswer = false
      continue
    }

    const qMatchSimple = line.match(/^\*\*Q:\*\*\s*(.+)/i) || line.match(/^Q:\s*(.+)/i)
    if (qMatchSimple) {
      if (currentQ && currentA) {
        qas.push({ question: currentQ, answer: currentA })
      }
      currentQ = qMatchSimple[1].trim()
      currentA = ''
      isAnswer = false
      continue
    }

    const aMatchSimple = line.match(/^\*\*A:\*\*\s*(.+)/i) || line.match(/^A:\s*(.+)/i)
    if (aMatchSimple) {
      currentA = aMatchSimple[1].trim()
      isAnswer = true
      continue
    }

    if (isAnswer && line.trim() && !line.match(/^\|/)) {
      currentA += ' ' + line.trim()
    }
  }

  if (currentQ && currentA) {
    qas.push({ question: currentQ, answer: currentA })
  }

  return qas
}

export default function ModulePage() {
  const { id } = useParams()
  const { isCompleted, toggleModule } = useProgress()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const module = modules.find(m => m.id === id)
  const currentIndex = modules.findIndex(m => m.id === id)
  const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : null
  const nextModule = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null

  useEffect(() => {
    if (!module) {
      setLoading(false)
      setError('Modul tidak ditemukan')
      return
    }

    setLoading(true)
    setError(null)

    fetch(`/modules/${module.file}`)
      .then(res => {
        if (!res.ok) throw new Error('Gagal memuat modul')
        return res.text()
      })
      .then(text => {
        setContent(text)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        Memuat modul...
      </div>
    )
  }

  if (error) {
    return <div className="error-msg">{error}</div>
  }

  if (!module) {
    return <div className="error-msg">Modul tidak ditemukan</div>
  }

  const qas = extractQA(content)

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          customStyle={{ margin: 0, borderRadius: '8px', fontSize: '0.85rem' }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
  }

  return (
    <div className="module-page">
      <div className="module-header">
        <span className="module-header-icon">{module.icon}</span>
        <h1>{module.id}. {module.title}</h1>
      </div>

      <div className="markdown">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </div>

      {qas.length > 0 && (
        <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '2px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem' }}>
            ❓ Pertanyaan Interview
          </h2>
          {qas.map((qa, i) => (
            <QAItem key={i} question={qa.question} answer={qa.answer} />
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          className={`module-progress-btn ${isCompleted(id) ? 'done' : ''}`}
          onClick={() => toggleModule(id)}
        >
          {isCompleted(id) ? '✓ Sudah Selesai' : '○ Tandai Selesai'}
        </button>
      </div>

      <div className="module-nav">
        {prevModule ? (
          <Link to={`/module/${prevModule.id}`}>
            ← {prevModule.id}. {prevModule.title}
          </Link>
        ) : (
          <span className="nav-disabled">← Sebelumnya</span>
        )}
        {nextModule ? (
          <Link to={`/module/${nextModule.id}`}>
            {nextModule.id}. {nextModule.title} →
          </Link>
        ) : (
          <span className="nav-disabled">Selanjutnya →</span>
        )}
      </div>
    </div>
  )
}

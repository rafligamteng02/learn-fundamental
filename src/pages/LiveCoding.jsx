import { useState, useEffect, useRef } from 'react'
import { problems } from '../data/problems'
import CodeEditor from '../components/CodeEditor'
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from '../components/Icons'

const STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  PASS: 'pass',
  FAIL: 'fail',
  ERROR: 'error',
}

const LEVELS = ['Semua', 'Mudah', 'Sedang', 'Sulit']

const LEVEL_COLORS = {
  Mudah: { bg: '#dcfce7', text: '#16a34a' },
  Sedang: { bg: '#fef9c3', text: '#ca8a04' },
  Sulit: { bg: '#fce4ec', text: '#dc2626' },
}

export default function LiveCoding() {
  const [level, setLevel] = useState('Mudah')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [code, setCode] = useState('')
  const [status, setStatus] = useState(STATUS.IDLE)
  const [result, setResult] = useState(null)
  const outputRef = useRef(null)

  const filtered = level === 'Semua' ? problems : problems.filter(p => p.level === level)
  const problem = filtered[currentIndex]

  useEffect(() => {
    setCurrentIndex(0)
  }, [level])

  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode)
      setStatus(STATUS.IDLE)
      setResult(null)
    }
  }, [currentIndex, level])

  useEffect(() => {
    if (result && outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [result])

  function handleRun() {
    setStatus(STATUS.RUNNING)
    setResult(null)

    setTimeout(() => {
      try {
        const res = problem.run(code)
        if (res.pass) setStatus(STATUS.PASS)
        else if (res.error) setStatus(STATUS.ERROR)
        else setStatus(STATUS.FAIL)
        setResult(res)
      } catch (e) {
        setStatus(STATUS.ERROR)
        setResult({ pass: false, error: e.message })
      }
    }, 300)
  }

  function handleReset() {
    setCode(problem.starterCode)
    setStatus(STATUS.IDLE)
    setResult(null)
  }

  if (!problem) {
    return (
      <div className="live-coding">
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '3rem 0' }}>
          Tidak ada soal untuk level ini.
        </p>
      </div>
    )
  }

  return (
    <div className="live-coding">
      {/* Level tabs */}
      <div className="lc-levels">
        {LEVELS.map(l => (
          <button
            key={l}
            className={`lc-level-btn ${level === l ? 'active' : ''}`}
            onClick={() => setLevel(l)}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="lc-header">
        <div className="lc-header-left">
          <div className="lc-progress">
            Soal {currentIndex + 1} / {filtered.length}
          </div>
          <span
            className="lc-badge2"
            style={{
              background: LEVEL_COLORS[problem.level].bg,
              color: LEVEL_COLORS[problem.level].text,
            }}
          >
            {problem.level}
          </span>
        </div>
        <div className="lc-header-right">
          <div className="lc-timer-display">
            <span className={`lc-dot ${status === STATUS.PASS ? 'done' : ''}`} />
            <span>
              {status === STATUS.RUNNING ? 'Memeriksa...'
                : status === STATUS.PASS ? 'Selesai'
                : 'Siap'}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="lc-body">
        {/* Panel soal */}
        <div className="lc-panel lc-panel-left">
          <div className="lc-soal-header">
            <div className="lc-soal-icon">{problem.icon}</div>
            <h2>{problem.title}</h2>
          </div>
          <div className="lc-soal-desc">
            <p>{problem.desc}</p>
          </div>
          <div className="lc-info-box">
            <strong>💡 Petunjuk:</strong> {problem.info}
          </div>
        </div>

        {/* Panel editor */}
        <div className="lc-panel lc-panel-right">
          <div className="lc-editor-header">
            <span className="lc-editor-lang">JavaScript</span>
            <button className="lc-btn-reset" onClick={handleReset}>↺ Reset</button>
          </div>
          <CodeEditor value={code} onChange={setCode} />
          <div className="lc-actions">
            <button
              className="lc-btn-run"
              onClick={handleRun}
              disabled={status === STATUS.RUNNING}
            >
              {status === STATUS.RUNNING ? '⏳ Memeriksa...' : '▶ Jalankan'}
            </button>
          </div>

          {/* Output */}
          {(status !== STATUS.IDLE || result) && (
            <div className="lc-output" ref={outputRef}>
              {status === STATUS.RUNNING && (
                <div className="lc-output-loading">
                  <div className="spinner" /> Mengecek jawaban...
                </div>
              )}

              {status === STATUS.PASS && result && (
                <div className="lc-output-pass">
                  <div className="lc-output-icon"><CheckIcon size={24} /></div>
                  <div className="lc-output-title">Jawaban tepat! 🎉</div>
                  <div className="lc-output-detail">Semua test case berhasil dilewati.</div>
                  {result.results && (
                    <div className="lc-test-results">
                      {result.results.map((r, i) => (
                        <div key={i} className="lc-test-item pass">
                          <span>✓</span><span>{r.desc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {status === STATUS.FAIL && result && (
                <div className="lc-output-fail">
                  <div className="lc-output-title">❌ Kurang tepat, coba lagi</div>
                  {result.failDetail && (
                    <div className="lc-output-detail">Test case gagal: <strong>{result.failDetail}</strong></div>
                  )}
                  {result.results && (
                    <div className="lc-test-results">
                      {result.results.map((r, i) => (
                        <div key={i} className={`lc-test-item ${r.pass ? 'pass' : 'fail'}`}>
                          <span>{r.pass ? '✓' : '✗'}</span>
                          <span>{r.desc}</span>
                          {!r.pass && (
                            <span className="lc-test-expected">
                              → expected {JSON.stringify(r.expected)}, got {JSON.stringify(r.actual)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {status === STATUS.ERROR && result && (
                <div className="lc-output-error">
                  <div className="lc-output-title">⚠️ Error</div>
                  <pre className="lc-error-pre">{result.error}</pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigasi */}
      <div className="lc-nav">
        <button className="lc-nav-btn" onClick={() => setCurrentIndex(i => i - 1)} disabled={currentIndex === 0}>
          <ChevronLeftIcon size={18} /> Sebelumnya
        </button>
        <div className="lc-nav-dots">
          {filtered.map((_, i) => (
            <span
              key={i}
              className={`lc-dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
        <button className="lc-nav-btn" onClick={() => setCurrentIndex(i => i + 1)} disabled={currentIndex === filtered.length - 1}>
          Selanjutnya <ChevronRightIcon size={18} />
        </button>
      </div>
    </div>
  )
}

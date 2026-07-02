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

export default function LiveCoding() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [code, setCode] = useState('')
  const [status, setStatus] = useState(STATUS.IDLE)
  const [result, setResult] = useState(null)
  const outputRef = useRef(null)

  const problem = problems[currentIndex]
  const total = problems.length

  useEffect(() => {
    setCode(problem.starterCode)
    setStatus(STATUS.IDLE)
    setResult(null)
  }, [currentIndex])

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
        if (res.pass) {
          setStatus(STATUS.PASS)
        } else if (res.error) {
          setStatus(STATUS.ERROR)
        } else {
          setStatus(STATUS.FAIL)
        }
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

  function prevProblem() {
    if (currentIndex > 0) setCurrentIndex(i => i - 1)
  }
  function nextProblem() {
    if (currentIndex < total - 1) setCurrentIndex(i => i + 1)
  }

  if (!problem) {
    return <div className="error-msg">Soal tidak ditemukan</div>
  }

  return (
    <div className="live-coding">
      <div className="lc-header">
        <div className="lc-header-left">
          <div className="lc-progress">
            Soal {currentIndex + 1} / {total}
          </div>
          <div className="lc-badge" data-difficulty={problem.difficulty}>
            {problem.difficulty}
          </div>
        </div>
        <div className="lc-header-right">
          <div className="lc-timer-display">
            <span className="lc-dot" />
            <span>{status === STATUS.RUNNING ? 'Memeriksa...' : status === STATUS.PASS ? 'Selesai' : 'Siap'}</span>
          </div>
        </div>
      </div>

      <div className="lc-body">
        {/* Soal */}
        <div className="lc-panel lc-panel-left">
          <div className="lc-soal-header">
            <div className="lc-soal-icon">{problem.icon}</div>
            <div>
              <h2>{problem.title}</h2>
            </div>
          </div>
          <div className="lc-soal-desc">
            <p>{problem.desc}</p>
          </div>
          <div className="lc-info-box">
            <strong>💡 Petunjuk:</strong> {problem.info}
          </div>
        </div>

        {/* Editor + Output */}
        <div className="lc-panel lc-panel-right">
          <div className="lc-editor-header">
            <span className="lc-editor-lang">JavaScript</span>
            <button className="lc-btn-reset" onClick={handleReset}>
              ↺ Reset
            </button>
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
                  <div className="spinner" />
                  Mengecek jawaban...
                </div>
              )}

              {status === STATUS.PASS && result && (
                <div className="lc-output-pass">
                  <div className="lc-output-icon">
                    <CheckIcon size={24} />
                  </div>
                  <div className="lc-output-title">Jawaban tepat! 🎉</div>
                  <div className="lc-output-detail">
                    Semua test case berhasil dilewati.
                  </div>
                  {result.logs && (
                    <div className="lc-output-logs">
                      <div className="lc-logs-label">Output:</div>
                      <pre className="lc-logs-pre">{result.logs.slice(0, 10).join('\n')}{result.logs.length > 10 ? '\n...' : ''}</pre>
                    </div>
                  )}
                  {result.results && (
                    <div className="lc-test-results">
                      {result.results.map((r, i) => (
                        <div key={i} className={`lc-test-item ${r.pass ? 'pass' : 'fail'}`}>
                          <span>{r.pass ? '✓' : '✗'}</span>
                          <span>{r.desc}</span>
                          {!r.pass && <span className="lc-test-expected">→ expected {JSON.stringify(r.expected)}, got {JSON.stringify(r.actual)}</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {status === STATUS.FAIL && result && (
                <div className="lc-output-fail">
                  <div className="lc-output-title">❌ Kurang tepat, coba lagi</div>
                  {result.failDetail && <div className="lc-output-detail">{result.failDetail}</div>}
                  {result.results && (
                    <div className="lc-test-results">
                      {result.results.map((r, i) => (
                        <div key={i} className={`lc-test-item ${r.pass ? 'pass' : 'fail'}`}>
                          <span>{r.pass ? '✓' : '✗'}</span>
                          <span>{r.desc}</span>
                          {!r.pass && <span className="lc-test-expected">→ expected {JSON.stringify(r.expected)}, got {JSON.stringify(r.actual)}</span>}
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
        <button
          className="lc-nav-btn"
          onClick={prevProblem}
          disabled={currentIndex === 0}
        >
          <ChevronLeftIcon size={18} />
          Sebelumnya
        </button>
        <span className="lc-nav-dots">
          {problems.map((_, i) => (
            <span
              key={i}
              className={`lc-dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </span>
        <button
          className="lc-nav-btn"
          onClick={nextProblem}
          disabled={currentIndex === total - 1}
        >
          Selanjutnya
          <ChevronRightIcon size={18} />
        </button>
      </div>
    </div>
  )
}

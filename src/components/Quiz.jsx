import { useState } from 'react'
import { StarIcon } from '../components/Icons'

export default function Quiz({ questions, onComplete }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const [results, setResults] = useState([])

  const q = questions[current]

  function handleAnswer() {
    if (selected === null) return
    const correct = selected === q.answer
    if (correct) setCorrectCount(c => c + 1)
    setResults(r => [...r, { question: q.q, selected, correct, correctAnswer: q.answer }])
    setAnswered(true)
  }

  function handleNext() {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      setFinished(true)
      if (onComplete) onComplete(correctCount + (selected === q.answer ? 1 : 0), questions.length)
    }
  }

  function handleRestart() {
    setCurrent(0)
    setSelected(null)
    setAnswered(false)
    setCorrectCount(0)
    setFinished(false)
    setResults([])
  }

  if (finished) {
    const score = Math.round((correctCount / questions.length) * 100)
    return (
      <div className="quiz-result">
        <div className="quiz-result-icon">
          <StarIcon size={28} />
        </div>
        <div className="quiz-result-score">{correctCount} / {questions.length}</div>
        <div className="quiz-result-label">{score >= 80 ? 'Luar biasa! 🎉' : score >= 60 ? 'Cukup baik, pelajari lagi' : 'Ayo coba lagi!'}</div>
        <div className="quiz-result-detail">
          {results.map((r, i) => (
            <div key={i} className={`quiz-result-item ${r.correct ? 'correct' : 'wrong'}`}>
              <span>{r.correct ? '✓' : '✗'}</span>
              <span>{r.question}</span>
            </div>
          ))}
        </div>
        <button className="quiz-btn" onClick={handleRestart}>Ulang Quiz</button>
      </div>
    )
  }

  return (
    <div className="quiz">
      <div className="quiz-header">
        <div className="quiz-progress">{current + 1} / {questions.length}</div>
        <div className="quiz-dots">
          {questions.map((_, i) => (
            <span key={i} className={`quiz-dot ${i < current ? 'done' : ''} ${i === current ? 'active' : ''}`} />
          ))}
        </div>
      </div>

      <div className="quiz-question">{q.q}</div>

      <div className="quiz-options">
        {q.options.map((opt, i) => {
          let cls = 'quiz-option'
          if (answered) {
            if (i === q.answer) cls += ' correct'
            else if (i === selected) cls += ' wrong'
            else cls += ' dim'
          } else if (i === selected) {
            cls += ' selected'
          }
          return (
            <button key={i} className={cls} onClick={() => !answered && setSelected(i)} disabled={answered}>
              {opt}
            </button>
          )
        })}
      </div>

      <div className="quiz-actions">
        {!answered ? (
          <button className="quiz-btn" onClick={handleAnswer} disabled={selected === null}>
            Jawab
          </button>
        ) : (
          <button className="quiz-btn" onClick={handleNext}>
            {current < questions.length - 1 ? 'Selanjutnya' : 'Lihat Hasil'}
          </button>
        )}
      </div>
    </div>
  )
}

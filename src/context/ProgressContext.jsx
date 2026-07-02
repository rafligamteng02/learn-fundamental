import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ProgressContext = createContext()

export function ProgressProvider({ children }) {
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem('fundamental-progress')
    return saved ? JSON.parse(saved) : []
  })

  const [quizScores, setQuizScores] = useState(() => {
    const saved = localStorage.getItem('fundamental-quiz-scores')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem('fundamental-progress', JSON.stringify(completed))
  }, [completed])

  useEffect(() => {
    localStorage.setItem('fundamental-quiz-scores', JSON.stringify(quizScores))
  }, [quizScores])

  const toggleModule = (id) => {
    setCompleted(prev =>
      prev.includes(id)
        ? prev.filter(m => m !== id)
        : [...prev, id]
    )
  }

  const isCompleted = (id) => completed.includes(id)

  const saveQuizScore = useCallback((moduleId, correct, total) => {
    setQuizScores(prev => ({ ...prev, [moduleId]: { correct, total, date: new Date().toISOString() } }))
  }, [])

  const getQuizScore = useCallback((moduleId) => {
    return quizScores[moduleId] || null
  }, [quizScores])

  return (
    <ProgressContext.Provider value={{ completed, toggleModule, isCompleted, quizScores, saveQuizScore, getQuizScore }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) throw new Error('useProgress must be used within ProgressProvider')
  return context
}

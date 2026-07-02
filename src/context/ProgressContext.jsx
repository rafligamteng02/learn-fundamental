import { createContext, useContext, useState, useEffect } from 'react'

const ProgressContext = createContext()

export function ProgressProvider({ children }) {
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem('fundamental-progress')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('fundamental-progress', JSON.stringify(completed))
  }, [completed])

  const toggleModule = (id) => {
    setCompleted(prev =>
      prev.includes(id)
        ? prev.filter(m => m !== id)
        : [...prev, id]
    )
  }

  const isCompleted = (id) => completed.includes(id)

  return (
    <ProgressContext.Provider value={{ completed, toggleModule, isCompleted }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) throw new Error('useProgress must be used within ProgressProvider')
  return context
}

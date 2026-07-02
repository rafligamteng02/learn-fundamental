import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import ModulePage from './pages/ModulePage'
import Cheatsheet from './pages/Cheatsheet'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('fundamental-dark') === 'true'
  })

  const toggleDark = () => {
    setDarkMode(prev => {
      localStorage.setItem('fundamental-dark', !prev)
      return !prev
    })
  }

  return (
    <ProgressProvider>
      <div className={`app ${darkMode ? 'dark' : ''}`}>
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          darkMode={darkMode}
          onToggleDark={toggleDark}
        />
        <div className={`main-area ${sidebarOpen ? '' : 'expanded'}`}>
          <header className="topbar">
            <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? '✕' : '☰'}
            </button>
            <span className="topbar-title">Fundamental</span>
          </header>
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/module/:id" element={<ModulePage />} />
              <Route path="/cheatsheet" element={<Cheatsheet />} />
            </Routes>
          </main>
        </div>
      </div>
    </ProgressProvider>
  )
}

export default App

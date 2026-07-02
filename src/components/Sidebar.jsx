import { NavLink, useNavigate } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { modules } from '../modules'

export default function Sidebar({ isOpen, onToggle, darkMode, onToggleDark }) {
  const { isCompleted } = useProgress()
  const navigate = useNavigate()

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          Funda<span>mental</span>
        </div>
        <button
          onClick={onToggle}
          style={{
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            fontSize: '1.25rem',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px'
          }}
        >
          ✕
        </button>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="nav-icon">🏠</span>
          <span className="nav-title">Beranda</span>
        </NavLink>

        <div style={{
          fontSize: '0.7rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--text-sidebar)',
          opacity: 0.5,
          padding: '0.75rem 0.75rem 0.25rem'
        }}>
          Modul Belajar
        </div>

        {modules.map(m => (
          <NavLink
            key={m.id}
            to={`/module/${m.id}`}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{m.icon}</span>
            <span className="nav-title">{m.id}. {m.title}</span>
            {isCompleted(m.id) && <span className="nav-check">✓</span>}
          </NavLink>
        ))}

        <div style={{
          fontSize: '0.7rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--text-sidebar)',
          opacity: 0.5,
          padding: '0.75rem 0.75rem 0.25rem'
        }}>
          Lainnya
        </div>

        <NavLink to="/cheatsheet" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <span className="nav-icon">📝</span>
          <span className="nav-title">Cheatsheet</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item" onClick={onToggleDark}>
          <span className="nav-icon">{darkMode ? '☀️' : '🌙'}</span>
          <span className="nav-title">{darkMode ? 'Terang' : 'Gelap'}</span>
        </button>
      </div>
    </aside>
  )
}

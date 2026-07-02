import { NavLink } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { modules } from '../modules'
import {
  HomeIcon, SunIcon, MoonIcon, CheckIcon, CloseIcon,
  GlobeIcon, CodeIcon, AtomIcon, ServerIcon,
  DatabaseIcon, CpuIcon, LinkIcon, FileTextIcon, BookOpenIcon
} from './Icons'

const iconMap = {
  globe: GlobeIcon,
  code: CodeIcon,
  atom: AtomIcon,
  server: ServerIcon,
  database: DatabaseIcon,
  cpu: CpuIcon,
  link: LinkIcon,
  file: FileTextIcon,
}

export default function Sidebar({ isOpen, onToggle, darkMode, onToggleDark }) {
  const { isCompleted } = useProgress()

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          Fund<span>amental</span>
        </div>
        <button className="sidebar-close" onClick={onToggle}>
          <CloseIcon size={18} />
        </button>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <HomeIcon size={20} />
          <span className="nav-title">Beranda</span>
        </NavLink>

        <div className="sidebar-label">Modul Belajar</div>

        {modules.map(m => {
          const IconComp = iconMap[m.icon]
          return (
            <NavLink
              key={m.id}
              to={`/module/${m.id}`}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              {IconComp && <IconComp size={20} />}
              <span className="nav-title">{m.id}. {m.title}</span>
              {isCompleted(m.id) && <CheckIcon size={14} />}
            </NavLink>
          )
        })}

        <div className="sidebar-label">Lainnya</div>

        <NavLink to="/cheatsheet" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <BookOpenIcon size={20} />
          <span className="nav-title">Cheatsheet</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item" onClick={onToggleDark}>
          {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          <span className="nav-title">{darkMode ? 'Mode Terang' : 'Mode Gelap'}</span>
        </button>
      </div>
    </aside>
  )
}

import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { modules } from '../modules'
import {
  BookOpenIcon, StarIcon, CheckIcon, CircleIcon,
  GlobeIcon, CodeIcon, AtomIcon, ServerIcon,
  DatabaseIcon, CpuIcon, LinkIcon, FileTextIcon,
  TerminalIcon
} from '../components/Icons'

const iconMap = {
  globe: GlobeIcon,
  code: CodeIcon,
  atom: AtomIcon,
  server: ServerIcon,
  database: DatabaseIcon,
  cpu: CpuIcon,
  link: LinkIcon,
  file: FileTextIcon,
  terminal: TerminalIcon,
}

export default function Home() {
  const { completed } = useProgress()

  const totalModules = modules.length
  const completedCount = completed.length
  const progress = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0

  return (
    <div className="home">
      <div className="home-hero">
        <div className="hero-icon">
          <BookOpenIcon size={32} />
        </div>
        <h1>
          Fullstack <span>Interview</span> Prep
        </h1>
        <p>
          Kuasai 8 modul fundamental React + Laravel untuk hadapi interview dengan percaya diri.
        </p>
      </div>

      <div className="home-stats">
        <div className="stat-item">
          <div className="stat-number">{totalModules}</div>
          <div className="stat-label">Total Modul</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{completedCount}</div>
          <div className="stat-label">Selesai</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{progress}%</div>
          <div className="stat-label">Progress</div>
        </div>
      </div>

      {progress > 0 && (
        <div className="progress-bar-wrapper">
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      <h2 className="section-title">
        <BookOpenIcon size={20} />
        Modul Belajar
      </h2>

      <div className="module-grid">
        {modules.map(m => {
          const IconComp = iconMap[m.icon]
          const done = completed.includes(m.id)
          return (
            <Link
              key={m.id}
              to={m.route || `/module/${m.id}`}
              className={`module-card ${done ? 'completed' : ''}`}
            >
              <div className="module-card-icon">
                {IconComp && <IconComp size={22} />}
              </div>
              <div className="module-card-body">
                <div className="module-card-title">{m.id}. {m.title}</div>
                <div className="module-card-desc">{m.desc}</div>
                <div className="module-card-status">
                  {done ? (
                    <>
                      <CheckIcon size={14} />
                      <span>Selesai</span>
                    </>
                  ) : (
                    <>
                      <CircleIcon size={14} />
                      <span>Belum dipelajari</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="guide-card">
        <div className="guide-card-header">
          <StarIcon size={20} />
          <h3>Cara Belajar</h3>
        </div>
        <ol className="guide-list">
          <li>Baca modul secara urut dari <strong>01</strong> sampai <strong>08</strong></li>
          <li>Setelah baca, jawab pertanyaan interview di akhir modul dengan suara keras</li>
          <li>Centang <strong>"Tandai Selesai"</strong> kalau sudah paham</li>
          <li>H-1 interview, buka halaman <Link to="/cheatsheet">Cheatsheet</Link> untuk hafalan cepat</li>
        </ol>
      </div>
    </div>
  )
}

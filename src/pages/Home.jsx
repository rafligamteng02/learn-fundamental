import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { modules } from '../modules'

export default function Home() {
  const { completed, toggleModule } = useProgress()

  const totalModules = modules.length
  const completedCount = completed.length
  const progress = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0

  return (
    <div className="home">
      <div className="home-hero">
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
        <div style={{
          height: '8px',
          background: 'var(--border)',
          borderRadius: '4px',
          marginBottom: '2rem',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'var(--primary)',
            borderRadius: '4px',
            transition: 'width 0.5s ease'
          }} />
        </div>
      )}

      <h2 style={{
        fontSize: '1.25rem',
        fontWeight: 700,
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        📚 Modul Belajar
      </h2>

      <div className="module-grid">
        {modules.map(m => {
          const done = completed.includes(m.id)
          return (
            <Link
              key={m.id}
              to={`/module/${m.id}`}
              className={`module-card ${done ? 'completed' : ''}`}
            >
              <div className="module-card-icon">{m.icon}</div>
              <div className="module-card-body">
                <div className="module-card-title">{m.id}. {m.title}</div>
                <div className="module-card-desc">{m.desc}</div>
                <div className="module-card-status">
                  {done ? (
                    <span className="done">✓ Selesai</span>
                  ) : (
                    <span>○ Belum dipelajari</span>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '12px'
      }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          📖 Cara Belajar
        </h3>
        <ol style={{
          paddingLeft: '1.25rem',
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          lineHeight: 2
        }}>
          <li>Baca modul secara urut dari <strong>01</strong> sampai <strong>08</strong></li>
          <li>Setelah baca, jawab pertanyaan interview di akhir modul dengan suara keras</li>
          <li>Centang <strong>"Tandai Selesai"</strong> kalau sudah paham</li>
          <li>H-1 interview, buka halaman <Link to="/cheatsheet">Cheatsheet</Link> untuk hafalan cepat</li>
        </ol>
      </div>
    </div>
  )
}

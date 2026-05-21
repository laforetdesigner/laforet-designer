import AnimatedCounter from '../ui/AnimatedCounter'
import { useSiteSettings } from '../../hooks/useWordPress'
import { SkeletonStats } from '../ui/Skeleton'

export default function Stats() {
  const { data: settings, isLoading } = useSiteSettings()

  const stats   = settings?.stats   ?? []
  const clients = settings?.clients ?? []
  const doubled = [...clients, ...clients]

  if (isLoading && !settings) return <SkeletonStats />

  return (
    <section style={{ background: '#0A0A0A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Chiffres clés */}
      <div className="container" style={{ padding: '4rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }} className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} style={{
              padding: '2rem 2.5rem',
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <div style={{
                fontFamily: 'Archivo, sans-serif', fontWeight: 900,
                fontSize: 'clamp(44px, 5vw, 72px)',
                lineHeight: 1, letterSpacing: -3, color: '#fff',
              }}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="t-label" style={{ color: 'rgba(255,255,255,0.35)', marginTop: 10 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Logos clients — défilement droite → gauche */}
      {doubled.length > 0 && (
        <div style={{ padding: '2rem 0', overflow: 'hidden' }}>
          <p className="t-label" style={{ color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginBottom: '1.25rem' }}>
            Ils nous font confiance
          </p>
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            <div className="marquee-track">
              {doubled.map((name, i) => (
                <span key={i} style={{
                  fontFamily: 'Archivo, sans-serif', fontWeight: 800,
                  fontSize: 15, color: 'rgba(255,255,255,0.18)',
                  textTransform: 'uppercase', letterSpacing: '0.12em',
                  padding: '0 3rem', whiteSpace: 'nowrap',
                  borderRight: '1px solid rgba(255,255,255,0.06)',
                }}>{name}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}

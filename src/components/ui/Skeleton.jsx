/**
 * Composants Skeleton — placeholder animé pendant le chargement
 */

const pulse = {
  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
  backgroundSize: '200% 100%',
  animation: 'skeleton-pulse 1.5s ease-in-out infinite',
}

const pulseDark = {
  background: 'linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 75%)',
  backgroundSize: '200% 100%',
  animation: 'skeleton-pulse 1.5s ease-in-out infinite',
}

export function SkeletonBlock({ width = '100%', height = 16, dark = false, style = {} }) {
  return (
    <div style={{ width, height, ...( dark ? pulseDark : pulse ), borderRadius: 3, ...style }} />
  )
}

export function SkeletonHero() {
  return (
    <section style={{ paddingTop: 64, background: '#fff', borderBottom: '1px solid #E8E8E8' }}>
      <div className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div style={{ maxWidth: 900 }}>
          <SkeletonBlock width={220} height={12} style={{ marginBottom: '2rem' }} />
          <SkeletonBlock width={480} height={80} style={{ marginBottom: '1rem' }} />
          <SkeletonBlock width={360} height={80} style={{ marginBottom: '2.5rem' }} />
          <SkeletonBlock width={520} height={16} style={{ marginBottom: '0.75rem' }} />
          <SkeletonBlock width={400} height={16} style={{ marginBottom: '3rem' }} />
          <div style={{ display: 'flex', gap: 12 }}>
            <SkeletonBlock width={180} height={48} />
            <SkeletonBlock width={160} height={48} />
          </div>
        </div>
      </div>
      <SkeletonStyle />
    </section>
  )
}

export function SkeletonStats() {
  return (
    <section style={{ background: '#0A0A0A' }}>
      <div className="container" style={{ padding: '4rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }} className="stats-grid">
          {[0,1,2,3].map(i => (
            <div key={i} style={{ padding: '2rem 2.5rem' }}>
              <SkeletonBlock dark width={100} height={64} style={{ marginBottom: 12 }} />
              <SkeletonBlock dark width={140} height={12} />
            </div>
          ))}
        </div>
      </div>
      <SkeletonStyle />
    </section>
  )
}

export function SkeletonTestimonials() {
  return (
    <section className="section" style={{ background: '#FAFAFA' }}>
      <div className="container">
        <SkeletonBlock width={120} height={12} style={{ marginBottom: '1rem' }} />
        <SkeletonBlock width={280} height={40} style={{ marginBottom: '4rem' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5px', background: '#E8E8E8' }} className="testimonials-grid">
          {[0,1,2].map(i => (
            <div key={i} style={{ background: '#fff', padding: '2.5rem' }}>
              <SkeletonBlock height={40} width={40} style={{ marginBottom: '1rem', borderRadius: '50%' }} />
              <SkeletonBlock height={14} style={{ marginBottom: '0.5rem' }} />
              <SkeletonBlock height={14} width="85%" style={{ marginBottom: '0.5rem' }} />
              <SkeletonBlock height={14} width="70%" style={{ marginBottom: '2rem' }} />
              <div style={{ display: 'flex', gap: 12, paddingTop: '1.5rem', borderTop: '1px solid #E8E8E8' }}>
                <SkeletonBlock width={40} height={40} style={{ borderRadius: '50%', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <SkeletonBlock height={13} width="60%" style={{ marginBottom: 6 }} />
                  <SkeletonBlock height={11} width="80%" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){.testimonials-grid{grid-template-columns:1fr!important}}`}</style>
      <SkeletonStyle />
    </section>
  )
}

function SkeletonStyle() {
  return (
    <style>{`
      @keyframes skeleton-pulse {
        0%   { background-position: 200% 0 }
        100% { background-position: -200% 0 }
      }
      .stats-grid { }
      @media(max-width:640px){ .stats-grid { grid-template-columns: 1fr 1fr !important; } }
    `}</style>
  )
}

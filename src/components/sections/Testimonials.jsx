import Reveal from '../ui/Reveal'
import { TESTIMONIALS } from '../../data/mockData'

export default function Testimonials() {
  return (
    <section className="section" style={{ background: '#FAFAFA', borderBottom: '1px solid #E8E8E8' }}>
      <div className="container">
        <Reveal>
          <p className="t-label" style={{ marginBottom: '1rem' }}>Témoignages</p>
          <h2 className="t-display" style={{ marginBottom: '4rem' }}>Ils parlent de nous</h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5px', background: '#E8E8E8' }} className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.id} delay={i * 120}>
              <div style={{ background: '#fff', padding: '2.5rem', height: '100%' }}>
                {/* Quote mark */}
                <span style={{ fontFamily: 'Georgia, serif', fontSize: 56, color: '#E8E8E8', lineHeight: 1, display: 'block', marginBottom: '0.5rem' }}>"</span>

                <p style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 400, fontSize: 15, lineHeight: 1.7, color: '#333', marginBottom: '2rem' }}>
                  {t.text}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: '1.5rem', borderTop: '1px solid #E8E8E8' }}>
                  <div style={{
                    width: 40, height: 40, background: '#0A0A0A', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 13, color: '#fff',
                  }}>{t.initials}</div>
                  <div>
                    <p style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 14, color: '#0A0A0A' }}>{t.name}</p>
                    <p style={{ fontFamily: 'Archivo, sans-serif', fontSize: 12, color: '#888' }}>{t.role} — {t.company}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

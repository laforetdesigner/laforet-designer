import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '../ui/Reveal'
import { SERVICES } from '../../data/mockData'

export default function ServicesSection() {
  return (
    <section className="section" style={{ background: '#fff', borderBottom: '1px solid #E8E8E8' }}>
      <div className="container">
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p className="t-label" style={{ marginBottom: '1rem' }}>Expertises</p>
              <h2 className="t-display">Nos services</h2>
            </div>
            <Link to="/services" style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 700, fontSize: 13, color: '#0A0A0A', textDecoration: 'none', borderBottom: '1px solid #0A0A0A', paddingBottom: 2, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              Tous les services <ArrowRight size={13} />
            </Link>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid #E8E8E8' }} className="services-cols">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 100}>
              <div style={{
                borderRight: i < SERVICES.length - 1 ? '1px solid #E8E8E8' : 'none',
                padding: '2.5rem',
                height: '100%',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                onMouseLeave={e => e.currentTarget.style.background = ''}
              >
                {/* Header */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <p className="t-label" style={{ color: '#1E40AF', marginBottom: 8 }}>Pôle {service.pole}</p>
                  <h3 style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 900, fontSize: 26, color: '#0A0A0A', letterSpacing: -0.8, lineHeight: 1.1, marginBottom: 10 }}>
                    {service.title}
                  </h3>
                  <p style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 600, fontSize: 13, color: '#888', fontStyle: 'italic' }}>
                    But — {service.tagline}
                  </p>
                </div>

                <hr className="rule" style={{ marginBottom: '1.5rem' }} />

                {/* Prestations */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                  {service.prestations.map((p, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 4, height: 4, background: '#0A0A0A', borderRadius: '50%', flexShrink: 0 }} />
                      <span style={{ fontFamily: 'Archivo,sans-serif', fontSize: 13, color: '#333', lineHeight: 1.4 }}>{p}</span>
                    </li>
                  ))}
                </ul>

                <Link to={`/services/${service.slug}`} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontFamily: 'Archivo,sans-serif', fontWeight: 700, fontSize: 13,
                  color: '#0A0A0A', textDecoration: 'none',
                  borderBottom: '1px solid #0A0A0A', paddingBottom: 2, transition: 'color 0.15s, border-color 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#1E40AF'; e.currentTarget.style.borderColor = '#1E40AF' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#0A0A0A'; e.currentTarget.style.borderColor = '#0A0A0A' }}
                >
                  Offres & tarifs <ArrowRight size={12} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .services-cols { grid-template-columns: 1fr !important; }
          .services-cols > div > div { border-right: none !important; border-bottom: 1px solid #E8E8E8; }
        }
      `}</style>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '../ui/Reveal'
import { SERVICES } from '../../data/mockData'

export default function ServicesPreview() {
  return (
    <section style={{ background: '#fff', padding: '8rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 3, color: '#1E40AF', display: 'block', marginBottom: 12 }}>Ce que nous faisons</span>
              <h2 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 900, fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1, letterSpacing: -2, color: '#0A0A0A' }}>
                Nos expertises
              </h2>
            </div>
            <Link to="/services" style={{
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 14, color: '#0A0A0A',
              borderBottom: '1px solid #0A0A0A', paddingBottom: 2,
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = '#1E40AF'; e.currentTarget.style.borderColor = '#1E40AF' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#0A0A0A'; e.currentTarget.style.borderColor = '#0A0A0A' }}
            >
              Tous les services <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5px', background: 'rgba(10,10,10,0.06)', border: '1px solid rgba(10,10,10,0.06)' }}>
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 150}>
              <Link to={`/services/${service.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div
                  style={{
                    background: '#fff', padding: '3rem', height: '100%',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    cursor: 'pointer', position: 'relative', overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#0A0A0A'
                    e.currentTarget.querySelectorAll('[data-text]').forEach(el => el.style.color = '#fff')
                    e.currentTarget.querySelectorAll('[data-text-muted]').forEach(el => el.style.color = 'rgba(255,255,255,0.5)')
                    e.currentTarget.querySelector('[data-icon]').style.color = '#3B82F6'
                    e.currentTarget.querySelector('[data-arrow]').style.opacity = '1'
                    e.currentTarget.querySelector('[data-arrow]').style.transform = 'translateX(0)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#fff'
                    e.currentTarget.querySelectorAll('[data-text]').forEach(el => el.style.color = '#0A0A0A')
                    e.currentTarget.querySelectorAll('[data-text-muted]').forEach(el => el.style.color = 'rgba(10,10,10,0.4)')
                    e.currentTarget.querySelector('[data-icon]').style.color = '#1E40AF'
                    e.currentTarget.querySelector('[data-arrow]').style.opacity = '0'
                    e.currentTarget.querySelector('[data-arrow]').style.transform = 'translateX(-10px)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                    <span data-icon style={{ fontSize: 36, color: '#1E40AF', transition: 'color 0.3s', lineHeight: 1 }}>{service.icon}</span>
                    <span style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 11, color: 'rgba(10,10,10,0.2)', letterSpacing: 2, textTransform: 'uppercase' }}>0{i + 1}</span>
                  </div>

                  <h3 data-text style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 22, color: '#0A0A0A', letterSpacing: -0.5, marginBottom: '0.75rem', transition: 'color 0.3s' }}>{service.title}</h3>
                  <p data-text-muted style={{ fontFamily: 'Archivo, sans-serif', fontSize: 14, lineHeight: 1.6, color: 'rgba(10,10,10,0.5)', marginBottom: '2rem', transition: 'color 0.3s' }}>{service.description}</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '2rem' }}>
                    {service.features.map(f => (
                      <span key={f} data-text-muted style={{
                        fontFamily: 'Archivo, sans-serif', fontSize: 12, fontWeight: 500,
                        background: 'rgba(10,10,10,0.04)', padding: '4px 12px', borderRadius: 100,
                        color: 'rgba(10,10,10,0.5)', transition: 'color 0.3s',
                      }}>{f}</span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span data-text style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 13, color: '#0A0A0A', transition: 'color 0.3s' }}>Découvrir</span>
                    <span data-arrow style={{ opacity: 0, transform: 'translateX(-10px)', transition: 'all 0.3s', color: '#3B82F6' }}>→</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

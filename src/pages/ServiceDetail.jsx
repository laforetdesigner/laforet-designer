import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import CTABanner from '../components/sections/CTABanner'
import { SERVICES, PORTFOLIO_ITEMS } from '../data/mockData'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = SERVICES.find(s => s.slug === slug)

  if (!service) return <Navigate to="/services" replace />

  const related = PORTFOLIO_ITEMS.filter(p => p.category.toLowerCase().includes(service.slug) || service.projects?.includes(p.id?.toString()))
    .slice(0, 3)

  return (
    <>
      <div style={{ paddingTop: 72, background: '#0A0A0A' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2rem 5rem', width: '100%' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ marginBottom: '2rem' }}>
            <Link to="/services" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'Archivo, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
            >
              <ArrowLeft size={16} /> Services
            </Link>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'flex-start' }} className="detail-header">
            <div>
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 48, display: 'block', marginBottom: '1rem' }}>{service.icon}</motion.span>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 900, fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 0.95, letterSpacing: -2.5, color: '#fff', marginBottom: '1rem' }}>
                {service.title}
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                style={{ fontFamily: 'Archivo, sans-serif', fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 540, lineHeight: 1.6 }}>
                {service.tagline} {service.description}
              </motion.p>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
              style={{ background: 'rgba(30,64,175,0.15)', border: '1px solid rgba(30,64,175,0.3)', borderRadius: 12, padding: '1.5rem 2rem', textAlign: 'center', minWidth: 140 }}>
              <p style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 900, fontSize: 40, color: '#fff', letterSpacing: -1 }}>{service.projects?.length || '5'}+</p>
              <p style={{ fontFamily: 'Archivo, sans-serif', fontSize: 12, color: '#93C5FD', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.5 }}>Projets</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div style={{ background: '#F5F5F5', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '6rem' }} className="detail-grid">
            <Reveal>
              <div>
                <h2 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 900, fontSize: 36, color: '#0A0A0A', letterSpacing: -1, marginBottom: '2rem' }}>Ce qui est inclus</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {service.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', background: '#fff', padding: '1rem 1.25rem', borderRadius: 10, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
                      <span style={{ width: 28, height: 28, background: '#EFF6FF', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={14} color="#1E40AF" strokeWidth={2.5} />
                      </span>
                      <span style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 15, color: '#0A0A0A' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div>
                <h2 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 900, fontSize: 36, color: '#0A0A0A', letterSpacing: -1, marginBottom: '2rem' }}>Notre processus</h2>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 18, top: 0, bottom: 0, width: 1, background: 'rgba(10,10,10,0.08)' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {service.process.map((step, i) => (
                      <div key={step.step} style={{ display: 'flex', gap: '1.5rem', paddingLeft: 0 }}>
                        <div style={{
                          width: 36, height: 36, background: i === 0 ? '#1E40AF' : '#0A0A0A', borderRadius: 10, flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1,
                          fontFamily: 'Archivo, sans-serif', fontWeight: 900, fontSize: 12, color: '#fff',
                        }}>{step.step}</div>
                        <div style={{ paddingBottom: '1rem' }}>
                          <h4 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 16, color: '#0A0A0A', marginBottom: 6 }}>{step.title}</h4>
                          <p style={{ fontFamily: 'Archivo, sans-serif', fontSize: 14, color: 'rgba(10,10,10,0.5)', lineHeight: 1.6 }}>{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div style={{ background: '#0A0A0A', borderRadius: 16, padding: '3rem', display: 'flex', gap: '2rem', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div>
                <h3 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 900, fontSize: 28, color: '#fff', letterSpacing: -0.5, marginBottom: '0.5rem' }}>Parlons de votre projet</h3>
                <p style={{ fontFamily: 'Archivo, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.4)' }}>Devis gratuit et personnalisé sous 48h.</p>
              </div>
              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#1E40AF', color: '#fff', textDecoration: 'none',
                padding: '14px 28px', borderRadius: 8,
                fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 15,
                whiteSpace: 'nowrap', transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1d4ed8'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1E40AF'; e.currentTarget.style.transform = '' }}
              >
                Démarrer <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6rem', flexWrap: 'wrap', gap: '1rem' }}>
            {SERVICES.filter(s => s.slug !== slug).map(s => (
              <Link key={s.slug} to={`/services/${s.slug}`} style={{
                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10,
                padding: '1rem 1.5rem', background: '#fff', borderRadius: 10,
                boxShadow: '0 1px 6px rgba(0,0,0,0.06)', transition: 'all 0.2s',
                fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 14, color: '#0A0A0A',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = '' }}
              >
                <span style={{ fontSize: 20 }}>{s.icon}</span> {s.title} <ArrowRight size={14} color="#1E40AF" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .detail-header { grid-template-columns: 1fr !important; }
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}

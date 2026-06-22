import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import Reveal from '../components/ui/Reveal'
import CTABanner from '../components/sections/CTABanner'
import { RESSOURCE_TYPES, COACHING } from '../data/mockData'
import { useRessources } from '../hooks/useWordPress'

const TYPE_COLORS = {
  'Étude de cas': '#0A0A0A',
  'Article':      '#1E40AF',
  'Actualité':    '#059669',
  'Tuto':         '#D97706',
  'Formation':    '#7C3AED',
}

export default function Ressources() {
  const [active, setActive] = useState('Tous')
  const { data: ressources = [], isLoading } = useRessources()

  const filtered = active === 'Tous' ? ressources : ressources.filter(r => r.type === active)

  return (
    <>
      <Helmet>
        <title>Ressources Design & Branding — Articles, Guides, Formations | Laforet Designer</title>
        <meta name="description" content="Articles, études de cas, tutoriels et formations sur le branding, la communication 360 et le design digital. Inspirez-vous des meilleurs projets de l'agence." />
        <meta name="keywords" content="ressources design, articles branding, études de cas, formation figma, tutoriels design, tendances branding" />
        <meta property="og:title" content="Ressources Design & Branding | Laforet Designer" />
        <meta property="og:description" content="Articles, études de cas et formations pour les marques créatives." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://laforetdesigner.com/ressources" />
      </Helmet>
      <div style={{ paddingTop: 64, background: '#0A0A0A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ padding: '4rem 2rem 5rem' }}>
          <motion.p className="t-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>Ressources</motion.p>
          <motion.h1 className="t-hero" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, ease: [0.16,1,0.3,1] }} style={{ color: '#fff', marginBottom: '1.5rem' }}>
            Ressources &<br />Actualités
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            style={{ fontFamily: 'Archivo,sans-serif', fontSize: 17, color: 'rgba(255,255,255,0.4)', maxWidth: 500, lineHeight: 1.6 }}>
            Études de cas, articles, tutoriels, formations et actualités du design.
          </motion.p>
        </div>
      </div>

      {/* ── Articles & ressources ── */}
      <section className="section" style={{ background: '#fff', borderBottom: '1px solid #E8E8E8' }}>
        <div className="container">
          {/* Filtres */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '3rem' }}>
            {RESSOURCE_TYPES.map(t => (
              <button key={t} onClick={() => setActive(t)} style={{
                fontFamily: 'Archivo,sans-serif', fontWeight: 700, fontSize: 12,
                padding: '7px 16px', cursor: 'pointer', transition: 'all 0.15s',
                background: active === t ? '#0A0A0A' : '#fff',
                color: active === t ? '#fff' : '#555',
                border: `1px solid ${active === t ? '#0A0A0A' : '#E8E8E8'}`,
                letterSpacing: '0.04em',
              }}>{t}</button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5px', background: '#E8E8E8' }} className="resources-grid">
            {filtered.map((r, i) => (
              <Reveal key={r.id} delay={i * 80}>
                <a href={r.link} target="_blank" rel="noreferrer" style={{ display: 'block', textDecoration: 'none', background: '#fff', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >
                  <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                    <img src={r.image} alt={r.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(20%)', transition: 'transform 0.5s, filter 0.5s' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.filter = 'grayscale(0%)' }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'grayscale(20%)' }}
                    />
                  </div>
                  <div style={{ padding: '1.5rem', borderTop: '1px solid #E8E8E8' }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      <span style={{
                        fontFamily: 'Archivo,sans-serif', fontWeight: 700, fontSize: 11,
                        color: '#fff', background: TYPE_COLORS[r.type] || '#0A0A0A',
                        padding: '3px 8px', letterSpacing: '0.06em',
                      }}>{r.type}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Archivo,sans-serif', fontSize: 11, color: '#AAA' }}>
                        <Clock size={10} /> {r.readTime}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 800, fontSize: 16, color: '#0A0A0A', letterSpacing: -0.3, lineHeight: 1.35, marginBottom: '0.6rem' }}>{r.title}</h3>
                    <p style={{ fontFamily: 'Archivo,sans-serif', fontSize: 13, color: '#666', lineHeight: 1.6, marginBottom: '1rem' }}>{r.excerpt}</p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'Archivo,sans-serif', fontWeight: 700, fontSize: 12, color: '#0A0A0A', borderBottom: '1px solid #0A0A0A', paddingBottom: 1 }}>
                      Lire <ArrowRight size={11} />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coaching / Formation ── */}
      <section className="section" style={{ background: '#FAFAFA', borderBottom: '1px solid #E8E8E8' }}>
        <div className="container">
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <p className="t-label" style={{ marginBottom: '1rem' }}>Accompagnement</p>
                <h2 className="t-display">Coaching &<br />Formation</h2>
              </div>
              <p className="t-body" style={{ maxWidth: 360 }}>Des programmes intensifs et des accompagnements personnalisés pour monter en compétences.</p>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5px', background: '#E8E8E8' }} className="coaching-grid">
            {COACHING.map((c, i) => (
              <Reveal key={i} delay={i * 100}>
                <div style={{ background: i === 1 ? '#0A0A0A' : '#fff', padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ flex: 1 }}>
                    <p className="t-label" style={{ color: i === 1 ? 'rgba(255,255,255,0.3)' : '#888', marginBottom: '1rem' }}>{c.duration}</p>
                    <h3 style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 900, fontSize: 22, color: i === 1 ? '#fff' : '#0A0A0A', letterSpacing: -0.4, marginBottom: '1rem', lineHeight: 1.2 }}>{c.title}</h3>
                    <p style={{ fontFamily: 'Archivo,sans-serif', fontSize: 14, color: i === 1 ? 'rgba(255,255,255,0.45)' : '#666', lineHeight: 1.6, marginBottom: '1.5rem' }}>{c.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {c.tags.map(tag => (
                        <span key={tag} style={{
                          fontFamily: 'Archivo,sans-serif', fontSize: 11, fontWeight: 600,
                          padding: '3px 10px',
                          background: i === 1 ? 'rgba(255,255,255,0.08)' : '#F5F5F5',
                          color: i === 1 ? 'rgba(255,255,255,0.5)' : '#555',
                          letterSpacing: '0.03em',
                        }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', marginTop: '1.5rem', borderTop: `1px solid ${i === 1 ? 'rgba(255,255,255,0.1)' : '#E8E8E8'}` }}>
                    <span style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 900, fontSize: 22, color: i === 1 ? '#fff' : '#0A0A0A', letterSpacing: -0.5 }}>{c.price}</span>
                    <a href="/contact" style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontFamily: 'Archivo,sans-serif', fontWeight: 700, fontSize: 12,
                      color: i === 1 ? '#fff' : '#0A0A0A', textDecoration: 'none',
                      border: `1px solid ${i === 1 ? 'rgba(255,255,255,0.3)' : '#0A0A0A'}`,
                      padding: '8px 14px', transition: 'all 0.15s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#1E40AF'; e.currentTarget.style.borderColor = '#1E40AF'; e.currentTarget.style.color = '#fff' }}
                      onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.borderColor = i === 1 ? 'rgba(255,255,255,0.3)' : '#0A0A0A'; e.currentTarget.style.color = i === 1 ? '#fff' : '#0A0A0A' }}
                    >
                      {c.cta} <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />

      <style>{`
        @media (max-width: 900px) {
          .resources-grid { grid-template-columns: 1fr 1fr !important; }
          .coaching-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .resources-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}

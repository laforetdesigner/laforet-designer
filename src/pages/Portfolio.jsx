import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import ProjectModal from '../components/ui/ProjectModal'
import Reveal from '../components/ui/Reveal'
import CTABanner from '../components/sections/CTABanner'
import { usePortfolio } from '../hooks/useWordPress'

const CATS = ['Tous', 'Branding', 'COM 360', 'Solutions Digitales']

export default function Portfolio() {
  const [active, setActive]   = useState('Tous')
  const [selected, setSelected] = useState(null)
  const [search, setSearch]   = useState('')
  const { data: items = [], isLoading } = usePortfolio()

  const filtered = items.filter(p => {
    const matchCat    = active === 'Tous' || p.category === active
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || (p.client || '').toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <>
      <div style={{ paddingTop: 64, background: '#0A0A0A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ padding: '4rem 2rem 5rem' }}>
          <motion.p className="t-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>Réalisations</motion.p>
          <motion.h1 className="t-hero" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, ease: [0.16,1,0.3,1] }} style={{ color: '#fff', marginBottom: '1.5rem' }}>
            Portfolio
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            style={{ fontFamily: 'Archivo,sans-serif', fontSize: 17, color: 'rgba(255,255,255,0.4)' }}>
            {isLoading ? 'Chargement…' : `${items.length} projets réalisés.`}
          </motion.p>
        </div>
      </div>

      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {CATS.map(cat => (
                <button key={cat} onClick={() => setActive(cat)} style={{
                  fontFamily: 'Archivo,sans-serif', fontWeight: 700, fontSize: 12, padding: '7px 16px',
                  border: `1px solid ${active === cat ? '#0A0A0A' : '#E8E8E8'}`,
                  background: active === cat ? '#0A0A0A' : '#fff',
                  color: active === cat ? '#fff' : '#555',
                  cursor: 'pointer', transition: 'all 0.15s', letterSpacing: '0.04em',
                }}>
                  {cat}{cat !== 'Tous' && <span style={{ opacity: 0.45, marginLeft: 5 }}>({PORTFOLIO_ITEMS.filter(p => p.category === cat).length})</span>}
                </button>
              ))}
            </div>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#AAA' }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..."
                style={{ fontFamily: 'Archivo,sans-serif', fontSize: 13, color: '#0A0A0A', background: '#fff', border: '1px solid #E8E8E8', padding: '8px 12px 8px 34px', outline: 'none', width: 200, transition: 'border-color 0.15s' }}
                onFocus={e => e.currentTarget.style.borderColor = '#0A0A0A'}
                onBlur={e => e.currentTarget.style.borderColor = '#E8E8E8'}
              />
            </div>
          </div>

          <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5px', background: '#E8E8E8' }} className="portfolio-full-grid">
            <AnimatePresence>
              {filtered.map(item => (
                <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                  onClick={() => setSelected(item)} style={{ background: '#fff', cursor: 'pointer' }}>
                  <div style={{ overflow: 'hidden', aspectRatio: '4/3' }}>
                    <img src={item.thumb} alt={item.title} loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(15%)', transition: 'transform 0.5s, filter 0.4s' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.filter = 'grayscale(0%)' }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'grayscale(15%)' }}
                    />
                  </div>
                  <div style={{ padding: '1rem 1.25rem 1.25rem', borderTop: '1px solid #E8E8E8' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                      <span style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 800, fontSize: 16, color: '#0A0A0A', letterSpacing: -0.3 }}>{item.title}</span>
                      <span className="t-label" style={{ color: '#CCC', fontSize: 10 }}>{item.year}</span>
                    </div>
                    <p style={{ fontFamily: 'Archivo,sans-serif', fontSize: 12, color: '#888' }}>{item.category} — {item.client}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div style={{ padding: '6rem 0', textAlign: 'center' }}>
              <p style={{ fontFamily: 'Archivo,sans-serif', fontSize: 14, color: '#AAA' }}>Aucun projet trouvé.</p>
            </div>
          )}
        </div>
      </section>

      <CTABanner />
      <ProjectModal project={selected} onClose={() => setSelected(null)} />

      <style>{`
        @media (max-width: 820px) { .portfolio-full-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .portfolio-full-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  )
}

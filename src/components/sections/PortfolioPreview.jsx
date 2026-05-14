import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '../ui/Reveal'
import { usePortfolio } from '../../hooks/useWordPress'

export default function PortfolioPreview() {
  const { data = [] } = usePortfolio()
  const items = data.slice(0, 4)
  return (
    <section className="section" style={{ background: '#fff', borderBottom: '1px solid #E8E8E8' }}>
      <div className="container">
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p className="t-label" style={{ marginBottom: '1rem' }}>Réalisations</p>
              <h2 className="t-display">Portfolio</h2>
            </div>
            <Link to="/portfolio" style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 700, fontSize: 13, color: '#0A0A0A', textDecoration: 'none', borderBottom: '1px solid #0A0A0A', paddingBottom: 2, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              Tout voir ({data.length}) <ArrowRight size={13} />
            </Link>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5px', background: '#E8E8E8' }} className="portfolio-grid">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 80}>
              <Link to="/portfolio" style={{ textDecoration: 'none', display: 'block', background: '#fff' }}>
                <div style={{ overflow: 'hidden', aspectRatio: '4/3', position: 'relative' }}>
                  <img src={item.thumb} alt={item.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)', filter: 'grayscale(15%)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.filter = 'grayscale(0%)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'grayscale(15%)' }}
                  />
                </div>
                <div style={{ padding: '1.25rem 1.5rem 1.5rem', borderTop: '1px solid #E8E8E8' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 800, fontSize: 17, color: '#0A0A0A', letterSpacing: -0.3 }}>{item.title}</span>
                    <span className="t-label" style={{ color: '#AAA' }}>{item.year}</span>
                  </div>
                  <p style={{ fontFamily: 'Archivo,sans-serif', fontSize: 12, color: '#888', marginTop: 4 }}>{item.category} — {item.client}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) { .portfolio-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

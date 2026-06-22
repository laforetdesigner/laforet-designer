import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '../ui/Reveal'

export default function CTABanner({ dark = true }) {
  const bg = dark ? '#0A0A0A' : '#fff'
  const fg = dark ? '#fff' : '#0A0A0A'
  const border = dark ? 'rgba(255,255,255,0.08)' : '#E8E8E8'

  return (
    <section style={{ background: bg, borderTop: `1px solid ${border}`, padding: '6rem 0' }}>
      <div className="container">
        <Reveal>
          <div style={{ maxWidth: 720 }}>
            <p className="t-label" style={{ color: dark ? 'rgba(255,255,255,0.3)' : '#888', marginBottom: '1.5rem' }}>
              Démarrer un projet
            </p>
            <h2 style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 900, fontSize: 'clamp(36px, 5.5vw, 72px)', lineHeight: 0.95, letterSpacing: -2.5, color: fg, marginBottom: '2rem' }}>
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Vous avez un projet ?</span>
              <span style={{ display: 'block' }}>Parlons-en.</span>
            </h2>
            <p style={{ fontFamily: 'Archivo,sans-serif', fontSize: 17, color: dark ? 'rgba(255,255,255,0.45)' : '#666', marginBottom: '2.5rem', lineHeight: 1.6, whiteSpace: 'nowrap' }}>
              Devis gratuit et personnalisé sous 48h. Premier échange offert.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{
                background: fg, color: bg,
                fontFamily: 'Archivo,sans-serif', fontWeight: 700, fontSize: 14,
                padding: '14px 28px', border: `2px solid ${fg}`,
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1E40AF'; e.currentTarget.style.borderColor = '#1E40AF'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = fg; e.currentTarget.style.borderColor = fg; e.currentTarget.style.color = bg }}
              >
                Demander un devis <ArrowRight size={16} />
              </Link>
              <Link to="/portfolio" style={{
                background: 'transparent', color: dark ? 'rgba(255,255,255,0.5)' : '#888',
                fontFamily: 'Archivo,sans-serif', fontWeight: 600, fontSize: 14,
                padding: '14px 28px', border: `2px solid ${dark ? 'rgba(255,255,255,0.15)' : '#E8E8E8'}`,
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = fg; e.currentTarget.style.color = fg }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = dark ? 'rgba(255,255,255,0.15)' : '#E8E8E8'; e.currentTarget.style.color = dark ? 'rgba(255,255,255,0.5)' : '#888' }}
              >
                Voir le portfolio
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

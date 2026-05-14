import { Link } from 'react-router-dom'
import { SERVICES } from '../../data/mockData'

const IconBehance = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.443 5.35c.639 0 1.23.05 1.77.198.541.099.984.297 1.377.544.394.247.689.594.886 1.039.197.445.296.99.296 1.633 0 .742-.166 1.336-.541 1.83-.345.444-.836.84-1.475 1.138.886.247 1.57.692 2.013 1.336.443.643.689 1.434.689 2.373 0 .742-.148 1.385-.394 1.93a3.863 3.863 0 01-1.08 1.336c-.443.346-.984.594-1.573.742-.59.148-1.23.198-1.918.198H1V5.35h6.443zm-.394 5.49c.541 0 .984-.148 1.328-.395.344-.296.492-.742.492-1.286 0-.297-.049-.544-.148-.742a1.136 1.136 0 00-.394-.494 2.033 2.033 0 00-.59-.247 3.292 3.292 0 00-.738-.099H3.54v3.263h3.509zm.148 5.886c.295 0 .59-.05.836-.099.246-.049.492-.148.689-.296.197-.148.344-.346.443-.594.099-.247.148-.543.148-.89 0-.692-.197-1.186-.59-1.533-.394-.297-.934-.445-1.573-.445H3.54v3.857h3.657zm9.492-2.226c.344.346.886.544 1.574.544.492 0 .885-.148 1.23-.395.344-.247.54-.544.639-.84h2.013c-.344 1.04-.886 1.78-1.573 2.226-.689.445-1.524.643-2.455.643-.689 0-1.328-.099-1.869-.346-.541-.247-1.033-.594-1.426-1.039-.394-.444-.689-.988-.886-1.583-.197-.594-.295-1.237-.295-1.93 0-.692.099-1.335.295-1.929.197-.594.492-1.138.886-1.583.394-.444.885-.79 1.426-1.039.59-.247 1.23-.395 1.918-.395.787 0 1.476.148 2.063.445.59.296 1.033.742 1.377 1.236.344.544.59 1.138.738 1.78.098.643.147 1.286.098 1.93h-5.917c0 .74.246 1.333.59 1.58l-.03.275zM21 12.987c-.295-.297-.787-.495-1.426-.495-.394 0-.738.099-1.033.247-.295.148-.492.346-.64.544-.147.198-.246.445-.295.642-.05.198-.05.396-.05.544h3.9c-.099-.692-.21-1.185-.456-1.482z"/>
  </svg>
)
const IconLinkedin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)
const IconYoutube = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff"/>
  </svg>
)

const SOCIALS = [
  { icon: IconBehance,  href: '#', label: 'Behance' },
  { icon: IconLinkedin, href: '#', label: 'LinkedIn' },
  { icon: IconYoutube,  href: '#', label: 'YouTube' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: '#0A0A0A', color: '#fff', borderTop: '1px solid #E8E8E8' }}>
      <div className="container" style={{ padding: '5rem 2rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', paddingBottom: '4rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
              <span style={{ width: 32, height: 32, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Archivo,sans-serif', fontWeight: 900, fontSize: 12, color: '#0A0A0A' }}>LD</span>
              <span style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 800, fontSize: 15, letterSpacing: -0.3 }}>Laforet Designer</span>
            </div>
            <p style={{ fontFamily: 'Archivo,sans-serif', fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.4)', maxWidth: 260, marginBottom: '2rem' }}>
              Agence de design créatif. Branding, communication 360 et solutions digitales pour les marques ambitieuses.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" title={label} style={{
                  width: 36, height: 36, border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#0A0A0A'; e.currentTarget.style.borderColor = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
                ><Icon /></a>
              ))}
            </div>
          </div>

          {[
            { title: 'Services', links: SERVICES.map(s => ({ label: s.nav, to: `/services/${s.slug}` })) },
            { title: 'Agence', links: [{ label: 'Portfolio', to: '/portfolio' }, { label: 'Ressources', to: '/ressources' }, { label: 'Contact', to: '/contact' }] },
            { title: 'Contact', links: [{ label: 'hello@laforet-designer.fr', to: '/contact' }, { label: '+33 1 23 45 67 89', to: '/contact' }, { label: 'Paris, France', to: '/contact' }] },
          ].map(({ title, links }) => (
            <div key={title}>
              <p className="t-label" style={{ color: 'rgba(255,255,255,0.25)', marginBottom: '1.25rem' }}>{title}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} style={{ fontFamily: 'Archivo,sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                    >{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ padding: '1.5rem 0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontFamily: 'Archivo,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>© {year} Laforet Designer — Tous droits réservés</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Mentions légales', 'CGV', 'Confidentialité'].map(l => (
              <a key={l} href="#" style={{ fontFamily: 'Archivo,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.2)', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .container > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          footer .container > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}

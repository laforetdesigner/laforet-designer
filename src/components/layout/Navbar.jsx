import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SERVICES } from '../../data/mockData'

const NAV = [
  { label: 'Portfolio', to: '/portfolio' },
  {
    label: 'Services', to: '/services',
    children: SERVICES.map(s => ({ label: s.nav, to: `/services/${s.slug}` })),
  },
  { label: 'Ressources', to: '/ressources' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdown, setDropdown]   = useState(null)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => { setMobileOpen(false); setDropdown(null) }, [location])

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: 64,
        background: scrolled ? 'rgba(255,255,255,0.97)' : '#fff',
        borderBottom: '1px solid #E8E8E8',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.3s',
      }}>
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              width: 28, height: 28, background: '#0A0A0A',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Archivo,sans-serif', fontWeight: 900, fontSize: 11, color: '#fff',
              letterSpacing: -0.5, flexShrink: 0,
            }}>LD</span>
            <span style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 800, fontSize: 14, color: '#0A0A0A', letterSpacing: -0.3 }}>
              Laforet Designer
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="nav-desktop">
            {NAV.map(item => (
              <div key={item.to} style={{ position: 'relative' }}
                onMouseEnter={() => item.children && setDropdown(item.to)}
                onMouseLeave={() => setDropdown(null)}
              >
                <Link to={item.to} style={{
                  fontFamily: 'Archivo,sans-serif', fontWeight: 500, fontSize: 13,
                  color: location.pathname.startsWith(item.to) && item.to !== '/' ? '#0A0A0A' : '#555',
                  textDecoration: 'none', letterSpacing: 0.1,
                  borderBottom: location.pathname.startsWith(item.to) && item.to !== '/' ? '1px solid #0A0A0A' : '1px solid transparent',
                  paddingBottom: 2, transition: 'all 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#0A0A0A' }}
                  onMouseLeave={e => { e.currentTarget.style.color = location.pathname.startsWith(item.to) && item.to !== '/' ? '#0A0A0A' : '#555' }}
                >
                  {item.label}
                </Link>

                <AnimatePresence>
                  {item.children && dropdown === item.to && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        position: 'absolute', top: '100%', left: 0, marginTop: 12,
                        background: '#fff', border: '1px solid #E8E8E8',
                        minWidth: 200, padding: '0.5rem 0',
                      }}
                    >
                      {item.children.map(child => (
                        <Link key={child.to} to={child.to} style={{
                          display: 'block', padding: '10px 16px',
                          fontFamily: 'Archivo,sans-serif', fontWeight: 500, fontSize: 13, color: '#0A0A0A',
                          textDecoration: 'none', transition: 'background 0.15s',
                        }}
                          onMouseEnter={e => e.currentTarget.style.background = '#F5F5F5'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <Link to="/contact" className="btn-primary" style={{ fontSize: 13, padding: '10px 20px' }}>
              Devis gratuit →
            </Link>
          </nav>

          {/* Burger */}
          <button onClick={() => setMobileOpen(o => !o)} className="nav-burger"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'none' }}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, bottom: 0, zIndex: 199,
              background: '#fff', overflowY: 'auto', padding: '2rem 1.25rem',
            }}
          >
            {NAV.map(item => (
              <div key={item.to} style={{ borderBottom: '1px solid #E8E8E8', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <Link to={item.to} style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 800, fontSize: 28, color: '#0A0A0A', textDecoration: 'none', letterSpacing: -0.5 }}>{item.label}</Link>
                {item.children && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12, paddingLeft: 12 }}>
                    {item.children.map(c => (
                      <Link key={c.to} to={c.to} style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 500, fontSize: 15, color: '#555', textDecoration: 'none' }}>{c.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/contact" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>Devis gratuit →</Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 820px) {
          .nav-desktop { display: none !important; }
          .nav-burger  { display: block !important; }
        }
      `}</style>
    </>
  )
}

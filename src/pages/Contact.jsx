import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Calendar, MessageSquare, Check } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import { useSiteSettings } from '../hooks/useWordPress'

const FILLOUT_CONTACT  = 'https://laforetdesigner.fillout.com/t/16eaLgUcR2us'
const FILLOUT_CALENDAR = 'https://laforetdesigner.fillout.com/t/gW4c2BDVxPus'

export default function Contact() {
  const [tab, setTab] = useState('form')
  const { data: settings } = useSiteSettings()
  const contact = settings?.contact ?? {}

  const infos = [
    { icon: Mail,    value: contact.email   || 'hello@laforetdesigner.com' },
    { icon: Phone,   value: contact.phone   || '+33 1 23 45 67 89' },
    { icon: MapPin,  value: contact.address || 'Paris, France' },
  ]

  const tabs = [
    { id: 'form',     label: 'Formulaire de contact', icon: MessageSquare },
    { id: 'calendar', label: 'Prendre rendez-vous',   icon: Calendar },
  ]

  return (
    <>
      {/* Header */}
      <div style={{ paddingTop: 60, background: '#0A0A0A' }}>
        <div className="container" style={{ padding: '4rem 2rem 5rem' }}>
          <motion.p className="t-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>
            Travaillons ensemble
          </motion.p>
          <motion.h1 className="t-hero" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, ease: [0.16,1,0.3,1] }} style={{ color: '#fff' }}>
            Contact
          </motion.h1>
        </div>
      </div>

      {/* Body */}
      <section style={{ background: '#F7F7F7', padding: '4rem 0 6rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem', alignItems: 'start' }} className="contact-grid">

            {/* Colonne gauche — embeds Fillout */}
            <div>
              {/* Tabs */}
              <div style={{ display: 'flex', marginBottom: '1.5rem', background: '#fff', border: '1px solid #E8E8E8' }}>
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button key={id} onClick={() => setTab(id)} style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '13px 16px', border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                    background: tab === id ? '#0A0A0A' : 'transparent',
                    color:      tab === id ? '#fff'    : '#888',
                    fontFamily: 'Archivo,sans-serif', fontWeight: 700, fontSize: 12,
                  }}>
                    <Icon size={14} /> {label}
                  </button>
                ))}
              </div>

              {/* Embed */}
              <AnimatePresence mode="wait">
                <motion.div key={tab}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                  style={{ background: '#fff', border: '1px solid #E8E8E8', overflow: 'hidden' }}
                >
                  <iframe
                    src={`${tab === 'form' ? FILLOUT_CONTACT : FILLOUT_CALENDAR}?embed=true`}
                    style={{ width: '100%', height: 700, border: 'none', display: 'block' }}
                    title={tab === 'form' ? 'Formulaire de contact' : 'Prendre rendez-vous'}
                    loading="lazy"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Colonne droite — infos */}
            <Reveal delay={100}>
              <div style={{ position: 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                {/* Carte Google Maps + badge avis */}
                <div style={{ background: '#0A0A0A', overflow: 'hidden' }}>
                  <a href="https://www.google.com/maps/place/Branding+%26+Com+360%C2%B0+%7C+Laforet+Designer/@46.2474390,6.0269652,17z"
                    target="_blank" rel="noreferrer" style={{ display: 'block' }}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3643.198431581833!2d6.026965234353414!3d46.24743898600255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c632c21d13bcd%3A0x6b6c19005ff92917!2sBranding%20%26%20Com%20360%C2%B0%20%7C%20Laforet%20Designer!5e1!3m2!1sfr!2sfr!4v1782115451653!5m2!1sfr!2sfr"
                      width="100%" height="180"
                      style={{ border: 0, display: 'block', filter: 'grayscale(1) invert(0.88) contrast(0.9)' }}
                      allowFullScreen loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Laforet Designer — Carte"
                    />
                  </a>
                  <a href="https://www.google.com/maps/place/Branding+%26+Com+360%C2%B0+%7C+Laforet+Designer/@46.2474390,6.0269652,17z"
                    target="_blank" rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '1rem 1.25rem', textDecoration: 'none', borderTop: '1px solid rgba(255,255,255,0.07)', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#4285F4"/>
                      <circle cx="12" cy="9" r="2.5" fill="#fff"/>
                    </svg>
                    <div>
                      <div style={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                        {[1,2,3,4,5].map(i => (
                          <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#FBBC04">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>
                      <span style={{ fontFamily: 'Archivo,sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>Avis Google · Voir sur Maps</span>
                    </div>
                  </a>
                </div>

                {/* Garanties */}
                <div style={{ background: '#fff', border: '1px solid #E8E8E8', padding: '1.75rem' }}>
                  <p className="t-label" style={{ marginBottom: '1.25rem' }}>Pourquoi nous choisir</p>
                  {[
                    'Devis sous 48h garanti',
                    'Note 5/5 sur 100+ projets',
                    'Retours jusqu\'à satisfaction',
                    'Accompagnement humain',
                    'Disponibilité et flexibilité',
                    'Expertise multi-secteurs',
                  ].map(v => (
                    <div key={v} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: '0.6rem' }}>
                      <Check size={12} color="#1E40AF" strokeWidth={3} />
                      <span style={{ fontFamily: 'Archivo,sans-serif', fontSize: 13, color: '#333' }}>{v}</span>
                    </div>
                  ))}
                </div>

              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}

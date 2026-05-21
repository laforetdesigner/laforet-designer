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

                {/* Coordonnées */}
                <div style={{ background: '#0A0A0A', padding: '2rem' }}>
                  <p className="t-label" style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '1.5rem' }}>
                    Nos coordonnées
                  </p>
                  {infos.map(({ icon: Icon, value }) => (
                    <div key={value} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: '1rem' }}>
                      <Icon size={14} color="rgba(255,255,255,0.3)" strokeWidth={1.5} />
                      <span style={{ fontFamily: 'Archivo,sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Garanties */}
                <div style={{ background: '#fff', border: '1px solid #E8E8E8', padding: '1.75rem' }}>
                  <p className="t-label" style={{ marginBottom: '1.25rem' }}>Pourquoi nous choisir</p>
                  {[
                    'Devis sous 48h garanti',
                    'Note 5/5 sur 100+ projets',
                    'Expertise multi-secteurs',
                    'Tarifs transparents',
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

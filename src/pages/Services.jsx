import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import CTABanner from '../components/sections/CTABanner'
import { SERVICES } from '../data/mockData'

export default function Services() {
  return (
    <>
      <div style={{ paddingTop: 64, background: '#0A0A0A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ padding: '4rem 2rem 5rem' }}>
          <motion.p className="t-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }}>Services</motion.p>
          <motion.h1 className="t-hero" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, ease: [0.16,1,0.3,1] }} style={{ color: '#fff', marginBottom: '1.5rem' }}>
            Nos expertises
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            style={{ fontFamily: 'Archivo,sans-serif', fontSize: 17, color: 'rgba(255,255,255,0.4)', maxWidth: 500, lineHeight: 1.6 }}>
            Trois pôles d'excellence pour couvrir tous les aspects de votre présence de marque.
          </motion.p>
        </div>
      </div>

      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug}>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start',
                padding: '5rem 0', borderBottom: i < SERVICES.length - 1 ? '1px solid #E8E8E8' : 'none',
              }} className="service-row">
                <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                  <p className="t-label" style={{ color: '#1E40AF', marginBottom: '1rem' }}>Pôle {service.pole}</p>
                  <h2 className="t-display" style={{ marginBottom: '1rem' }}>{service.title}</h2>
                  <p style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 600, fontSize: 15, color: '#888', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                    {service.tagline}
                  </p>
                  <p className="t-body" style={{ marginBottom: '2.5rem', maxWidth: 440 }}>{service.description}</p>
                  <Link to={`/services/${service.slug}`} className="btn-primary">
                    Découvrir les offres <ArrowRight size={15} />
                  </Link>
                </div>

                <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                  <div style={{ background: '#FAFAFA', padding: '2rem', border: '1px solid #E8E8E8' }}>
                    <p className="t-label" style={{ marginBottom: '1.25rem' }}>Prestations</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {service.prestations.map((p, j) => (
                        <span key={j} style={{ fontFamily: 'Archivo,sans-serif', fontSize: 12, fontWeight: 600, color: '#333', background: '#fff', border: '1px solid #E8E8E8', padding: '5px 12px' }}>
                          {p}
                        </span>
                      ))}
                    </div>
                    <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #E8E8E8' }}>
                      <p className="t-label" style={{ marginBottom: '0.75rem' }}>3 niveaux d'offres</p>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {service.pricing.map(plan => (
                          <span key={plan.name} style={{
                            fontFamily: 'Archivo,sans-serif', fontSize: 12, fontWeight: 700,
                            background: plan.highlight ? '#0A0A0A' : '#fff',
                            color: plan.highlight ? '#fff' : '#0A0A0A',
                            border: '1px solid #0A0A0A', padding: '5px 12px',
                          }}>{plan.name}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABanner />

      <style>{`
        @media (max-width: 820px) {
          .service-row { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .service-row > * { order: unset !important; }
        }
      `}</style>
    </>
  )
}

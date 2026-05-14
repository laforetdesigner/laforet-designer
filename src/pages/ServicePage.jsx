import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import CTABanner from '../components/sections/CTABanner'
import { SERVICES } from '../data/mockData'

export default function ServicePage() {
  const { slug } = useParams()
  const service = SERVICES.find(s => s.slug === slug)
  if (!service) return <Navigate to="/services" replace />

  const others = SERVICES.filter(s => s.slug !== slug)

  return (
    <>
      {/* ── Hero ── */}
      <div style={{ paddingTop: 64, background: '#0A0A0A' }}>
        <div className="container" style={{ padding: '4rem 2rem 5rem' }}>
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Archivo,sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2.5rem' }}>
              <ArrowLeft size={14} /> Services
            </Link>
          </motion.div>
          <motion.p className="t-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            style={{ color: '#1E40AF', marginBottom: '1rem' }}>
            Pôle {service.pole}
          </motion.p>
          <motion.h1 className="t-hero" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, ease: [0.16,1,0.3,1] }}
            style={{ color: '#fff', marginBottom: '1.5rem' }}>
            {service.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: 'Archivo,sans-serif', fontSize: 18, color: 'rgba(255,255,255,0.45)', maxWidth: 560, lineHeight: 1.65 }}>
            {service.description}
          </motion.p>
        </div>
      </div>

      {/* ── Prestations incluses ── */}
      <section className="section" style={{ background: '#fff', borderBottom: '1px solid #E8E8E8' }}>
        <div className="container">
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'start' }} className="prestations-grid">
              <div>
                <p className="t-label" style={{ marginBottom: '1rem' }}>Ce qui est inclus</p>
                <h2 className="t-heading" style={{ marginBottom: '1rem' }}>Nos prestations {service.title}</h2>
                <p className="t-body">{service.tagline}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                {service.prestations.map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.75rem 1rem', border: '1px solid #E8E8E8', background: '#FAFAFA' }}>
                    <span style={{ width: 6, height: 6, background: '#0A0A0A', borderRadius: '50%', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Archivo,sans-serif', fontSize: 13, color: '#0A0A0A', fontWeight: 500 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Pricing Table ── */}
      <section className="section" style={{ background: '#FAFAFA', borderBottom: '1px solid #E8E8E8' }}>
        <div className="container">
          <Reveal>
            <p className="t-label" style={{ marginBottom: '1rem' }}>Tarifs</p>
            <h2 className="t-heading" style={{ marginBottom: '0.5rem' }}>Nos offres {service.title}</h2>
            <p className="t-body" style={{ marginBottom: '3.5rem', maxWidth: 480 }}>Trois niveaux clairs pour s'adapter à votre projet et à votre budget.</p>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5px', background: '#E8E8E8' }} className="pricing-grid">
            {service.pricing.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100}>
                <div style={{
                  background: plan.highlight ? '#0A0A0A' : '#fff',
                  padding: '2.5rem',
                  position: 'relative',
                  height: '100%',
                  display: 'flex', flexDirection: 'column',
                }}>
                  {plan.badge && (
                    <span style={{
                      position: 'absolute', top: 20, right: 20,
                      background: '#1E40AF', color: '#fff',
                      fontFamily: 'Archivo,sans-serif', fontWeight: 700, fontSize: 11,
                      padding: '3px 10px', letterSpacing: '0.05em',
                    }}>{plan.badge}</span>
                  )}

                  <div style={{ marginBottom: '1.5rem' }}>
                    <p className="t-label" style={{ color: plan.highlight ? 'rgba(255,255,255,0.3)' : '#888', marginBottom: '0.75rem' }}>
                      {plan.name}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: '0.75rem' }}>
                      <span style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 900, fontSize: 40, letterSpacing: -1.5, color: plan.highlight ? '#fff' : '#0A0A0A', lineHeight: 1 }}>
                        {plan.price}
                      </span>
                      <span style={{ fontFamily: 'Archivo,sans-serif', fontSize: 13, color: plan.highlight ? 'rgba(255,255,255,0.3)' : '#888' }}>/ {plan.frequency}</span>
                    </div>
                    <p style={{ fontFamily: 'Archivo,sans-serif', fontSize: 13, color: plan.highlight ? 'rgba(255,255,255,0.45)' : '#666', lineHeight: 1.5 }}>
                      {plan.description}
                    </p>
                  </div>

                  <hr style={{ border: 'none', borderTop: `1px solid ${plan.highlight ? 'rgba(255,255,255,0.1)' : '#E8E8E8'}`, marginBottom: '1.5rem' }} />

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem', flex: 1 }}>
                    {plan.features.map((f, j) => (
                      <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <Check size={14} color={plan.highlight ? '#60A5FA' : '#0A0A0A'} style={{ flexShrink: 0, marginTop: 2 }} strokeWidth={2.5} />
                        <span style={{ fontFamily: 'Archivo,sans-serif', fontSize: 13, color: plan.highlight ? 'rgba(255,255,255,0.75)' : '#333', lineHeight: 1.5 }}>{f}</span>
                      </li>
                    ))}
                    {plan.excluded.map((f, j) => (
                      <li key={`x${j}`} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <X size={14} color={plan.highlight ? 'rgba(255,255,255,0.15)' : '#CCC'} style={{ flexShrink: 0, marginTop: 2 }} strokeWidth={2} />
                        <span style={{ fontFamily: 'Archivo,sans-serif', fontSize: 13, color: plan.highlight ? 'rgba(255,255,255,0.2)' : '#BBB', lineHeight: 1.5, textDecoration: 'line-through' }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '13px 20px',
                    background: plan.highlight ? '#fff' : '#0A0A0A',
                    color: plan.highlight ? '#0A0A0A' : '#fff',
                    fontFamily: 'Archivo,sans-serif', fontWeight: 700, fontSize: 13,
                    textDecoration: 'none', border: `2px solid ${plan.highlight ? '#fff' : '#0A0A0A'}`,
                    transition: 'all 0.2s', marginTop: 'auto',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#1E40AF'; e.currentTarget.style.borderColor = '#1E40AF'; e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.background = plan.highlight ? '#fff' : '#0A0A0A'; e.currentTarget.style.borderColor = plan.highlight ? '#fff' : '#0A0A0A'; e.currentTarget.style.color = plan.highlight ? '#0A0A0A' : '#fff' }}
                  >
                    {plan.cta} <ArrowRight size={14} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <p style={{ fontFamily: 'Archivo,sans-serif', fontSize: 12, color: '#AAA', textAlign: 'center', marginTop: '1.5rem' }}>
            Tous les prix sont HT. TVA en sus selon régime. Devis personnalisé sur demande.
          </p>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="section" style={{ background: '#fff', borderBottom: '1px solid #E8E8E8' }}>
        <div className="container">
          <Reveal>
            <p className="t-label" style={{ marginBottom: '1rem' }}>Méthode</p>
            <h2 className="t-heading" style={{ marginBottom: '4rem' }}>Notre processus</h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5px', background: '#E8E8E8' }} className="process-grid">
            {service.process.map((step, i) => (
              <Reveal key={step.step} delay={i * 80}>
                <div style={{ background: i === 0 ? '#0A0A0A' : '#fff', padding: '2.5rem', height: '100%' }}>
                  <span style={{
                    fontFamily: 'Archivo,sans-serif', fontWeight: 900,
                    fontSize: 48, lineHeight: 1, letterSpacing: -2,
                    color: i === 0 ? 'rgba(255,255,255,0.15)' : '#E8E8E8',
                    display: 'block', marginBottom: '1.25rem',
                  }}>{step.step}</span>
                  <h4 style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 800, fontSize: 16, color: i === 0 ? '#fff' : '#0A0A0A', marginBottom: '0.75rem', letterSpacing: -0.3 }}>
                    {step.title}
                  </h4>
                  <p style={{ fontFamily: 'Archivo,sans-serif', fontSize: 13, color: i === 0 ? 'rgba(255,255,255,0.5)' : '#666', lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Autres services ── */}
      <section className="section-sm" style={{ background: '#FAFAFA', borderBottom: '1px solid #E8E8E8' }}>
        <div className="container">
          <p className="t-label" style={{ marginBottom: '2rem' }}>Nos autres expertises</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {others.map(s => (
              <Link key={s.slug} to={`/services/${s.slug}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: 'Archivo,sans-serif', fontWeight: 700, fontSize: 14,
                color: '#0A0A0A', textDecoration: 'none',
                padding: '12px 20px', border: '1px solid #E8E8E8', background: '#fff',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0A0A0A'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#0A0A0A' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#0A0A0A'; e.currentTarget.style.borderColor = '#E8E8E8' }}
              >
                {s.title} <ArrowRight size={13} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />

      <style>{`
        @media (max-width: 900px) {
          .prestations-grid { grid-template-columns: 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .process-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}

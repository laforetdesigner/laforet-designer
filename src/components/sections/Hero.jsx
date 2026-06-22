import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useSiteSettings } from '../../hooks/useWordPress'
import { SkeletonHero } from '../ui/Skeleton'

export default function Hero() {
  const { data: settings, isLoading } = useSiteSettings()
  const hero = settings?.hero

  if (isLoading && !hero) return <SkeletonHero />

  const label        = hero?.label         ?? 'Agence de design créatif — Paris'
  const title1       = hero?.title1        ?? 'Laforet'
  const title2       = hero?.title2        ?? 'Designer.'
  const description  = hero?.description   ?? "Nous façonnons des identités visuelles, communications globales et expériences digitales pour les marques qui veulent s'imposer."
  const ctaPrimary   = hero?.cta_primary   ?? 'Démarrer un projet'
  const ctaSecondary = hero?.cta_secondary ?? 'Voir les réalisations'

  return (
    <section style={{ paddingTop: 60, background: '#F7F7F7' }}>
      <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        {/* Label */}
        <motion.p
          className="t-label"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          style={{ marginBottom: '2rem' }}
        >
          {label}
        </motion.p>

        {/* Titre principal */}
        <motion.h1
          className="t-hero"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '2rem', maxWidth: 900 }}
        >
          {title1}<br />
          <span style={{ color: '#1E40AF' }}>{title2}</span>
        </motion.h1>

        {/* Ligne séparatrice */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16,1,0.3,1] }}
          style={{ height: 1, background: '#E8E8E8', maxWidth: 560, marginBottom: '2rem', transformOrigin: 'left' }}
        />

        {/* Description + CTA en grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'end', maxWidth: 860 }}
          className="hero-bottom"
        >
          <p style={{
            fontFamily: 'Archivo, sans-serif', fontWeight: 400,
            fontSize: 'clamp(16px, 2vw, 20px)',
            lineHeight: 1.6, color: '#555', maxWidth: 480,
          }}>
            {description}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
            <Link to="/contact" className="btn-primary">
              {ctaPrimary} <ArrowRight size={14} />
            </Link>
            <Link to="/portfolio" className="btn-outline">
              {ctaSecondary}
            </Link>
          </div>
        </motion.div>
      </div>


      <style>{`
        @media (max-width: 640px) {
          .hero-bottom { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
        }
      `}</style>
    </section>
  )
}

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section style={{ paddingTop: 64, background: '#fff', borderBottom: '1px solid #E8E8E8' }}>
      <div className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div style={{ maxWidth: 900 }}>
          <motion.p
            className="t-label"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            style={{ marginBottom: '2rem' }}
          >
            Agence de design créatif — Paris
          </motion.p>

          <motion.h1
            className="t-hero"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '2.5rem' }}
          >
            Laforet<br />
            <span style={{ color: '#1E40AF' }}>Designer.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              fontFamily: 'Archivo, sans-serif', fontWeight: 400,
              fontSize: 'clamp(17px, 2.2vw, 22px)',
              lineHeight: 1.55, color: '#555',
              maxWidth: 560, marginBottom: '3rem',
            }}
          >
            Nous façonnons des identités visuelles, communications globales et expériences digitales pour les marques qui veulent s'imposer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            <Link to="/contact" className="btn-primary">
              Démarrer un projet <ArrowRight size={16} />
            </Link>
            <Link to="/portfolio" className="btn-outline">
              Voir les réalisations
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

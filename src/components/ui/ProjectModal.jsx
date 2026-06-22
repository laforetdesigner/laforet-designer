import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.8)', zIndex: 200, backdropFilter: 'blur(8px)', cursor: 'pointer' }}
          />
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', inset: '5%', zIndex: 201,
              background: '#fff', borderRadius: 16, overflow: 'auto',
              maxWidth: 900, margin: '0 auto',
            }}
          >
            <button onClick={onClose} style={{
              position: 'absolute', top: 20, right: 20, zIndex: 1,
              width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(10,10,10,0.1)',
              background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0A0A0A'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#0A0A0A' }}
            >
              <X size={18} />
            </button>

            <div style={{ aspectRatio: '16/7', overflow: 'hidden' }}>
              <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>

            <div style={{ padding: '2.5rem 3rem 3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 11, background: '#EFF6FF', color: '#1E40AF', borderRadius: 100, padding: '4px 12px', letterSpacing: 0.5 }}>{project.category}</span>
                    <span style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 500, fontSize: 11, background: '#F5F5F5', color: '#666', borderRadius: 100, padding: '4px 12px' }}>{project.year}</span>
                  </div>
                  <h2 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 900, fontSize: 36, color: '#0A0A0A', letterSpacing: -1.5, lineHeight: 1 }}>{project.title}</h2>
                  <p style={{ fontFamily: 'Archivo, sans-serif', fontSize: 14, color: 'rgba(10,10,10,0.4)', marginTop: 8 }}>Client : {project.client}</p>
                </div>
                <div style={{ background: '#F5F5F5', borderRadius: 10, padding: '1rem 1.5rem', textAlign: 'center' }}>
                  <p style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 13, color: '#0A0A0A', marginBottom: 4 }}>Résultat clé</p>
                  <p style={{ fontFamily: 'Archivo, sans-serif', fontSize: 13, color: '#1E40AF', fontWeight: 600, maxWidth: 200 }}>{project.result}</p>
                </div>
              </div>

              <p style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16, lineHeight: 1.7, color: 'rgba(10,10,10,0.7)', marginBottom: '2rem' }}>{project.description}</p>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '2rem' }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{ fontFamily: 'Archivo, sans-serif', fontSize: 13, fontWeight: 500, background: '#F5F5F5', padding: '6px 14px', borderRadius: 6, color: '#0A0A0A' }}>{tag}</span>
                ))}
              </div>

              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 13,
                  background: '#0A0A0A', color: '#fff', textDecoration: 'none',
                  padding: '12px 24px', border: '1.5px solid #0A0A0A', transition: 'background 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1E40AF'; e.currentTarget.style.borderColor = '#1E40AF' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#0A0A0A'; e.currentTarget.style.borderColor = '#0A0A0A' }}
                >
                  Voir le projet <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

import { motion } from 'framer-motion'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import Reveal from '../components/ui/Reveal'
import CTABanner from '../components/sections/CTABanner'
import { BLOG_POSTS } from '../data/mockData'

const CATEGORIES = ['Tous', 'Branding', 'Digital', 'Communication']

export default function Blog() {
  return (
    <>
      <div style={{ paddingTop: 72, background: '#0A0A0A', minHeight: '40vh', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2rem 3rem', width: '100%' }}>
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 3, color: '#3B82F6', display: 'block', marginBottom: 12 }}>
            Ressources & Insights
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 900, fontSize: 'clamp(40px, 7vw, 88px)', lineHeight: 0.95, letterSpacing: -3, color: '#fff', marginBottom: '1rem' }}>
            Blog
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.4)', maxWidth: 480 }}>
            Tendances, conseils et inspiration sur le design, la communication et la stratégie de marque.
          </motion.p>
        </div>
      </div>

      <div style={{ background: '#F5F5F5', padding: '4rem 2rem 6rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: '3rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button key={cat} style={{
                fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 13,
                padding: '8px 18px', borderRadius: 6, border: 'none', cursor: 'pointer',
                background: cat === 'Tous' ? '#0A0A0A' : '#fff',
                color: cat === 'Tous' ? '#fff' : '#0A0A0A',
                boxShadow: cat !== 'Tous' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s',
              }}>{cat}</button>
            ))}
          </div>

          {BLOG_POSTS.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
              {BLOG_POSTS.map((post, i) => (
                <Reveal key={post.id} delay={i * 100}>
                  <article style={{
                    background: '#fff', borderRadius: 12, overflow: 'hidden',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.06)', transition: 'all 0.3s', cursor: 'pointer',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.1)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)' }}
                  >
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                      <img src={post.image} alt={post.title} loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </div>
                    <div style={{ padding: '1.5rem 1.75rem 2rem' }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 11, color: '#1E40AF', background: '#EFF6FF', padding: '3px 10px', borderRadius: 100 }}>
                          <Tag size={10} /> {post.category}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Archivo, sans-serif', fontSize: 11, color: 'rgba(10,10,10,0.35)' }}>
                          <Clock size={10} /> {post.readTime}
                        </span>
                      </div>
                      <h2 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 18, color: '#0A0A0A', letterSpacing: -0.3, lineHeight: 1.3, marginBottom: '0.75rem' }}>
                        {post.title}
                      </h2>
                      <p style={{ fontFamily: 'Archivo, sans-serif', fontSize: 14, color: 'rgba(10,10,10,0.5)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                        {post.excerpt}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'Archivo, sans-serif', fontSize: 12, color: 'rgba(10,10,10,0.3)' }}>
                          {new Date(post.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 13, color: '#1E40AF' }}>
                          Lire <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '8rem 0' }}>
              <p style={{ fontSize: 48, marginBottom: '1rem' }}>✍️</p>
              <h3 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 24, color: '#0A0A0A', marginBottom: '0.5rem' }}>Articles bientôt disponibles</h3>
              <p style={{ fontFamily: 'Archivo, sans-serif', fontSize: 15, color: 'rgba(10,10,10,0.4)' }}>Revenez prochainement pour découvrir nos insights.</p>
            </div>
          )}
        </div>
      </div>

      <CTABanner />
    </>
  )
}

import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Clock, Calendar, ArrowRight, Video } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { fetchPostBySlug, stripHtml, getFeaturedImage } from '../lib/wordpress'
import { usePortfolio } from '../hooks/useWordPress'

/* ─── Parse WP content into H2 sections ───────────────────────────────────── */
function parseContent(html) {
  if (!html || typeof document === 'undefined') return { preamble: html || '', sections: [] }
  const div = document.createElement('div')
  div.innerHTML = html
  const sections = []
  let current = null
  let preamble = ''
  for (const child of div.children) {
    if (child.tagName === 'H2') {
      current = { title: child.textContent.trim(), html: '' }
      sections.push(current)
    } else if (current) {
      current.html += child.outerHTML
    } else {
      preamble += child.outerHTML
    }
  }
  return { preamble, sections }
}

/* ─── Section card (col) ───────────────────────────────────────────────────── */
function SectionCol({ title, html, accent }) {
  return (
    <div style={{
      background: accent ? '#0A0A0A' : '#fff',
      border: `1px solid ${accent ? 'transparent' : '#E8E8E8'}`,
      padding: '2rem',
      display: 'flex', flexDirection: 'column',
    }}>
      <p className="t-label" style={{ color: accent ? 'rgba(255,255,255,0.3)' : '#AAA', marginBottom: '1rem' }}>
        {title}
      </p>
      <div
        className={accent ? 'section-col-dark' : 'section-col-light'}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

/* ─── Related project card ─────────────────────────────────────────────────── */
function RelatedCard({ item }) {
  const href = item.slug ? `/portfolio/${item.slug}` : item.link
  const isExternal = !item.slug
  return (
    <a href={href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noreferrer' : undefined}
      style={{ display: 'block', textDecoration: 'none', background: '#fff', border: '1px solid #E8E8E8', transition: 'border-color 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = '#0A0A0A'}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#E8E8E8'}
    >
      <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: '#F5F5F5' }}>
        <img src={item.thumb || item.image} alt={item.title} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(20%)', transition: 'transform 0.5s, filter 0.4s' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.filter = 'grayscale(0%)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'grayscale(20%)' }}
        />
      </div>
      <div style={{ padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
          <span style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 800, fontSize: 15, color: '#0A0A0A', letterSpacing: -0.3 }}>{item.title}</span>
          <span style={{ fontFamily: 'Archivo,sans-serif', fontWeight: 700, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#CCC' }}>{item.year}</span>
        </div>
        <p style={{ fontFamily: 'Archivo,sans-serif', fontSize: 12, color: '#888' }}>{item.category}</p>
      </div>
    </a>
  )
}

/* ─── Main component ───────────────────────────────────────────────────────── */
export default function ArticlePage({ backPath = '/ressources', backLabel = 'Ressources' }) {
  const { slug } = useParams()
  const navigate = useNavigate()
  const isPortfolio = backPath === '/portfolio'

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['wp-post', slug],
    queryFn: () => fetchPostBySlug(slug),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  })

  const { data: allItems = [] } = usePortfolio()
  const related = allItems.filter(p => p.slug !== slug).slice(0, 3)

  if (isLoading) {
    return (
      <div style={{ paddingTop: 120, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'Archivo, sans-serif', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>Chargement…</span>
      </div>
    )
  }

  if (isError || !post) {
    return (
      <div style={{ paddingTop: 120, minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
        <p style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16, color: '#888' }}>Article introuvable.</p>
        <Link to={backPath} className="btn-outline">← Retour</Link>
      </div>
    )
  }

  const title    = post.title?.rendered?.replace(/<[^>]+>/g, '') || ''
  const image    = getFeaturedImage(post, 'large')
  const date     = post.date ? new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''
  const words    = stripHtml(post.content?.rendered || '').split(/\s+/).length
  const readTime = `${Math.max(1, Math.round(words / 200))} min`
  const excerpt  = stripHtml(post.excerpt?.rendered || '')
  const { preamble, sections } = parseContent(post.content?.rendered || '')
  const firstCols  = sections.slice(0, 3)
  const remaining  = sections.slice(3)

  return (
    <>
      <Helmet>
        <title>{title} | Laforet Designer</title>
        <meta name="description" content={excerpt.slice(0, 160)} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt.slice(0, 160)} />
        {image && <meta property="og:image" content={image} />}
        <meta property="og:type" content="article" />
      </Helmet>

      {/* ── Header ── */}
      <div style={{ paddingTop: 64, background: '#0A0A0A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ padding: '3rem 2rem 3.5rem' }}>
          <button onClick={() => navigate(-1)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: 'Archivo, sans-serif', fontSize: 12, fontWeight: 700,
            color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none',
            cursor: 'pointer', letterSpacing: '0.04em', textTransform: 'uppercase',
            marginBottom: '2rem', padding: 0, transition: 'color 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
          >
            <ArrowLeft size={13} /> {backLabel}
          </button>

          <h1 style={{
            fontFamily: 'Archivo, sans-serif', fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 56px)', lineHeight: 1.0,
            letterSpacing: '-0.03em', color: '#fff', maxWidth: 860,
            marginBottom: '1.5rem',
          }}
            dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
          />

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {date && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'Archivo, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
                <Calendar size={12} /> {date}
              </span>
            )}
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'Archivo, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
              <Clock size={12} /> {readTime} de lecture
            </span>
          </div>
        </div>
      </div>

      {/* ── Image featured ── */}
      {image && (
        <div style={{ background: '#0A0A0A' }}>
          <div className="container" style={{ padding: 0 }}>
            <img src={image} alt={title}
              style={{ width: '100%', maxHeight: 520, objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      )}

      {/* ── Preamble ── */}
      {preamble && (
        <section style={{ background: '#fff', borderBottom: '1px solid #E8E8E8' }}>
          <div className="container" style={{ padding: '3rem 2rem' }}>
            <div className="article-prose" dangerouslySetInnerHTML={{ __html: preamble }} />
          </div>
        </section>
      )}

      {/* ── 3-col sections (Besoin / Problématique / Solution) ── */}
      {firstCols.length > 0 && (
        <section style={{ background: '#F7F7F7', borderBottom: '1px solid #E8E8E8' }}>
          <div className="container" style={{ padding: '3rem 2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${firstCols.length}, 1fr)`, gap: '1.5px', background: '#E8E8E8' }} className="sections-grid">
              {firstCols.map((s, i) => (
                <SectionCol key={i} title={s.title} html={s.html} accent={i === 1 && firstCols.length === 3} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Sections supplémentaires ── */}
      {remaining.length > 0 && (
        <section style={{ background: '#fff', borderBottom: '1px solid #E8E8E8' }}>
          <div className="container" style={{ padding: '3rem 2rem' }}>
            {remaining.map((s, i) => (
              <div key={i} style={{ marginBottom: i < remaining.length - 1 ? '3rem' : 0 }}>
                <h2 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 900, fontSize: 'clamp(22px, 3vw, 32px)', letterSpacing: '-0.025em', color: '#0A0A0A', marginBottom: '1.25rem' }}>{s.title}</h2>
                <div className="article-prose" dangerouslySetInnerHTML={{ __html: s.html }} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Carousel projets liés ── */}
      {isPortfolio && related.length > 0 && (
        <section style={{ background: '#F7F7F7', borderTop: '1px solid #E8E8E8', borderBottom: '1px solid #E8E8E8', padding: '4rem 0' }}>
          <div className="container" style={{ padding: '0 2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
              <p className="t-label">Autres projets</p>
              <Link to="/portfolio" style={{ fontFamily: 'Archivo, sans-serif', fontSize: 12, fontWeight: 700, color: '#0A0A0A', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                Voir tout <ArrowRight size={11} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5px', background: '#E8E8E8' }} className="related-grid">
              {related.map(item => <RelatedCard key={item.id} item={item} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA + Calendar ── */}
      <section style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '5rem 0' }}>
        <div className="container" style={{ padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="cta-grid">

            {/* Left */}
            <div>
              <p className="t-label" style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '1.5rem' }}>Démarrer un projet</p>
              <h2 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 900, fontSize: 'clamp(32px, 4.5vw, 60px)', lineHeight: 0.97, letterSpacing: '-0.035em', color: '#fff', marginBottom: '1.75rem' }}>
                <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Vous avez un projet ?</span>
                <span style={{ display: 'block' }}>Parlons-en.</span>
              </h2>
              <p style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.45)', marginBottom: '2rem', lineHeight: 1.6, whiteSpace: 'nowrap' }}>
                Devis gratuit et personnalisé sous 48h. Premier échange offert.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link to="/contact" style={{
                  background: '#fff', color: '#0A0A0A',
                  fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 13,
                  padding: '13px 26px', border: '1.5px solid #fff',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1E40AF'; e.currentTarget.style.borderColor = '#1E40AF'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.color = '#0A0A0A' }}
                >
                  Demander un devis <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right — Fillout booking */}
            <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '2rem', background: 'rgba(255,255,255,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
                <div style={{ width: 36, height: 36, background: '#1E40AF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Video size={16} color="#fff" />
                </div>
                <div>
                  <p style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 14, color: '#fff', letterSpacing: -0.2 }}>Réserver un appel gratuit</p>
                  <p style={{ fontFamily: 'Archivo, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em' }}>30 MIN · VISIO OU TÉLÉPHONE</p>
                </div>
              </div>
              <p style={{ fontFamily: 'Archivo, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Discutons de votre projet sans engagement. Je vous réponds sous 24h.
              </p>
              <a href="https://laforetdesigner.fillout.com/t/gW4c2BDVxPus" target="_blank" rel="noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 13,
                color: '#fff', textDecoration: 'none',
                background: '#1E40AF', padding: '13px 20px',
                border: '1.5px solid #1E40AF', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#0A0A0A'; e.currentTarget.style.borderColor = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1E40AF'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#1E40AF' }}
              >
                <Calendar size={14} /> Choisir un créneau
              </a>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        /* ── Prose styles for article content ── */
        .article-prose {
          font-family: 'Archivo', sans-serif;
          font-size: 16px;
          line-height: 1.75;
          color: #444;
        }
        .article-prose p  { margin-bottom: 1.2rem; }
        .article-prose h3, .article-prose h4 {
          font-weight: 800; color: #0A0A0A;
          letter-spacing: -0.02em; line-height: 1.2;
          margin: 2rem 0 0.75rem;
        }
        .article-prose h3 { font-size: clamp(17px, 2vw, 21px); }
        .article-prose h4 { font-size: 16px; }
        .article-prose ul, .article-prose ol { padding-left: 1.4rem; margin-bottom: 1.2rem; }
        .article-prose li { margin-bottom: 0.35rem; }
        .article-prose a  { color: #1E40AF; text-decoration: underline; }
        .article-prose strong { font-weight: 800; color: #0A0A0A; }
        .article-prose img { max-width: 100%; height: auto; display: block; margin: 1.5rem 0; }
        .article-prose blockquote {
          border-left: 3px solid #1E40AF; padding: 0.75rem 1.25rem;
          margin: 1.5rem 0; background: #F7F7F7; font-style: italic; color: #555;
        }
        .article-prose hr { border: none; border-top: 1px solid #E8E8E8; margin: 2rem 0; }
        /* ── Dark section columns ── */
        .section-col-light { font-family: 'Archivo',sans-serif; font-size: 15px; line-height: 1.7; color: #555; }
        .section-col-dark  { font-family: 'Archivo',sans-serif; font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.5); }
        .section-col-light p, .section-col-dark p { margin-bottom: 0.9rem; }
        .section-col-light strong { font-weight: 800; color: #0A0A0A; }
        .section-col-dark  strong { font-weight: 800; color: #fff; }
        .section-col-light ul, .section-col-dark ul { padding-left: 1.2rem; }
        .section-col-light li, .section-col-dark li { margin-bottom: 0.4rem; }
        /* ── Responsive ── */
        @media (max-width: 900px) {
          .sections-grid { grid-template-columns: 1fr !important; }
          .related-grid  { grid-template-columns: 1fr 1fr !important; }
          .cta-grid      { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .related-grid  { grid-template-columns: 1fr !important; }
          .cta-grid p[style*="nowrap"] { white-space: normal !important; }
        }
      `}</style>
    </>
  )
}

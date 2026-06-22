import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { fetchPostBySlug, stripHtml, getFeaturedImage } from '../lib/wordpress'
import CTABanner from '../components/sections/CTABanner'

export default function ArticlePage({ backPath = '/ressources', backLabel = 'Ressources' }) {
  const { slug } = useParams()
  const navigate = useNavigate()

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['wp-post', slug],
    queryFn: () => fetchPostBySlug(slug),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  })

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

      {/* Header sombre */}
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
            fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.05,
            letterSpacing: '-0.03em', color: '#fff', maxWidth: 760,
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

      {/* Image featured */}
      {image && (
        <div style={{ background: '#F7F7F7', borderBottom: '1px solid #E8E8E8' }}>
          <div className="container" style={{ padding: 0 }}>
            <img src={image} alt={title} style={{ width: '100%', maxHeight: 480, objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      )}

      {/* Contenu */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E8E8E8' }}>
        <div className="container" style={{ padding: '4rem 2rem' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: post.content?.rendered }}
            />
          </div>
        </div>
      </div>

      <CTABanner />

      <style>{`
        .article-content {
          font-family: 'Archivo', sans-serif;
          font-size: 17px;
          line-height: 1.75;
          color: #333;
        }
        .article-content h1, .article-content h2, .article-content h3, .article-content h4 {
          font-weight: 900;
          color: #0A0A0A;
          letter-spacing: -0.025em;
          line-height: 1.15;
          margin: 2.5rem 0 1rem;
        }
        .article-content h2 { font-size: clamp(22px, 3vw, 30px); }
        .article-content h3 { font-size: clamp(18px, 2.5vw, 24px); }
        .article-content h4 { font-size: 18px; }
        .article-content p  { margin-bottom: 1.4rem; }
        .article-content ul, .article-content ol {
          padding-left: 1.5rem;
          margin-bottom: 1.4rem;
        }
        .article-content li { margin-bottom: 0.4rem; }
        .article-content a  { color: #1E40AF; text-decoration: underline; }
        .article-content a:hover { color: #0A0A0A; }
        .article-content img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 2rem auto;
          border: 1px solid #E8E8E8;
        }
        .article-content blockquote {
          border-left: 3px solid #1E40AF;
          padding: 1rem 1.5rem;
          margin: 2rem 0;
          background: #F7F7F7;
          font-style: italic;
          color: #555;
        }
        .article-content pre, .article-content code {
          font-family: monospace;
          background: #F5F5F5;
          padding: 2px 6px;
          font-size: 14px;
        }
        .article-content pre {
          padding: 1.25rem 1.5rem;
          overflow-x: auto;
          margin-bottom: 1.4rem;
        }
        .article-content strong { font-weight: 800; color: #0A0A0A; }
        .article-content hr { border: none; border-top: 1px solid #E8E8E8; margin: 2.5rem 0; }
        @media (max-width: 640px) {
          .article-content { font-size: 16px; }
        }
      `}</style>
    </>
  )
}

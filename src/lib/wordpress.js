/**
 * WordPress REST API — laforetdesigner.com
 * Toutes les fonctions de fetch vers wp-json/wp/v2
 */

const BASE = import.meta.env.VITE_WP_API_URL || 'https://laforetdesigner.com/wp-json/wp/v2'
const CAT_PORTFOLIO  = Number(import.meta.env.VITE_WP_PORTFOLIO_CAT)  || 17
const CAT_RESSOURCES = Number(import.meta.env.VITE_WP_RESSOURCES_CAT) || 18

// ─── Utilitaire fetch ────────────────────────────────────────────────────────
async function wpFetch(endpoint, params = {}) {
  const url = new URL(`${BASE}${endpoint}`)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`WP API error ${res.status}: ${url}`)
  return res.json()
}

// ─── Nettoyage HTML → texte brut ─────────────────────────────────────────────
export function stripHtml(html = '') {
  return html.replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, ' ').trim()
}

// ─── Image featured ──────────────────────────────────────────────────────────
export function getFeaturedImage(post, size = 'full') {
  try {
    const media = post._embedded?.['wp:featuredmedia']?.[0]
    if (!media) return null
    // Essaie d'abord la taille demandée, puis full, puis source_url
    return (
      media.media_details?.sizes?.[size]?.source_url ||
      media.media_details?.sizes?.full?.source_url ||
      media.source_url ||
      null
    )
  } catch {
    return null
  }
}

// ─── Transformeurs ───────────────────────────────────────────────────────────

/** Transforme un post WP en item Portfolio */
export function toPortfolioItem(post) {
  const image = getFeaturedImage(post, 'large')
  const thumb = getFeaturedImage(post, 'medium_large') || image

  // Catégorie principale (hors Portfolio)
  const wpCats = post._embedded?.['wp:term']?.[0] || []
  const cat = wpCats.find(c => c.id !== CAT_PORTFOLIO)?.name || 'Branding'

  // Tags → liste de prestations affichées
  const tags = (post._embedded?.['wp:term']?.[1] || []).map(t => t.name)

  return {
    id:          post.id,
    title:       post.title?.rendered || '',
    category:    mapWpCatToService(cat),
    tags,
    year:        new Date(post.date).getFullYear().toString(),
    client:      post.title?.rendered || '',
    description: stripHtml(post.excerpt?.rendered),
    result:      '',
    image:       image  || 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80',
    thumb:       thumb  || 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
    link:        post.link,
    slug:        post.slug,
    content:     post.content?.rendered || '',
  }
}

/** Transforme un post WP en article Ressource */
export function toRessource(post) {
  const image = getFeaturedImage(post, 'medium_large') || getFeaturedImage(post)
  const tags  = (post._embedded?.['wp:term']?.[1] || []).map(t => t.name)

  // Détermine le type selon les tags
  const typeTag = tags.find(t =>
    ['Étude de cas','Article','Actualité','Tuto','Formation'].includes(t)
  )

  return {
    id:       post.id,
    title:    post.title?.rendered || '',
    type:     typeTag || 'Article',
    category: tags.find(t => ['Branding','COM 360','Solutions Digitales'].includes(t)) || 'Branding',
    date:     post.date?.slice(0, 10),
    readTime: estimateReadTime(post.content?.rendered),
    image:    image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80',
    excerpt:  stripHtml(post.excerpt?.rendered),
    slug:     post.slug,
    content:  post.content?.rendered || '',
    link:     post.link,
  }
}

function estimateReadTime(html = '') {
  const words = stripHtml(html).split(/\s+/).length
  return `${Math.max(1, Math.round(words / 200))} min`
}

function mapWpCatToService(name = '') {
  const n = name.toLowerCase()
  if (n.includes('brand') || n.includes('logo') || n.includes('identit')) return 'Branding'
  if (n.includes('com') || n.includes('print') || n.includes('packag'))   return 'COM 360'
  if (n.includes('digit') || n.includes('web') || n.includes('ui'))       return 'Solutions Digitales'
  return 'Branding'
}

// ─── Fonctions publiques ──────────────────────────────────────────────────────

/** Articles portfolio (catégorie 17) */
export async function fetchPortfolio() {
  const posts = await wpFetch('/posts', {
    categories:  CAT_PORTFOLIO,
    per_page:    50,
    _embed:      true,
    orderby:     'date',
    order:       'desc',
  })
  return posts.map(toPortfolioItem)
}

/** Articles ressources (catégorie 18) */
export async function fetchRessources() {
  const posts = await wpFetch('/posts', {
    categories:  CAT_RESSOURCES,
    per_page:    20,
    _embed:      true,
    orderby:     'date',
    order:       'desc',
  })
  return posts.map(toRessource)
}

/** Tous les posts (pour blog général) */
export async function fetchPosts(params = {}) {
  const posts = await wpFetch('/posts', {
    per_page: 12,
    _embed:   true,
    orderby:  'date',
    order:    'desc',
    ...params,
  })
  return posts.map(toRessource)
}

/** Un post par slug */
export async function fetchPostBySlug(slug) {
  const posts = await wpFetch('/posts', { slug, _embed: true })
  return posts[0] || null
}

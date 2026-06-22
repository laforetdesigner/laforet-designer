/**
 * Hooks React Query pour WordPress
 * Utilise les données mockData en fallback si l'API est indisponible
 */
import { useQuery } from '@tanstack/react-query'
import { fetchPortfolio, fetchRessources, fetchSiteSettings } from '../lib/wordpress'
import { PORTFOLIO_ITEMS, RESSOURCES, STATS, TESTIMONIALS, CLIENT_LOGOS, SERVICES } from '../data/mockData'

/** Portfolio items depuis WP, fallback mock */
export function usePortfolio() {
  return useQuery({
    queryKey: ['wp-portfolio'],
    queryFn:  fetchPortfolio,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    placeholderData: PORTFOLIO_ITEMS,
  })
}

/** Ressources/articles depuis WP, fallback mock */
export function useRessources() {
  return useQuery({
    queryKey: ['wp-ressources'],
    queryFn:  fetchRessources,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    placeholderData: RESSOURCES,
  })
}

/** Paramètres du site (textes statiques) depuis WP, fallback mock */
export function useSiteSettings() {
  return useQuery({
    queryKey: ['wp-site-settings'],
    queryFn:  fetchSiteSettings,
    staleTime: 10 * 60 * 1000,  // 10 min cache
    retry: 1,
    // Fallback sur les données mockData si le plugin n'est pas installé
    placeholderData: {
      hero: {
        label:         'Agence de design créatif — Paris',
        title1:        'Laforet',
        title2:        'Designer.',
        description:   "Nous façonnons des identités visuelles, communications globales et expériences digitales pour les marques qui veulent s'imposer.",
        cta_primary:   'Démarrer un projet',
        cta_secondary: 'Voir les réalisations',
      },
      stats: STATS.map(s => ({ value: s.value, suffix: s.suffix, label: s.label })),
      clients: CLIENT_LOGOS,
      testimonials: TESTIMONIALS,
      contact: {
        email:   'hello@laforetdesigner.com',
        phone:   '+33 1 23 45 67 89',
        address: 'Paris, France',
      },
      social: { behance: '#', linkedin: '#', youtube: '#' },
      footer: { tagline: 'Agence de design créatif. Branding, communication 360 et solutions digitales pour les marques ambitieuses.' },
      services: Object.fromEntries(
        SERVICES.map(s => [s.slug, {
          tagline:     s.tagline,
          description: s.description,
          prestations: s.prestations,
          image:       '',
        }])
      ),
      media: { hero_image: '', og_image: '' },
    },
  })
}

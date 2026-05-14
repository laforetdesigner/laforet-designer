/**
 * Hooks React Query pour WordPress
 * Utilise les données mockData en fallback si l'API est indisponible
 */
import { useQuery } from '@tanstack/react-query'
import { fetchPortfolio, fetchRessources } from '../lib/wordpress'
import { PORTFOLIO_ITEMS, RESSOURCES } from '../data/mockData'

/** Portfolio items depuis WP, fallback mock */
export function usePortfolio() {
  return useQuery({
    queryKey: ['wp-portfolio'],
    queryFn:  fetchPortfolio,
    staleTime: 5 * 60 * 1000,   // 5 min cache
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

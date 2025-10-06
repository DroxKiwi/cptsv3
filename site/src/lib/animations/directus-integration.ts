import { useReglagesGeneraux } from '@/hooks/useDirectus'

// Hook simple pour récupérer l'état des animations depuis Directus
export function useDirectusAnimations() {
  const { reglages } = useReglagesGeneraux()
  
  return {
    // État des animations (on/off seulement)
    animationsEnabled: reglages?.animations_activees !== false // true par défaut
  }
}

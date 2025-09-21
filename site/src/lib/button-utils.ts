import { Bouton } from './directus'

// Fonction pour appliquer les styles de base d'un bouton Directus
export function getButtonStyles(bouton: Bouton | null | undefined) {
  if (!bouton) {
    return {}
  }

  return {
    backgroundColor: bouton.couleur_fond || undefined,
    color: bouton.couleur_texte || undefined,
    borderColor: bouton.couleur_bordure || undefined,
    border: bouton.couleur_bordure ? 
      `${bouton.epaisseur_bordures ? 
        (typeof bouton.epaisseur_bordures === 'string' && bouton.epaisseur_bordures.includes('px') ? 
          bouton.epaisseur_bordures : 
          `${bouton.epaisseur_bordures}px`) 
        : '1px'} solid ${bouton.couleur_bordure}` 
      : undefined,
  }
}

// Fonction pour gérer les effets de survol
export function getButtonHoverHandlers(bouton: Bouton | null | undefined) {
  if (!bouton) {
    return {
      onMouseEnter: () => {},
      onMouseLeave: () => {}
    }
  }

  return {
    onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.currentTarget
      
      switch (bouton.survol_type) {
        case 'agrandissement':
          target.style.transform = 'scale(1.05)'
          break
        case 'changement_de_couleur_de_fond':
          target.style.backgroundColor = '#1e40af' // Couleur plus foncée
          break
        case 'ombre_portee':
          target.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)'
          target.style.transform = 'translateY(-2px)'
          break
        case 'changement_opacite':
          target.style.opacity = '0.8'
          break
        case 'deplacement_vers_le_haut':
          target.style.transform = 'translateY(-2px)'
          break
        case 'rotation_legere':
          target.style.transform = 'rotate(2deg)'
          break
        default:
          target.style.transform = 'scale(1.05)'
      }
    },
    onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.currentTarget
      target.style.transform = 'none'
      target.style.backgroundColor = bouton.couleur_fond || ''
      target.style.opacity = '1'
      target.style.boxShadow = 'none'
    }
  }
}

// Fonction pour assombrir une couleur (pour les effets de survol)
export function darkenColor(color: string, percent: number): string {
  try {
    const hex = color.replace('#', '').trim()
    
    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
      return '#1e40af'
    }
    
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    
    const newR = Math.max(0, r - (r * percent / 100))
    const newG = Math.max(0, g - (g * percent / 100))
    const newB = Math.max(0, b - (b * percent / 100))
    
    return `#${Math.round(newR).toString(16).padStart(2, '0')}${Math.round(newG).toString(16).padStart(2, '0')}${Math.round(newB).toString(16).padStart(2, '0')}`
  } catch {
    return '#1e40af'
  }
}

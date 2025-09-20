import { ReglagesGeneraux } from './directus'

// Valeurs par défaut pour la typographie
const defaultTheme = {
  polices_ecriture_titre: 'Inter, sans-serif',
  polices_ecriture_sous_titre: 'Inter, sans-serif',
  polices_ecriture_corps: 'Inter, sans-serif',
  polices_ecriture_indication: 'Inter, sans-serif',
  taille_polices_titre: '2.5rem',
  taille_polices_sous_titre: '1.5rem',
  taille_polices_corps: '1rem',
  taille_polices_indication: '0.875rem',
  epaisseur_titre: '700',
  epaisseur_sous_titre: '600',
  epaisseur_corps: '400',
  epaisseur_indication: '500',
}

// Polices système disponibles
const systemFonts = [
  'Arial, sans-serif',
  'Helvetica, sans-serif',
  'Times New Roman, serif',
  'Courier New, monospace',
  'Verdana, sans-serif',
  'Georgia, serif',
  'Palatino, serif',
  'Garamond, serif',
  'Bookman, serif',
  'Comic Sans MS, cursive',
  'Trebuchet MS, sans-serif',
  'Arial Black, sans-serif',
  'Impact, fantasy',
  'Papyrus, fantasy',
  'Brush Script MT, cursive',
  'Inter, sans-serif',
  'Roboto, sans-serif',
  'Open Sans, sans-serif',
  'Lato, sans-serif',
  'Montserrat, sans-serif',
  'Poppins, sans-serif',
  'Source Sans Pro, sans-serif',
  'Nunito, sans-serif',
  'Ubuntu, sans-serif',
  'Playfair Display, serif',
  'Merriweather, serif',
  'Crimson Text, serif',
  'Lora, serif',
  'PT Serif, serif',
  'Source Serif Pro, serif',
  'Fira Code, monospace',
  'JetBrains Mono, monospace',
  'Source Code Pro, monospace',
  'Consolas, monospace',
  'Monaco, monospace',
  'Cooper Black, serif',
  'Menlo, monospace'
]

// Fonction pour convertir les tailles en responsive
function convertToResponsiveSize(value: string | number, maxMobile: number, maxTablet: number): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value
  
  // Si c'est déjà une valeur avec unité, on la garde
  if (typeof value === 'string' && (value.includes('rem') || value.includes('px') || value.includes('em'))) {
    return value
  }
  
  // Conversion responsive simple
  const mobileSize = Math.min(numValue, maxMobile)
  const tabletSize = Math.min(numValue, maxTablet)
  const desktopSize = numValue
  
  // Utilise clamp simple et efficace
  return `clamp(${mobileSize}px, ${mobileSize}px + (${desktopSize - mobileSize} * (100vw - 320px) / 880), ${desktopSize}px)`
}

// Fonction pour générer les variables CSS
export function generateThemeCSS(reglages: ReglagesGeneraux | null): string {
  const theme = {
    polices_ecriture_titre: reglages?.polices_ecriture_titre || defaultTheme.polices_ecriture_titre,
    polices_ecriture_sous_titre: reglages?.polices_ecriture_sous_titre || defaultTheme.polices_ecriture_sous_titre,
    polices_ecriture_corps: reglages?.polices_ecriture_corps || defaultTheme.polices_ecriture_corps,
    polices_ecriture_indication: reglages?.polices_ecriture_indication || defaultTheme.polices_ecriture_indication,
    taille_polices_titre: reglages?.taille_polices_titre || defaultTheme.taille_polices_titre,
    taille_polices_sous_titre: reglages?.taille_polices_sous_titre || defaultTheme.taille_polices_sous_titre,
    taille_polices_corps: reglages?.taille_polices_corps || defaultTheme.taille_polices_corps,
    taille_polices_indication: reglages?.taille_polices_indication || defaultTheme.taille_polices_indication,
    epaisseur_titre: reglages?.epaisseur_titre || defaultTheme.epaisseur_titre,
    epaisseur_sous_titre: reglages?.epaisseur_sous_titre || defaultTheme.epaisseur_sous_titre,
    epaisseur_corps: reglages?.epaisseur_corps || defaultTheme.epaisseur_corps,
    epaisseur_indication: reglages?.epaisseur_indication || defaultTheme.epaisseur_indication,
  }

  return `
    :root {
      
      /* Polices */
      --font-titre: ${theme.polices_ecriture_titre};
      --font-sous-titre: ${theme.polices_ecriture_sous_titre};
      --font-corps: ${theme.polices_ecriture_corps};
      --font-indication: ${theme.polices_ecriture_indication};
      
      /* Tailles responsive */
      --taille-titre: ${convertToResponsiveSize(theme.taille_polices_titre, 48, 72)};
      --taille-sous-titre: ${convertToResponsiveSize(theme.taille_polices_sous_titre, 24, 32)};
      --taille-corps: ${convertToResponsiveSize(theme.taille_polices_corps, 14, 16)};
      --taille-indication: ${convertToResponsiveSize(theme.taille_polices_indication, 12, 14)};
      
      /* Épaisseurs */
      --epaisseur-titre: ${theme.epaisseur_titre};
      --epaisseur-sous-titre: ${theme.epaisseur_sous_titre};
      --epaisseur-corps: ${theme.epaisseur_corps};
      --epaisseur-indication: ${theme.epaisseur_indication};
    }
    
    /* Media queries pour forcer les tailles sur mobile */
    @media (max-width: 768px) {
      :root {
        --taille-titre: ${Math.min(typeof theme.taille_polices_titre === 'string' ? parseFloat(theme.taille_polices_titre) : theme.taille_polices_titre, 48)}px;
        --taille-sous-titre: ${Math.min(typeof theme.taille_polices_sous_titre === 'string' ? parseFloat(theme.taille_polices_sous_titre) : theme.taille_polices_sous_titre, 24)}px;
        --taille-corps: ${Math.min(typeof theme.taille_polices_corps === 'string' ? parseFloat(theme.taille_polices_corps) : theme.taille_polices_corps, 14)}px;
        --taille-indication: ${Math.min(typeof theme.taille_polices_indication === 'string' ? parseFloat(theme.taille_polices_indication) : theme.taille_polices_indication, 12)}px;
      }
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
      :root {
        --taille-titre: ${Math.min(typeof theme.taille_polices_titre === 'string' ? parseFloat(theme.taille_polices_titre) : theme.taille_polices_titre, 72)}px;
        --taille-sous-titre: ${Math.min(typeof theme.taille_polices_sous_titre === 'string' ? parseFloat(theme.taille_polices_sous_titre) : theme.taille_polices_sous_titre, 32)}px;
        --taille-corps: ${Math.min(typeof theme.taille_polices_corps === 'string' ? parseFloat(theme.taille_polices_corps) : theme.taille_polices_corps, 16)}px;
        --taille-indication: ${Math.min(typeof theme.taille_polices_indication === 'string' ? parseFloat(theme.taille_polices_indication) : theme.taille_polices_indication, 14)}px;
      }
    }
    
    /* Classes pour appliquer les styles */
    .font-titre-custom {
      font-family: var(--font-titre) !important;
      font-size: var(--taille-titre) !important;
      font-weight: var(--epaisseur-titre) !important;
    }
    
    .font-sous-titre-custom {
      font-family: var(--font-sous-titre) !important;
      font-size: var(--taille-sous-titre) !important;
      font-weight: var(--epaisseur-sous-titre) !important;
    }
    
    .font-corps-custom {
      font-family: var(--font-corps) !important;
      font-size: var(--taille-corps) !important;
      font-weight: var(--epaisseur-corps) !important;
    }
    
    .font-indication-custom {
      font-family: var(--font-indication) !important;
      font-size: var(--taille-indication) !important;
      font-weight: var(--epaisseur-indication) !important;
    }
    
    /* Classes pour les nouvelles couleurs */
    .bg-tertiary { background-color: var(--tertiary) !important; }
    .bg-quaternary { background-color: var(--quaternary) !important; }
    .bg-quinary { background-color: var(--quinary) !important; }
    .bg-senary { background-color: var(--senary) !important; }
    
    .text-tertiary { color: var(--tertiary) !important; }
    .text-quaternary { color: var(--quaternary) !important; }
    .text-quinary { color: var(--quinary) !important; }
    .text-senary { color: var(--senary) !important; }
    
    .border-tertiary { border-color: var(--tertiary) !important; }
    .border-quaternary { border-color: var(--quaternary) !important; }
    .border-quinary { border-color: var(--quinary) !important; }
    .border-senary { border-color: var(--senary) !important; }
  `
}

// Fonction pour obtenir la couleur de texte avec priorité
export function getTextColor(
  customColor: string | undefined, 
  reglages: ReglagesGeneraux | null
): string {
  // 1. Couleur personnalisée (priorité la plus haute)
  if (customColor) {
    return customColor
  }
  
  // 2. Couleur par défaut (gris foncé)
  return '#374151'
}

// Classes CSS utilitaires
export const themeClasses = {
  titre: 'font-titre-custom',
  sousTitre: 'font-sous-titre-custom',
  corps: 'font-corps-custom',
  indication: 'font-indication-custom',
  // Nouvelles couleurs
  tertiary: 'bg-tertiary',
  quaternary: 'bg-quaternary',
  quinary: 'bg-quinary',
  senary: 'bg-senary',
  textTertiary: 'text-tertiary',
  textQuaternary: 'text-quaternary',
  textQuinary: 'text-quinary',
  textSenary: 'text-senary',
  borderTertiary: 'border-tertiary',
  borderQuaternary: 'border-quaternary',
  borderQuinary: 'border-quinary',
  borderSenary: 'border-senary',
}

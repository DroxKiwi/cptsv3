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
  couleur_titre: '#1f2937',
  couleur_sous_titre: '#4b5563',
  couleur_corps: '#374151',
  couleur_indication: '#6b7280',
  couleur_primaire: '#f8fafc',      // Fond clair (blanc cassé)
  couleur_secondaire: '#f1f5f9',    // Fond alternatif (gris très clair)
  couleur_tertiaire: '#e2e8f0',     // Bordures (gris clair)
  epaisseur_bordures: '1px',        // Épaisseur des bordures (déjà avec px)
  couleur_ombrage: '#000000',       // Couleur de l'ombre (noir)
  epaisseur_ombrage: '4px',         // Épaisseur de l'ombre (déjà avec px)
  ombrage: true,                     // Activer les ombres
}

// Polices système disponibles (pour référence future)
// const systemFonts = [
//   'Arial, sans-serif',
//   'Helvetica, sans-serif',
//   'Times New Roman, serif',
//   'Courier New, monospace',
//   'Verdana, sans-serif',
//   'Georgia, serif',
//   'Palatino, serif',
//   'Garamond, serif',
//   'Bookman, serif',
//   'Comic Sans MS, cursive',
//   'Trebuchet MS, sans-serif',
//   'Arial Black, sans-serif',
//   'Impact, fantasy',
//   'Papyrus, fantasy',
//   'Brush Script MT, cursive',
//   'Inter, sans-serif',
//   'Roboto, sans-serif',
//   'Open Sans, sans-serif',
//   'Lato, sans-serif',
//   'Montserrat, sans-serif',
//   'Poppins, sans-serif',
//   'Source Sans Pro, sans-serif',
//   'Nunito, sans-serif',
//   'Ubuntu, sans-serif',
//   'Playfair Display, serif',
//   'Merriweather, serif',
//   'Crimson Text, serif',
//   'Lora, serif',
//   'PT Serif, serif',
//   'Source Serif Pro, serif',
//   'Fira Code, monospace',
//   'JetBrains Mono, monospace',
//   'Source Code Pro, monospace',
//   'Consolas, monospace',
//   'Monaco, monospace',
//   'Cooper Black, serif',
//   'Menlo, monospace'
// ]

// Fonction pour convertir les tailles en responsive
function convertToResponsiveSize(value: string | number, maxMobile: number): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value
  
  // Si c'est déjà une valeur avec unité, on la garde
  if (typeof value === 'string' && (value.includes('rem') || value.includes('px') || value.includes('em'))) {
    return value
  }
  
  // Conversion responsive simple
  const mobileSize = Math.min(numValue, maxMobile)
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
    couleur_titre: reglages?.couleur_titre || defaultTheme.couleur_titre,
    couleur_sous_titre: reglages?.couleur_sous_titre || defaultTheme.couleur_sous_titre,
    couleur_corps: reglages?.couleur_corps || defaultTheme.couleur_corps,
    couleur_indication: reglages?.couleur_indication || defaultTheme.couleur_indication,
    couleur_primaire: reglages?.couleur_primaire || defaultTheme.couleur_primaire,
    couleur_secondaire: reglages?.couleur_secondaire || defaultTheme.couleur_secondaire,
    couleur_tertiaire: reglages?.couleur_tertiaire || defaultTheme.couleur_tertiaire,
    epaisseur_bordures: reglages?.epaisseur_bordures ? 
      (typeof reglages.epaisseur_bordures === 'string' && reglages.epaisseur_bordures.includes('px') ? 
        reglages.epaisseur_bordures : 
        `${reglages.epaisseur_bordures}px`) 
      : defaultTheme.epaisseur_bordures,
    couleur_ombrage: reglages?.couleur_ombrage || defaultTheme.couleur_ombrage,
    epaisseur_ombrage: reglages?.epaisseur_ombrage ? 
      (typeof reglages.epaisseur_ombrage === 'string' && reglages.epaisseur_ombrage.includes('px') ? 
        reglages.epaisseur_ombrage : 
        `${reglages.epaisseur_ombrage}px`) 
      : defaultTheme.epaisseur_ombrage,
    ombrage: reglages?.ombrage !== undefined ? reglages.ombrage : defaultTheme.ombrage,
  }

  return `
    :root {
      
      /* Polices */
      --font-titre: ${theme.polices_ecriture_titre};
      --font-sous-titre: ${theme.polices_ecriture_sous_titre};
      --font-corps: ${theme.polices_ecriture_corps};
      --font-indication: ${theme.polices_ecriture_indication};
      
      /* Tailles responsive */
      --taille-titre: ${convertToResponsiveSize(theme.taille_polices_titre, 48)};
      --taille-sous-titre: ${convertToResponsiveSize(theme.taille_polices_sous_titre, 24)};
      --taille-corps: ${convertToResponsiveSize(theme.taille_polices_corps, 14)};
      --taille-indication: ${convertToResponsiveSize(theme.taille_polices_indication, 12)};
      
      /* Épaisseurs */
      --epaisseur-titre: ${theme.epaisseur_titre};
      --epaisseur-sous-titre: ${theme.epaisseur_sous_titre};
      --epaisseur-corps: ${theme.epaisseur_corps};
      --epaisseur-indication: ${theme.epaisseur_indication};
      
      /* Couleurs de texte */
      --couleur-titre: ${theme.couleur_titre};
      --couleur-sous-titre: ${theme.couleur_sous_titre};
      --couleur-corps: ${theme.couleur_corps};
      --couleur-indication: ${theme.couleur_indication};
      
      /* Couleurs primaires */
      --couleur-primaire: ${theme.couleur_primaire};
      --couleur-secondaire: ${theme.couleur_secondaire};
      --couleur-tertiaire: ${theme.couleur_tertiaire};
      
      /* Épaisseur des bordures */
      --epaisseur-bordures: ${theme.epaisseur_bordures};
      
      /* Ombres */
      --couleur-ombrage: ${theme.couleur_ombrage};
      --epaisseur-ombrage: ${theme.epaisseur_ombrage};
      --ombrage-actif: ${theme.ombrage ? '1' : '0'};
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
      color: var(--couleur-titre) !important;
    }
    
    .font-sous-titre-custom {
      font-family: var(--font-sous-titre) !important;
      font-size: var(--taille-sous-titre) !important;
      font-weight: var(--epaisseur-sous-titre) !important;
      color: var(--couleur-sous-titre) !important;
    }
    
    .font-corps-custom {
      font-family: var(--font-corps) !important;
      font-size: var(--taille-corps) !important;
      font-weight: var(--epaisseur-corps) !important;
      color: var(--couleur-corps) !important;
    }
    
    .font-indication-custom {
      font-family: var(--font-indication) !important;
      font-size: var(--taille-indication) !important;
      font-weight: var(--epaisseur-indication) !important;
      color: var(--couleur-indication) !important;
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
    
    /* Classes pour les couleurs de texte */
    .text-titre-custom { color: var(--couleur-titre) !important; }
    .text-sous-titre-custom { color: var(--couleur-sous-titre) !important; }
    .text-corps-custom { color: var(--couleur-corps) !important; }
    .text-indication-custom { color: var(--couleur-indication) !important; }
    
    /* Classes pour les couleurs primaires */
    .bg-primaire { background-color: var(--couleur-primaire) !important; }
    .bg-secondaire { background-color: var(--couleur-secondaire) !important; }
    .bg-tertiaire { background-color: var(--couleur-tertiaire) !important; }
    
    .text-primaire { color: var(--couleur-primaire) !important; }
    .text-secondaire { color: var(--couleur-secondaire) !important; }
    .text-tertiaire { color: var(--couleur-tertiaire) !important; }
    
    .border-primaire { border-color: var(--couleur-primaire) !important; }
    .border-secondaire { border-color: var(--couleur-secondaire) !important; }
    .border-tertiaire { border-color: var(--couleur-tertiaire) !important; }
    
    /* Classes pour les sections alternées */
    .section-primaire { 
      background-color: var(--couleur-primaire) !important; 
    }
    .section-secondaire { 
      background-color: var(--couleur-secondaire) !important; 
    }
    
    /* Padding dynamique pour les sections avec ombres */
    .ombrage-actif .section-primaire,
    .ombrage-actif .section-secondaire {
      padding-left: calc(16px + var(--epaisseur-ombrage)) !important;
      padding-right: calc(16px + var(--epaisseur-ombrage)) !important;
    }
    
    /* Classes pour les composants avec bordures */
    .component-bordered {
      border: var(--epaisseur-bordures) solid var(--couleur-tertiaire) !important;
      border-radius: 8px !important;
    }
    
    .card-bordered {
      border: var(--epaisseur-bordures) solid var(--couleur-tertiaire) !important;
      border-radius: 12px !important;
    }
    
    /* Ombres conditionnelles */
    .ombrage-actif .component-bordered {
      box-shadow: 0 1px var(--epaisseur-ombrage) 0 var(--couleur-ombrage) !important;
    }
    
    .ombrage-actif .card-bordered {
      box-shadow: 0 2px var(--epaisseur-ombrage) 0 var(--couleur-ombrage) !important;
    }
    
    .ombrage-actif button {
      box-shadow: 0 2px var(--epaisseur-ombrage) 0 var(--couleur-ombrage) !important;
    }
    
    /* Les ombres pour articles et événements sont déjà gérées par .card-bordered */
    
    /* Conteneurs pour éviter la coupure des ombres */
    .articles-container,
    .evenements-container,
    .partenaires-container {
      padding: var(--epaisseur-ombrage) !important;
      margin: calc(-1 * var(--epaisseur-ombrage)) !important;
    }
    
    /* Padding dynamique basé sur l'épaisseur de l'ombre */
    .ombrage-actif .articles-container,
    .ombrage-actif .evenements-container,
    .ombrage-actif .partenaires-container {
      padding: calc(var(--epaisseur-ombrage) + 8px) !important;
      margin: calc(-1 * (var(--epaisseur-ombrage) + 8px)) !important;
    }
    
    /* Padding fixe en haut des cartes */
    .ombrage-actif .articles-container,
    .ombrage-actif .evenements-container,
    .ombrage-actif .partenaires-container {
      padding-top: 50px !important;
    }
    
    /* Padding supplémentaire pour les conteneurs de scroll horizontal */
    .ombrage-actif .articles-container .overflow-x-auto,
    .ombrage-actif .evenements-container .overflow-x-auto,
    .ombrage-actif .partenaires-container .overflow-x-auto {
      padding-left: var(--epaisseur-ombrage) !important;
      padding-right: var(--epaisseur-ombrage) !important;
      padding-top: 50px !important;
    }
    
    /* Padding pour les conteneurs de scroll horizontal même sans classe overflow-x-auto */
    .ombrage-actif .articles-container > div,
    .ombrage-actif .evenements-container > div,
    .ombrage-actif .partenaires-container > div {
      padding-top: 50px !important;
    }
    
    /* Padding dynamique pour les grilles de cartes */
    .ombrage-actif .grid {
      gap: calc(24px + var(--epaisseur-ombrage)) !important;
    }
    
    /* Padding dynamique pour les conteneurs flex */
    .ombrage-actif .flex {
      gap: calc(16px + var(--epaisseur-ombrage)) !important;
    }
    
    /* Fix simple pour le header sticky */
    header {
      position: sticky !important;
      top: 0 !important;
      z-index: 9999 !important;
    }
    
    .force-sticky {
      position: sticky !important;
      top: 0 !important;
      z-index: 9999 !important;
    }
    
    /* CSS avec spécificité maximale pour forcer le sticky */
    html body div header.force-sticky,
    html body div div header.force-sticky,
    html body div div div header.force-sticky {
      position: sticky !important;
      top: 0 !important;
      z-index: 9999 !important;
    }
    
    /* Override de tous les fixed avec spécificité maximale */
    html body div header[style*="position: fixed"],
    html body div header[style*="position:fixed"],
    html body div div header[style*="position: fixed"],
    html body div div header[style*="position:fixed"] {
      position: sticky !important;
      top: 0 !important;
    }
    
    /* FORCER LE STICKY AVEC TOUS LES SÉLECTEURS POSSIBLES */
    header,
    header[class],
    header[ref],
    header[style],
    header.force-sticky,
    header[class*="header"],
    header[class*="Header"],
    *[role="banner"],
    body > header,
    body > div > header,
    body > div > div > header,
    body > div > div > div > header,
    html body header,
    html body div header,
    html body div div header,
    html body div div div header {
      position: sticky !important;
      top: 0 !important;
      z-index: 9999 !important;
    }
    
    /* CSS FINAL POUR FORCER LE STICKY - S'EXÉCUTE EN DERNIER */
    @media screen {
      header {
        position: sticky !important;
        top: 0 !important;
        z-index: 9999 !important;
      }
    }
    
    /* CSS avec !important sur tout */
    * {
      --header-position: sticky !important;
    }
    
    header {
      position: var(--header-position) !important;
      top: 0 !important;
      z-index: 9999 !important;
    }
    
    /* FORCER LE STICKY AVEC UNE CLASSE SPÉCIFIQUE */
    .header-sticky {
      position: sticky !important;
      top: 0 !important;
      z-index: 9999 !important;
    }
    
    /* Override de tous les fixed avec une classe spécifique */
    .header-sticky[style*="position: fixed"],
    .header-sticky[style*="position:fixed"] {
      position: sticky !important;
      top: 0 !important;
    }
  `
}

// Fonction pour obtenir la couleur de texte avec priorité
export function getTextColor(
  customColor: string | undefined
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
  // Couleurs de texte
  textTitre: 'text-titre-custom',
  textSousTitre: 'text-sous-titre-custom',
  textCorps: 'text-corps-custom',
  textIndication: 'text-indication-custom',
  // Couleurs primaires
  primaire: 'bg-primaire',
  secondaire: 'bg-secondaire',
  tertiaire: 'bg-tertiaire',
  textPrimaire: 'text-primaire',
  textSecondaire: 'text-secondaire',
  textTertiaire: 'text-tertiaire',
  borderPrimaire: 'border-primaire',
  borderSecondaire: 'border-secondaire',
  borderTertiaire: 'border-tertiaire',
  // Classes pour les sections et composants
  sectionPrimaire: 'section-primaire',
  sectionSecondaire: 'section-secondaire',
  componentBordered: 'component-bordered',
  cardBordered: 'card-bordered',
  // Épaisseur des bordures
  epaisseurBordures: 'var(--epaisseur-bordures)',
  // Ombres
  couleurOmbrage: 'var(--couleur-ombrage)',
  epaisseurOmbrage: 'var(--epaisseur-ombrage)',
  ombrageActif: 'var(--ombrage-actif)',
  // Classes pour les conteneurs
  articlesContainer: 'articles-container',
  evenementsContainer: 'evenements-container',
  partenairesContainer: 'partenaires-container',
  // Nouvelles couleurs (legacy)
  quaternary: 'bg-quaternary',
  quinary: 'bg-quinary',
  senary: 'bg-senary',
  textQuaternary: 'text-quaternary',
  textQuinary: 'text-quinary',
  textSenary: 'text-senary',
  borderQuaternary: 'border-quaternary',
  borderQuinary: 'border-quinary',
  borderSenary: 'border-senary',
}

'use client'

import { useEffect } from 'react'
import { useReglagesGeneraux } from '@/hooks/useDirectus'
import { generateThemeCSS } from '@/lib/theme'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { reglages, loading } = useReglagesGeneraux()

      useEffect(() => {
        if (!loading && reglages) {
          // Génère le CSS dynamique
          const themeCSS = generateThemeCSS(reglages)
          
          // Trouve ou crée la balise style pour le thème
          let styleElement = document.getElementById('dynamic-theme')
          if (!styleElement) {
            styleElement = document.createElement('style')
            styleElement.id = 'dynamic-theme'
            document.head.appendChild(styleElement)
          }
          
          // Applique le CSS
          styleElement.textContent = themeCSS
          
          // Gère la classe ombrage-actif sur le body
          if (reglages.ombrage) {
            document.body.classList.add('ombrage-actif')
          } else {
            document.body.classList.remove('ombrage-actif')
          }
        }
      }, [reglages, loading])

  return <>{children}</>
}

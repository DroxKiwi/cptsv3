'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef } from 'react'

interface RichContentProps {
  content: string
  className?: string
  style?: React.CSSProperties
}

// Fonction pour extraire l'ID YouTube d'une URL
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  
  return null
}

// Fonction pour convertir les liens YouTube en iframes
function convertYouTubeLinks(html: string): string {
  // Pattern pour détecter les liens YouTube (avec ou sans balise <a>)
  const youtubePattern = /(?:<a[^>]*href=["']([^"']*youtube[^"']*)["'][^>]*>)?(https?:\/\/[^\s<>"]*youtube[^\s<>"]*)(?:<\/a>)?/gi
  
  return html.replace(youtubePattern, (match, href, url) => {
    const youtubeId = extractYouTubeId(url)
    if (!youtubeId) return match
    
    // Créer l'iframe YouTube responsive
    return `
      <div class="youtube-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin: 1rem 0; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <iframe 
          src="https://www.youtube.com/embed/${youtubeId}" 
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
    `
  })
}

export function RichContent({ content, className, style }: RichContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      // Améliorer les tableaux générés par l'éditeur
      const tables = contentRef.current.querySelectorAll('table')
      tables.forEach(table => {
        // Ajouter des classes Tailwind pour un meilleur style
        table.classList.add('w-full', 'border-collapse', 'mb-4', 'shadow-sm')
        
        // Styliser les cellules
        const cells = table.querySelectorAll('td, th')
        cells.forEach(cell => {
          cell.classList.add('border', 'border-gray-300', 'px-3', 'py-2', 'text-left')
        })
        
        // Styliser les en-têtes
        const headers = table.querySelectorAll('th')
        headers.forEach(header => {
          header.classList.add('bg-gray-50', 'font-semibold')
        })
      })

      // Améliorer les blocs de code
      const codeBlocks = contentRef.current.querySelectorAll('code')
      codeBlocks.forEach(code => {
        code.classList.add('bg-gray-100', 'px-2', 'py-1', 'rounded', 'text-sm', 'font-mono')
      })
    }
  }, [content])

  if (!content) return null

  // Convertir les liens YouTube en lecteurs intégrés
  const processedContent = convertYouTubeLinks(content)

  return (
    <div
      ref={contentRef}
      className={cn(
        // Styles de base pour le contenu riche
        "prose prose-lg max-w-none",
        // Styles pour les titres
        "prose-h1:text-2xl prose-h1:font-bold prose-h1:mb-4 prose-h1:mt-8",
        "prose-h2:text-xl prose-h2:font-semibold prose-h2:mb-3 prose-h2:mt-6",
        "prose-h3:text-lg prose-h3:font-semibold prose-h3:mb-2 prose-h3:mt-4",
        // Styles pour les paragraphes
        "prose-p:mb-4 prose-p:leading-relaxed",
        // Styles pour les listes
        "prose-ul:mb-4 prose-ul:pl-6",
        "prose-ol:mb-4 prose-ol:pl-6",
        "prose-li:mb-2",
        // Styles pour les liens
        "prose-a:text-primary prose-a:underline prose-a:decoration-primary/50 hover:prose-a:decoration-primary",
        // Styles pour les images
        "prose-img:rounded-lg prose-img:shadow-md prose-img:mb-4",
        // Styles pour les citations
        "prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:mb-4",
        // Styles pour le code
        "prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm",
        "prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto",
        // Styles pour les tableaux
        "prose-table:border-collapse prose-table:w-full prose-table:mb-4",
        "prose-th:border prose-th:border-border prose-th:px-3 prose-th:py-2 prose-th:bg-muted prose-th:text-left prose-th:font-semibold",
        "prose-td:border prose-td:border-border prose-td:px-3 prose-td:py-2",
        // Styles pour les séparateurs
        "prose-hr:border-border prose-hr:my-8",
        // Styles pour les conteneurs YouTube
        "youtube-container",
        className
      )}
      dangerouslySetInnerHTML={{ __html: processedContent }}
      style={style}
    />
  )
}

import { cn } from "@/lib/utils"

interface RichTextProps {
  content: string
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function RichText({ content, className, as: Component = "div" }: RichTextProps) {
  // Fonction pour nettoyer et formater le HTML
  const formatContent = (html: string) => {
    // Supprime tous les styles inline pour laisser place aux CSS des settings
    let cleanedHtml = html
      .replace(/\s*style\s*=\s*"[^"]*"/gi, '') // Supprime style="..."
      .replace(/\s*style\s*=\s*'[^']*'/gi, '') // Supprime style='...'
    
    // Applique les classes CSS des settings
    cleanedHtml = cleanedHtml
      .replace(/<p>/g, '<p class="mb-4">')
      .replace(/<h1>/g, '<h1 class="mb-4">')
      .replace(/<h2>/g, '<h2 class="mb-3">')
      .replace(/<h3>/g, '<h3 class="mb-2">')
      .replace(/<strong>/g, '<strong>')
      .replace(/<em>/g, '<em>')
      .replace(/<ul>/g, '<ul class="list-disc list-inside mb-4">')
      .replace(/<ol>/g, '<ol class="list-decimal list-inside mb-4">')
      .replace(/<li>/g, '<li class="mb-1">')
    
    return cleanedHtml
  }

  return (
    <Component
      className={cn("prose prose-sm max-w-none", className)}
      dangerouslySetInnerHTML={{ __html: formatContent(content) }}
    />
  )
}

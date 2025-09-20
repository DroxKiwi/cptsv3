import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TagBadgeProps {
  nom: string
  couleur?: string
  description?: string
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline" | "secondary" | "destructive"
  showDescription?: boolean
}

export function TagBadge({ 
  nom, 
  couleur, 
  description, 
  className,
  size = "md",
  variant = "outline",
  showDescription = false
}: TagBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  }

  // Styles personnalisés si une couleur est définie
  const customStyles = couleur ? {
    backgroundColor: couleur,
    color: getContrastColor(couleur),
    borderColor: couleur
  } : {}

  return (
    <Badge
      variant={variant}
      className={cn(
        "inline-flex items-center rounded-full font-medium transition-all duration-200 hover:scale-105",
        sizeClasses[size],
        className
      )}
      style={customStyles}
      title={description}
    >
      {nom}
      {showDescription && description && (
        <span className="ml-1 text-xs opacity-75">
          ({description})
        </span>
      )}
    </Badge>
  )
}

// Fonction pour déterminer la couleur du texte selon la couleur de fond
function getContrastColor(hexColor: string): string {
  // Supprime le # si présent
  const hex = hexColor.replace('#', '')
  
  // Convertit en RGB
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  
  // Calcule la luminosité
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  
  // Retourne blanc ou noir selon la luminosité
  return brightness > 128 ? '#000000' : '#ffffff'
}

import { TagBadge } from "./tag-badge"
import { cn } from "@/lib/utils"

interface Tag {
  id: number
  nom: string
  couleur?: string
  description?: string
}

interface TagListProps {
  tags: Tag[]
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline" | "secondary" | "destructive"
  showDescription?: boolean
  maxTags?: number
  showCount?: boolean
}

export function TagList({ 
  tags, 
  className,
  size = "md",
  variant = "outline",
  showDescription = false,
  maxTags,
  showCount = false
}: TagListProps) {
  // Limite le nombre de tags affichés si maxTags est défini
  const displayTags = maxTags ? tags.slice(0, maxTags) : tags
  const remainingCount = maxTags && tags.length > maxTags ? tags.length - maxTags : 0

  if (tags.length === 0) {
    return (
      <div className={cn("text-gray-500 text-sm italic", className)}>
        Aucun tag
      </div>
    )
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {displayTags.map((tag) => (
        <TagBadge
          key={tag.id}
          nom={tag.nom}
          couleur={tag.couleur}
          description={tag.description}
          size={size}
          variant={variant}
          showDescription={showDescription}
        />
      ))}
      
      {remainingCount > 0 && (
        <TagBadge
          nom={`+${remainingCount}`}
          size={size}
          variant="secondary"
          className="opacity-60"
        />
      )}
      
      {showCount && (
        <span className="text-xs text-gray-500 self-center">
          ({tags.length} tag{tags.length > 1 ? 's' : ''})
        </span>
      )}
    </div>
  )
}

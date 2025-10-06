import { Metadata } from 'next'
import { directusClient } from '@/lib/directus'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const articleId = parseInt(id)
  
  try {
    const article = await directusClient.getArticle(articleId)
    
    if (!article) {
      return {
        title: 'Article non trouvé | CPTS des Mauges',
        description: 'L\'article que vous recherchez n\'existe pas.',
      }
    }

    return {
      title: `${article.titre} | CPTS des Mauges`,
      description: article.resume || article.excerpt || `Découvrez l'article "${article.titre}" sur le site de la CPTS des Mauges.`,
      openGraph: {
        title: article.titre,
        description: article.resume || article.excerpt || '',
        type: 'article',
        publishedTime: article.date_created,
        modifiedTime: article.date_updated,
        authors: ['CPTS des Mauges'],
        images: article.featured_image || article.image ? [
          {
            url: `${process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'}/assets/${(article.featured_image || article.image)?.id}`,
            width: 1200,
            height: 630,
            alt: article.titre,
          }
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.titre,
        description: article.resume || article.excerpt || '',
        images: article.featured_image || article.image ? [`${process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'}/assets/${(article.featured_image || article.image)?.id}`] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Article non trouvé | CPTS des Mauges',
      description: 'L\'article que vous recherchez n\'existe pas.',
    }
  }
}

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

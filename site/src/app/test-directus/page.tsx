'use client'

import { useArticles, useTags } from '@/hooks/useDirectus'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TagBadge } from '@/components/custom-ui/tag-badge'
import { TagList } from '@/components/custom-ui/tag-list'

export default function TestDirectusPage() {
  const { articles, loading: articlesLoading, error: articlesError } = useArticles()
  const { tags, loading: tagsLoading, error: tagsError } = useTags()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Test Directus - Récupération des données
        </h1>

        {/* Articles */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Articles ({articles.length})</CardTitle>
            <CardDescription>
              Liste des articles récupérés depuis Directus
            </CardDescription>
          </CardHeader>
          <CardContent>
            {articlesLoading && <p className="text-gray-500">Chargement...</p>}
            {articlesError && <p className="text-red-500">Erreur: {articlesError}</p>}
            {articles.length === 0 && !articlesLoading && (
              <p className="text-gray-500">Aucun article trouvé</p>
            )}
            {articles.map((article) => (
              <div key={article.id} className="border-b border-gray-200 py-4 last:border-b-0">
                <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{article.excerpt}</p>
                <div className="mb-2">
                  <TagList 
                    tags={article.tags || []} 
                    size="sm" 
                    variant="secondary"
                    showCount={true}
                  />
                </div>
                <p className="text-gray-400 text-xs">
                  Créé le: {new Date(article.date_created).toLocaleDateString('fr-FR')}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tags */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tags ({tags.length})</CardTitle>
            <CardDescription>
              Liste des tags disponibles
            </CardDescription>
          </CardHeader>
          <CardContent>
            {tagsLoading && <p className="text-gray-500">Chargement...</p>}
            {tagsError && <p className="text-red-500">Erreur: {tagsError}</p>}
            {tags.length === 0 && !tagsLoading && (
              <p className="text-gray-500">Aucun tag trouvé</p>
            )}
            <TagList 
              tags={tags} 
              size="md" 
              variant="outline"
              showDescription={true}
              showCount={true}
            />
          </CardContent>
        </Card>

        {/* Informations de debug */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-yellow-800">Informations de debug</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-700 text-sm">
              URL Directus: {process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'}
            </p>
            <p className="text-yellow-700 text-sm">
              Si tu vois des erreurs, vérifie que Directus est démarré et que les collections existent.
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button asChild>
            <a href="/">Retour à l'accueil</a>
          </Button>
        </div>
      </div>
    </div>
  )
}


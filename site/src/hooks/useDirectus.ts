'use client'

import { useState, useEffect } from 'react'
import { directusClient, type Article, type Tag, type ReglagesGeneraux, type Accueil, type Logo, type Entete, type Projet, type Mission } from '@/lib/directus'

// Hook pour les articles
export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        const data = await directusClient.getArticles()
        setArticles(data as Article[])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des articles')
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  return { articles, loading, error }
}

// Hook pour un article spécifique
export function useArticle(id: number) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true)
        const data = await directusClient.getArticle(id)
        setArticle(data as Article)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement de l\'article')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchArticle()
    }
  }, [id])

  return { article, loading, error }
}

// Hook pour les tags
export function useTags() {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true)
        const data = await directusClient.getTags()
        setTags(data as Tag[])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des tags')
      } finally {
        setLoading(false)
      }
    }

    fetchTags()
  }, [])

  return { tags, loading, error }
}

// Hook pour les réglages généraux
export function useReglagesGeneraux() {
  const [reglages, setReglages] = useState<ReglagesGeneraux | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

      useEffect(() => {
        const fetchReglages = async () => {
          try {
            setLoading(true)
            const data = await directusClient.getReglagesGeneraux()
            setReglages(data)
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur lors du chargement des réglages généraux')
          } finally {
            setLoading(false)
          }
        }

        fetchReglages()
      }, [])

  return { reglages, loading, error }
}

// Hook pour la page d'accueil
export function useAccueil() {
  const [accueil, setAccueil] = useState<Accueil | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAccueil = async () => {
      try {
        setLoading(true)
        const data = await directusClient.getAccueil()
        setAccueil(data as Accueil)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement de la page d\'accueil')
      } finally {
        setLoading(false)
      }
    }

    fetchAccueil()
  }, [])

  return { accueil, loading, error }
}

// Hook pour le logo
export function useLogo() {
  const [logo, setLogo] = useState<Logo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        setLoading(true)
        const data = await directusClient.getLogo()
        setLogo(data as Logo)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement du logo')
      } finally {
        setLoading(false)
      }
    }

    fetchLogo()
  }, [])

  return { logo, loading, error }
}

// Hook pour l'entête
export function useEntete() {
  const [entete, setEntete] = useState<Entete | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEntete = async () => {
      try {
        setLoading(true)
        const data = await directusClient.getEntete()
        setEntete(data as Entete)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement de l\'entête')
      } finally {
        setLoading(false)
      }
    }

    fetchEntete()
  }, [])

  return { entete, loading, error }
}

// Hook pour les projets
export function useProjets() {
  const [projets, setProjets] = useState<Projet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

      useEffect(() => {
        const fetchProjets = async () => {
          try {
            setLoading(true)
            const data = await directusClient.getProjets()
            setProjets(data as Projet[])
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur lors du chargement des projets')
          } finally {
            setLoading(false)
          }
        }

        fetchProjets()
      }, [])

  return { projets, loading, error }
}

// Hook pour toutes les missions (page d'accueil)
export function useMissions() {
  const [missions, setMissions] = useState<Mission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        setLoading(true)
        const data = await directusClient.getAllMissions()
        setMissions(data as Mission[])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des missions')
      } finally {
        setLoading(false)
      }
    }

    fetchMissions()
  }, [])

  return { missions, loading, error }
}

// Hook pour les articles à la une
export function useArticlesALaUne() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        const data = await directusClient.getArticlesALaUne()
        setArticles(data as Article[])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des articles à la une')
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  return { articles, loading, error }
}

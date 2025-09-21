'use client'

import { useState, useEffect } from 'react'
import { directusClient, type Article, type Tag, type ReglagesGeneraux, type Accueil, type Logo, type Entete, type Projet, type Mission, type Evenement, type Bouton, type Partenaire, type PiedDePage, type ReseauSocial, type ChiffresCles } from '@/lib/directus'

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

// Hook pour les événements
export function useEvenements() {
  const [evenements, setEvenements] = useState<Evenement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvenements = async () => {
      try {
        setLoading(true)
        const data = await directusClient.getEvenements()
        setEvenements(data as Evenement[])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des événements')
      } finally {
        setLoading(false)
      }
    }

    fetchEvenements()
  }, [])

  return { evenements, loading, error }
}

// Hook pour un événement spécifique
export function useEvenement(id: number) {
  const [evenement, setEvenement] = useState<Evenement | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvenement = async () => {
      try {
        setLoading(true)
        const data = await directusClient.getEvenement(id)
        setEvenement(data as Evenement)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement de l\'événement')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchEvenement()
    }
  }, [id])

  return { evenement, loading, error }
}

// Hook pour les boutons
export function useBoutons() {
  const [boutons, setBoutons] = useState<Bouton[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBoutons = async () => {
      try {
        setLoading(true)
        const data = await directusClient.getBoutons()
        setBoutons(data as Bouton[])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des boutons')
      } finally {
        setLoading(false)
      }
    }

    fetchBoutons()
  }, [])

  return { boutons, loading, error }
}

// Hook pour un bouton spécifique
export function useBouton(id: number) {
  const [bouton, setBouton] = useState<Bouton | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBouton = async () => {
      try {
        setLoading(true)
        const data = await directusClient.getBouton(id)
        setBouton(data as Bouton)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement du bouton')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchBouton()
    }
  }, [id])

  return { bouton, loading, error }
}

// Hook pour les partenaires
export function usePartenaires() {
  const [partenaires, setPartenaires] = useState<Partenaire[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPartenaires = async () => {
      try {
        setLoading(true)
        const data = await directusClient.getPartenaires()
        setPartenaires(data as Partenaire[])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des partenaires')
      } finally {
        setLoading(false)
      }
    }

    fetchPartenaires()
  }, [])

  return { partenaires, loading, error }
}

// Hook pour un partenaire spécifique
export function usePartenaire(id: number) {
  const [partenaire, setPartenaire] = useState<Partenaire | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPartenaire = async () => {
      try {
        setLoading(true)
        const data = await directusClient.getPartenaire(id)
        setPartenaire(data as Partenaire)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement du partenaire')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPartenaire()
    }
  }, [id])

  return { partenaire, loading, error }
}

// Hook pour le pied de page
export function usePiedDePage() {
  const [piedDePage, setPiedDePage] = useState<PiedDePage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPiedDePage = async () => {
      try {
        setLoading(true)
        const data = await directusClient.getPiedDePage()
        // Prendre le premier élément (il ne devrait y en avoir qu'un)
        setPiedDePage(Array.isArray(data) ? data[0] || null : data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement du pied de page')
      } finally {
        setLoading(false)
      }
    }

    fetchPiedDePage()
  }, [])

  return { piedDePage, loading, error }
}

// Hook pour les réseaux sociaux
export function useReseauxSociaux() {
  const [reseauxSociaux, setReseauxSociaux] = useState<ReseauSocial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReseauxSociaux = async () => {
      try {
        setLoading(true)
        const data = await directusClient.getReseauxSociaux()
        setReseauxSociaux(data as ReseauSocial[])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des réseaux sociaux')
      } finally {
        setLoading(false)
      }
    }

    fetchReseauxSociaux()
  }, [])

  return { reseauxSociaux, loading, error }
}

// Hook pour un réseau social spécifique
export function useReseauSocial(id: number) {
  const [reseauSocial, setReseauSocial] = useState<ReseauSocial | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReseauSocial = async () => {
      try {
        setLoading(true)
        const data = await directusClient.getReseauSocial(id)
        setReseauSocial(data as ReseauSocial)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement du réseau social')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchReseauSocial()
    }
  }, [id])

  return { reseauSocial, loading, error }
}

// Hook pour les chiffres clés
export function useChiffresCles() {
  const [chiffresCles, setChiffresCles] = useState<ChiffresCles[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchChiffresCles = async () => {
      try {
        setLoading(true)
        const data = await directusClient.getChiffresCles()
        setChiffresCles(data as ChiffresCles[])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des chiffres clés')
      } finally {
        setLoading(false)
      }
    }

    fetchChiffresCles()
  }, [])

  return { chiffresCles, loading, error }
}


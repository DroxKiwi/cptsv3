import { createDirectus, rest, readItems, readItem, readSingleton } from '@directus/sdk'

// Types pour les collections Directus
export interface Article {
  id: number
  titre: string
  resume?: string
  contenu: string
  excerpt?: string
  featured_image?: string
  image?: string
  status: 'published' | 'draft' | 'archived'
  date_created: string
  date_updated: string
  etiquettes?: Tag[]
}

export interface Tag {
  id: number
  nom: string
  couleur?: string
  description?: string
}

export interface ReglagesGeneraux {
  id: number
  status: 'published' | 'draft' | 'archived'
  user_created: string
  date_created: string
  user_updated: string | null
  date_updated: string | null
  polices_ecriture_titre?: string
  polices_ecriture_sous_titre?: string
  polices_ecriture_corps?: string
  polices_ecriture_indication?: string
  taille_polices_titre?: string
  taille_polices_sous_titre?: string
  taille_polices_corps?: string
  taille_polices_indication?: string
  epaisseur_titre?: string
  epaisseur_sous_titre?: string
  epaisseur_corps?: string
  epaisseur_indication?: string
}

export interface Accueil {
  id: number
  titre_principal: string
  sous_titre_principal: string
  titre_principal_couleur: string
  couleur_texte_section_principale: string
  couleur_fond_section_principale: string
  titre_projets: string
  sous_titre_projets: string
  titre_projets_couleur: string
  couleur_texte_section_projets: string
  couleur_fond_section_projets: string
  titre_actualites: string
  sous_titre_actualites: string
  titre_actualites_couleur: string
  couleur_texte_section_actualites: string
  couleur_fond_section_actualites: string
  titre_informations: string
  sous_titre_informations: string
  titre_informations_couleur: string
  couleur_texte_section_informations: string
  couleur_fond_section_information: string
  nombre_article_caroussel: number
  articles_a_la_une?: Article[]
  status: 'published' | 'draft' | 'archived'
  date_created: string
  date_updated: string
}

export interface Logo {
  id: number
  logo: string // URL complète de l'image
  status: 'published' | 'draft' | 'archived'
  date_created: string
  date_updated: string
}

export interface Entete {
  id: number
  titre: string
  sous_titre: string
  titre_page_1: string
  titre_page_2: string
  titre_page_3: string
  titre_page_4: string
  titre_page_5: string
  titre_page_6: string
  titre_page_7: string
  titre_page_8: string
  titre_page_9: string
  couleur_de_fond: string
  couleur_titre: string
  couleur_sous_titre: string
  couleur_titres_pages: string
  opacite: number
  status: 'published' | 'draft' | 'archived'
  date_created: string
  date_updated: string
}

export interface Projet {
  id: string
  titre: string
  sous_titre: string
  description: string
  icone: string // URL de l'image
  couleur: string // Couleur de fond
  couleur_texte: string // Couleur du texte
  status: 'published' | 'draft' | 'archived'
  sort: string | null
  user_created: string
  date_created: string
  user_updated: string | null
  date_updated: string | null
}

export interface Mission {
  id: string
  titre: string
  sous_titre: string
  description: string
  projet_id: any // Relation M2A vers projets
  status: 'published' | 'draft' | 'archived'
  sort: string | null
  user_created: string
  date_created: string
  user_updated: string | null
  date_updated: string | null
}

// Schéma Directus
export interface DirectusSchema {
  articles: Article[]
  etiquettes: Tag[]
  reglages_generaux: ReglagesGeneraux[]
  accueil: Accueil[]
  logo: Logo[]
  entete: Entete[]
  projets: Projet[]
  missions: Mission[]
}

// Configuration du client Directus
const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'
const directusToken = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN || ''

export const directus = createDirectus<DirectusSchema>(directusUrl)
  .with(rest({
    onRequest: (options) => ({ 
      ...options, 
      cache: 'no-store',
      headers: {
        ...options.headers,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        ...(directusToken && { 'Authorization': `Bearer ${directusToken}` })
      }
    }),
  }))

// Fonctions utilitaires pour récupérer les données
export const directusClient = {
      // Articles
      async getArticles() {
        try {
          const response = await fetch('/api/directus/items/articles?fields=*,etiquettes.*', {
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          })
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          
          const data = await response.json()
          return data.data || data
        } catch (error) {
          throw error
        }
      },

  async getArticle(id: number) {
    try {
      const response = await fetch(`/api/directus/items/articles/${id}?fields=*,etiquettes.*`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data.data || data
        } catch (error) {
          throw error
        }
  },

  // Tags
  async getTags() {
    try {
      const response = await fetch('/api/directus/items/etiquettes', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data.data || data
        } catch (error) {
          throw error
        }
  },

      // Paramètres globaux
      async getReglagesGeneraux() {
        try {
          const response = await fetch('/api/directus/items/reglages_generaux', {
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          })
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          
          const data = await response.json()
          // Si c'est un tableau, prend le premier élément
          const result = data.data || data
          return Array.isArray(result) ? result[0] : result
        } catch (error) {
          throw error
        }
      },

      // Accueil
      async getAccueil() {
        try {
          // D'abord récupérer les données de base de l'accueil
          const response = await fetch('/api/directus/items/accueil', {
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          })
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          
          const data = await response.json()
          const accueil = Array.isArray(data.data) ? data.data[0] : data.data
          
          // Récupérer les articles spécifiés dans articles_a_la_une avec leurs étiquettes complètes
          if (accueil.articles_a_la_une && accueil.articles_a_la_une.length > 0) {
            try {
              const articlesPromises = accueil.articles_a_la_une.map(async (articleId: number) => {
                try {
                  const articleResponse = await fetch(`/api/directus/items/articles/${articleId}?fields=*,etiquettes.*,resume`, {
                    method: 'GET',
                    headers: {
                      'Cache-Control': 'no-cache, no-store, must-revalidate',
                      'Pragma': 'no-cache',
                      'Expires': '0'
                    }
                  })
                  
                  if (articleResponse.ok) {
                    const articleData = await articleResponse.json()
                    const article = articleData.data || articleData
                    
                    // Récupérer les étiquettes complètes pour cet article
                    if (article.etiquettes && article.etiquettes.length > 0) {
                      try {
                        console.log(`Récupération des étiquettes pour l'article ${articleId}:`, article.etiquettes)
                        console.log(`Type des étiquettes:`, typeof article.etiquettes[0])
                        console.log(`Première étiquette:`, article.etiquettes[0])
                        console.log(`Première étiquette ID:`, article.etiquettes[0]?.id)
                        console.log(`Première étiquette etiquettes_id:`, article.etiquettes[0]?.etiquettes_id)
                        
                        // Extraire les IDs des étiquettes (au cas où ce seraient des objets)
                        const etiquettesIds = article.etiquettes.map((etiquette: any) => {
                          console.log(`Étiquette à traiter:`, etiquette, `Type:`, typeof etiquette)
                          // Utiliser etiquettes_id au lieu de id pour les relations M2M
                          return typeof etiquette === 'object' ? etiquette.etiquettes_id : etiquette
                        }).join(',')
                        
                        console.log(`IDs des étiquettes à récupérer:`, etiquettesIds)
                        const tagsResponse = await fetch(`/api/directus/items/etiquettes?filter[id][_in]=${etiquettesIds}`, {
                          method: 'GET',
                          headers: {
                            'Cache-Control': 'no-cache, no-store, must-revalidate',
                            'Pragma': 'no-cache',
                            'Expires': '0'
                          }
                        })
                        
                        if (tagsResponse.ok) {
                          const tagsData = await tagsResponse.json()
                          console.log(`Réponse API étiquettes pour l'article ${articleId}:`, tagsData)
                          console.log(`Étiquettes récupérées pour l'article ${articleId}:`, tagsData.data || tagsData)
                          console.log(`Nombre d'étiquettes récupérées:`, (tagsData.data || tagsData).length)
                          article.etiquettes = tagsData.data || tagsData
                          console.log(`Article ${articleId} après récupération des étiquettes:`, article.etiquettes)
                        } else {
                          console.error(`Erreur HTTP ${tagsResponse.status} pour les étiquettes de l'article ${articleId}`)
                          console.error(`URL de la requête:`, `/api/directus/items/etiquettes?filter[id][_in]=${etiquettesIds}`)
                        }
                      } catch (error) {
                        console.error('Erreur lors de la récupération des étiquettes:', error)
                      }
                    }
                    
                    return article
                  }
                  return null
                } catch (error) {
                  console.error('Erreur lors de la récupération de l\'article:', error)
                  return null
                }
              })
              
              const articles = await Promise.all(articlesPromises)
              accueil.articles_a_la_une = articles.filter(article => article !== null)
            } catch (error) {
              console.error('Erreur lors de la récupération des articles:', error)
              accueil.articles_a_la_une = []
            }
          } else {
            accueil.articles_a_la_une = []
          }
          
          return accueil
        } catch (error) {
          throw error
        }
      },

      // Logo
      async getLogo() {
        try {
          const response = await fetch('/api/directus/items/logo', {
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          })
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          
          const data = await response.json()
          const result = data.data || data
          const logo = Array.isArray(result) ? result[0] : result
          
          // Construit l'URL complète de l'image
          if (logo && logo.logo) {
            logo.logo = `${process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'}/assets/${logo.logo}`
          }
          
          return logo
        } catch (error) {
          throw error
        }
      },

      // Entête
      async getEntete() {
        try {
          const response = await fetch('/api/directus/items/entete', {
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          })
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          
          const data = await response.json()
          const result = data.data || data
          return Array.isArray(result) ? result[0] : result
        } catch (error) {
          throw error
        }
      },

      // Projets
      async getProjets() {
        try {
          const response = await fetch('/api/directus/items/projets?sort=sort', {
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          })
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          
          const data = await response.json()
          const projets = data.data || data
          
          // Construit l'URL complète pour les icônes
          if (Array.isArray(projets)) {
            projets.forEach(projet => {
              if (projet.icone && !projet.icone.startsWith('http')) {
                projet.icone = `${process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'}/assets/${projet.icone}`
              }
            })
          }
          
          return projets
        } catch (error) {
          throw error
        }
      },

      // Missions d'un projet
      async getMissions(projetId: string) {
        try {
          const response = await fetch(`/api/directus/items/missions?filter[projet_id][_eq]=${projetId}&sort=sort`, {
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          })
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          
          const data = await response.json()
          return data.data || data
        } catch (error) {
          throw error
        }
      },

      // Toutes les missions (pour l'affichage sur la page d'accueil)
      async getAllMissions() {
        try {
          // Récupère les missions avec leurs relations
          const response = await fetch('/api/directus/items/missions?sort=sort&fields=*,projet_id.*', {
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          })
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          
          const data = await response.json()
          return data.data || data
        } catch (error) {
          throw error
        }
      },

      // Articles à la une
      async getArticlesALaUne() {
        try {
          const response = await fetch('/api/directus/items/articles?filter[accueil_id][_nnull]=true&fields=*,etiquettes.*', {
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          })
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          
          const data = await response.json()
          return data.data || data
        } catch (error) {
          throw error
        }
      }
}

'use client'

import { useState, useEffect } from 'react'
import { directusClient, Presentation } from '@/lib/directus'

export function usePresentation() {
  const [presentation, setPresentation] = useState<Presentation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPresentation = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await directusClient.getPresentation()
        setPresentation(data)
      } catch (err) {
        console.error('Erreur lors de la récupération de la présentation:', err)
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
      } finally {
        setLoading(false)
      }
    }

    fetchPresentation()
  }, [])

  return { presentation, loading, error }
}

'use client'

import { useState, useEffect } from 'react'
import { directusClient, ReglagesGeneraux } from '@/lib/directus'

export function useReglagesGeneraux() {
  const [reglages, setReglages] = useState<ReglagesGeneraux | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReglages = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await directusClient.getReglagesGeneraux()
        setReglages(data)
      } catch (err) {
        console.error('Erreur lors de la récupération des réglages généraux:', err)
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
      } finally {
        setLoading(false)
      }
    }

    fetchReglages()
  }, [])

  return { reglages, loading, error }
}

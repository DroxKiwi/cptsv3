"use client"

import { useChiffresCles } from '@/hooks/useDirectus'
import { AnimatedCounter } from './animated-counter'
import { themeClasses } from '@/lib/theme'

export function ChiffresCles() {
  const { chiffresCles, loading, error } = useChiffresCles()

  console.log('🔍 ChiffresCles Debug:', { chiffresCles, loading, error })

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error || !chiffresCles || chiffresCles.length === 0) {
    console.log('❌ ChiffresCles: Pas de données', { error, chiffresCles })
    // Fallback temporaire pour debug
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
        <div className="text-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
          <div className="text-4xl sm:text-5xl font-bold mb-2 text-red-500">
            Debug
          </div>
          <p className="text-sm font-medium">
            Pas de données
          </p>
        </div>
      </div>
    )
  }

  // Récupérer le premier élément du tableau et extraire les 3 champs
  const chiffres = chiffresCles[0]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
       {/* Professionnels */}
       <div className="text-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
         <div className={`${themeClasses.titre} text-4xl sm:text-5xl font-bold mb-2`}>
           <AnimatedCounter 
             value={parseInt(chiffres.professionnels) || 0}
             duration={2000}
           />
         </div>
         <p className={`${themeClasses.sousTitre} text-sm font-medium`}>
           Professionnels de santé
         </p>
       </div>

       {/* Communes */}
       <div className="text-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
         <div className={`${themeClasses.titre} text-4xl sm:text-5xl font-bold mb-2`}>
           <AnimatedCounter 
             value={parseInt(chiffres.communes) || 0}
             duration={2000}
           />
         </div>
         <p className={`${themeClasses.sousTitre} text-sm font-medium`}>
           Communes couvertes
         </p>
       </div>

       {/* Habitants */}
       <div className="text-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
         <div className={`${themeClasses.titre} text-4xl sm:text-5xl font-bold mb-2`}>
           <AnimatedCounter 
             value={parseInt(chiffres.habitants) || 0}
             duration={2000}
           />
         </div>
        <p className={`${themeClasses.sousTitre} text-sm font-medium`}>
          Habitants concernés
        </p>
      </div>
    </div>
  )
}

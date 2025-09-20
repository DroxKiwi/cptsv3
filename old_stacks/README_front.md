# CPTS des Mauges - Frontend Next.js

## 📋 Vue d'ensemble

Ce projet est le **frontend** d'un site web pour la **Communauté Professionnelle Territoriale de Santé (CPTS) des Mauges**. Il s'agit d'une application Next.js moderne qui présente les informations, actualités et services de la CPTS aux professionnels de santé et aux patients du territoire des Mauges.

## 🏗️ Architecture Technique

### Stack Technologique
- **Framework** : Next.js 15.3.3 (App Router)
- **Langage** : TypeScript 5
- **Styling** : Tailwind CSS 4.1.8 + CSS personnalisé
- **Animations** : Framer Motion 12.15.0
- **UI Components** : PrimeReact 10.9.5
- **Polices** : Google Fonts (Geist, Fredoka One, Comic Neue)
- **Build Tool** : Turbopack (dev mode)

### Structure du Projet
```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── actualites/        # Page actualités
│   ├── adherer/           # Page adhésion
│   ├── agenda/            # Page agenda/événements
│   ├── bureau-conseil/    # Page bureau et conseil
│   ├── contact/           # Page contact
│   ├── dashboard/         # Interface d'administration
│   ├── patients/          # Page patients
│   ├── presentation/      # Page présentation
│   ├── professionnels/    # Page professionnels
│   ├── projets-sante/     # Page projets de santé
│   ├── services/          # Services API et types
│   └── test-api/          # Page de test API
├── components/            # Composants réutilisables
├── dashboard/             # Interface d'administration
├── hooks/                 # Hooks personnalisés
├── lib/                   # Utilitaires et animations
├── styles/                # Styles CSS personnalisés
└── utils/                 # Utilitaires généraux
```

## 🎨 Design System

### Palette de Couleurs CPTS
```css
--cpts-blue: #0A727B        /* Couleur principale */
--cpts-blue-light: #008CDD  /* Bleu secondaire */
--cpts-orange: #F74924      /* Orange accent */
--cpts-green: #8DC943       /* Vert */
--cpts-yellow: #F2EE2C      /* Jaune */
--cpts-background: #fff9f6  /* Background crème */
--cpts-red: #cc0000         /* Rouge */
--cpts-purple: #9A015B      /* Violet */
```

### Typographie
- **Titres** : Fredoka One (alternative à Cooper Black)
- **Corps de texte** : Comic Sans MS / Comic Neue
- **Code** : Geist Mono

### Animations
- **Framer Motion** pour les animations complexes
- **Animations CSS** personnalisées (bounce, fade, slide)
- **Scroll-triggered animations** avec intersection observer
- **SVG animés** avec effets de révélation

## 📱 Pages et Fonctionnalités

### Pages Publiques

#### 1. **Page d'Accueil** (`/`)
- **Hero Section** avec animation lettre par lettre
- **Section "Notre projet de santé"** avec cartes interactives
- **Section Actualités** avec grille d'articles
- **Section Agenda** avec événements
- **Section Co-associations** avec partenaires
- **Section Contact** avec boutons d'action

#### 2. **Présentation** (`/presentation`)
- Informations sur la CPTS
- Territoire couvert
- Missions et objectifs
- Cartes de présentation des missions

#### 3. **Actualités** (`/actualites`)
- Grille d'articles avec filtres par catégorie
- Système de recherche
- Archives par année
- Newsletter subscription
- Catégories : Prévention, Infrastructure, Formation, Dépistage, Innovation, Assemblée

#### 4. **Agenda** (`/agenda`)
- Liste des événements
- Filtres par date et catégorie
- Détails des événements

#### 5. **Pages Spécialisées**
- **Patients** (`/patients`) : Informations pour les patients
- **Professionnels** (`/professionnels`) : Ressources pour les professionnels
- **Bureau/Conseil** (`/bureau-conseil`) : Équipe dirigeante
- **Projets Santé** (`/projets-sante`) : Projets en cours
- **Adhérer** (`/adherer`) : Processus d'adhésion
- **Contact** (`/contact`) : Informations de contact

### Interface d'Administration (`/dashboard`)

#### Fonctionnalités Administratives
- **Gestion des actualités** : CRUD complet
- **Gestion des événements** : CRUD complet
- **Gestion des tags** : Système de catégorisation
- **Paramètres globaux** : Configuration du site
- **Gestion des co-associations** : Partenaires
- **Gestion des professionnels** : Annuaire
- **Gestion des patients** : Ressources patients

#### Composants Dashboard
- **SideMenu** : Navigation latérale
- **GeneralSettings** : Configuration générale
- **Viewer** : Prévisualisation des pages
- **Editors** : Éditeurs de contenu par type

## 🔧 Services API

### Structure des Services
```typescript
// Exemple de service API
export const API_actualites = {
  async get_all(): Promise<Article[] | false>
  async get_all_tags(): Promise<Tag[] | false>
}
```

### Types TypeScript
- **Article** : Actualités et articles
- **Event** : Événements et agenda
- **Tag** : Système de catégorisation
- **GlobalData** : Données globales du site
- **BureauMember** : Membres du bureau
- **Professional** : Professionnels de santé
- **PatientData** : Données patients

### Configuration API
- **Base URL** : `process.env.NEXT_PUBLIC_BASE_API_URI`
- **Authentification** : Bearer Token
- **CORS** : Configuré pour les requêtes cross-origin
- **Error Handling** : Gestion centralisée des erreurs

## 🎯 Composants Principaux

### Composants de Layout
- **Header** : Navigation responsive avec menu mobile
- **Footer2** : Pied de page avec liens sociaux
- **ConditionalHeader** : Header conditionnel selon la page

### Composants de Contenu
- **HeroSection** : Section d'accueil avec animations
- **Acturesume** : Résumé des actualités
- **Agendaresume** : Résumé de l'agenda
- **ButtonAbs** : Boutons d'action stylisés
- **InfoBand** : Bande d'information
- **CoAssoc** : Co-associations et partenaires
- **CardsProject** : Cartes de projets
- **NumberBand** : Bande de statistiques

### Composants Utilitaires
- **MotionWrapper** : Wrapper pour animations
- **ContentSection** : Section de contenu générique
- **RecapCards** : Cartes de récapitulatif

## 🎨 Système de Styles

### Tailwind CSS Configuration
- **Couleurs personnalisées** CPTS
- **Polices** Comic Sans MS et Fredoka One
- **Animations** personnalisées (bounce, cpts-bounce)
- **Shadows** personnalisées (cpts, cpts-hover)
- **Text-shadow** plugin personnalisé

### CSS Personnalisé
- **Variables CSS** pour les couleurs CPTS
- **Classes utilitaires** pour l'espacement
- **Animations** CSS personnalisées
- **Responsive design** mobile-first

### Structure des Styles
```
src/styles/
├── components/     # Styles par composant
├── layout.css     # Styles de layout
└── primereact.css # Styles PrimeReact
```

## 🔄 Gestion d'État

### Local Storage / Session Storage
- **ls** : Gestion localStorage avec formatage JSON
- **ss** : Gestion sessionStorage avec formatage JSON
- **Store** : Utilitaires centralisés

### Hooks Personnalisés
- **useScrollNavigation** : Navigation par scroll entre sections
- **Gestion d'état local** : useState pour les composants

### State Management
- **Pas de Redux/Context** : Utilisation de l'état local React
- **Props drilling** : Communication entre composants
- **SessionStorage** : Persistance des données de session

## 🚀 Scripts et Commandes

### Développement
```bash
npm run dev          # Serveur de développement avec Turbopack
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Linting ESLint
```

### Configuration
- **Turbopack** activé en mode dev pour des builds plus rapides
- **TypeScript** strict mode activé
- **ESLint** configuré pour Next.js

## 📦 Dépendances Principales

### Production
- **next** : 15.3.3
- **react** : 19.1.0
- **react-dom** : 19.1.0
- **framer-motion** : 12.15.0
- **primereact** : 10.9.5
- **primeicons** : 7.0.0
- **tailwindcss** : 4.1.8

### Développement
- **typescript** : 5
- **@types/node** : 22.15.29
- **@types/react** : 19
- **@types/react-dom** : 19

## 🔧 Configuration

### Variables d'Environnement
```env
NEXT_PUBLIC_BASE_API_URI=https://api.cptsdesmauges.fr
```

### Configuration Next.js
- **App Router** activé
- **TypeScript** strict mode
- **Path mapping** : `@/*` vers `./src/*`

### Configuration Tailwind
- **Content paths** : Tous les fichiers TSX/JSX
- **Plugins** : Forms, Typography, Aspect Ratio
- **Custom colors** : Palette CPTS
- **Custom animations** : Animations personnalisées

## 🎯 Fonctionnalités Spécifiques

### Animations Avancées
- **Lettre par lettre** : Animation des titres
- **SVG révélateurs** : Effets de rideau sur les SVG
- **Scroll-triggered** : Animations au scroll
- **Hover effects** : Interactions au survol

### Responsive Design
- **Mobile-first** : Design adaptatif
- **Breakpoints** : sm, md, lg, xl
- **Menu mobile** : Navigation hamburger
- **Images responsives** : Next.js Image component

### Performance
- **Lazy loading** : Images et composants
- **Code splitting** : Par route Next.js
- **Optimisation** : Images et polices
- **Turbopack** : Builds rapides en dev

## 🔐 Sécurité

### Authentification
- **Bearer Token** : Authentification API
- **Session Storage** : Gestion des sessions
- **CORS** : Configuration cross-origin

### Validation
- **TypeScript** : Typage strict
- **Input validation** : Validation des formulaires
- **Error boundaries** : Gestion des erreurs

## 📊 Monitoring et Debug

### Outils de Développement
- **React DevTools** : Debug des composants
- **Next.js DevTools** : Debug Next.js
- **Console logging** : Logs de debug
- **Error boundaries** : Capture des erreurs

### Performance
- **Lighthouse** : Audit de performance
- **Bundle analyzer** : Analyse des bundles
- **Core Web Vitals** : Métriques de performance

## 🚀 Déploiement

### Prérequis
- **Node.js** : Version 18+
- **npm/yarn** : Gestionnaire de paquets
- **Variables d'environnement** : Configuration API

### Build de Production
```bash
npm run build
npm run start
```

### Environnements
- **Développement** : localhost:3000
- **Production** : À configurer selon l'hébergement

## 📝 Notes de Développement

### Conventions de Code
- **TypeScript** : Typage strict obligatoire
- **Composants** : Fonction components avec hooks
- **Props** : Interface TypeScript pour les props
- **CSS** : Classes Tailwind + CSS personnalisé

### Structure des Fichiers
- **Pages** : App Router Next.js
- **Composants** : Réutilisables et modulaires
- **Services** : Séparation des appels API
- **Types** : Définitions TypeScript centralisées

### Bonnes Pratiques
- **Performance** : Lazy loading et optimisation
- **Accessibilité** : ARIA et sémantique HTML
- **SEO** : Meta tags et structure sémantique
- **Maintenance** : Code lisible et documenté

## 🔄 Évolutions Futures

### Améliorations Prévues
- **PWA** : Application Progressive Web
- **Offline** : Mode hors ligne
- **Notifications** : Push notifications
- **Analytics** : Suivi des performances

### Optimisations
- **Performance** : Optimisation des images
- **SEO** : Amélioration du référencement
- **Accessibilité** : Conformité WCAG
- **Mobile** : Expérience mobile optimisée

---

## 📞 Support et Contact

Pour toute question technique ou demande d'évolution, contactez l'équipe de développement.

**Version** : 0.1.0  
**Dernière mise à jour** : Janvier 2025  
**Mainteneur** : Équipe KDDS
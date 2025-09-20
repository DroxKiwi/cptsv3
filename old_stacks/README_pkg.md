# CPTSdal - Package Data Access Layer

## Description du Projet

**CPTSdal** est un package Python qui fournit une couche d'accès aux données (DAL - Data Access Layer) pour le système CPTS (Communauté de Pratiques Territoriales et Sociales). Ce package encapsule toutes les opérations de base de données PostgreSQL nécessaires pour la gestion d'un site web communautaire.

## Informations Générales

- **Nom du package** : CPTSdal
- **Version** : 1.0.1
- **Auteur** : Corentin Fredj (corentinfredj.dev@gmail.fr)
- **Mainteneur** : KDDS
- **Licence** : GPL V3
- **Base de données** : PostgreSQL
- **Port** : 5437
- **Host** : 10.5.0.1

## Architecture du Projet

### Structure des Dossiers

```
pkg_CPTS_des_mauges/
├── bdd/                          # Module principal de base de données
│   ├── clCnxBdd.py              # Gestionnaire de connexions PostgreSQL
│   ├── cpts.py                  # Point d'entrée principal avec classes wrapper
│   └── dbcpts/                  # Classes de données pour chaque table
│       ├── cpts_users.py        # Gestion des utilisateurs
│       ├── cpts_articles.py     # Gestion des articles
│       ├── cpts_events.py       # Gestion des événements
│       ├── cpts_tags.py         # Gestion des tags
│       ├── cpts_pages.py        # Gestion des pages
│       ├── cpts_prod.py         # Gestion des productions
│       ├── cpts_prof.py         # Gestion des professionnels
│       ├── cpts_patd.py         # Gestion des partenaires (type D)
│       ├── cpts_patf.py         # Gestion des partenaires (type F)
│       ├── cpts_coassos.py      # Gestion des coassociations
│       ├── cpts_globaldata.py   # Données globales du site
│       ├── cpts_livret_pages.py # Pages du livret
│       └── cpts_orga.py         # Gestion de l'organisation
├── _OutilCreation/              # Outils de génération de code
│   ├── clCnxBdd.py             # Connexion pour génération
│   └── creClassFromBdd.py      # Générateur automatique de classes
├── build/                       # Fichiers compilés
├── dist/                        # Distributions (wheels)
├── CPTSdal.egg-info/           # Métadonnées du package
└── setup.py                    # Configuration du package
```

## Fonctionnalités Principales

### 1. Gestion des Utilisateurs (`tusers`)
- **Authentification** : Gestion des tokens d'accès et bearer tokens
- **Profil utilisateur** : Nom d'utilisateur, statut actif
- **Administration** : Gestion des droits d'administration par URL
- **Méthodes disponibles** :
  - `readId(pID)` : Lecture par ID
  - `readWhere(pWhere)` : Lecture avec conditions
  - `updateToken(pusers_o)` : Mise à jour des tokens

### 2. Gestion du Contenu (`tarticles`, `tevents`)
- **Articles** : Titre, sous-titre, description, image, tags
- **Événements** : Gestion des événements avec dates de début/fin
- **Système de tags** : Catégorisation et couleurs
- **Méthodes CRUD complètes** : Create, Read, Update, Delete

### 3. Gestion des Professionnels (`tprof`, `tprod`)
- **Professionnels** : Profils détaillés avec descriptions
- **Productions** : Liens entre professionnels et leurs productions
- **Système de relations** : Association professionnels-productions

### 4. Gestion des Partenaires (`tpatd`, `tpatf`)
- **Partenaires type D** : Partenaires avec relations vers type F
- **Partenaires type F** : Partenaires détaillés avec descriptions
- **Hiérarchie** : Système de relations entre types de partenaires

### 5. Gestion de l'Organisation (`torga`)
- **Équipe** : Membres de l'organisation
- **Rôles** : Attribution des rôles et descriptions
- **Images** : Gestion des photos de profil

### 6. Gestion des Coassociations (`tcoassos`)
- **Partenaires externes** : Logos et redirections
- **Système de liens** : Redirection vers sites partenaires

### 7. Données Globales (`tglobaldata`)
- **Informations de contact** : Téléphone, adresse, code postal, email
- **Réseaux sociaux** : Facebook, LinkedIn
- **Statistiques** : Chiffres clés (PSL, commercial, habitat)
- **Contenu éditorial** : Textes de présentation du site

### 8. Gestion des Pages (`tpages`, `tlivret_pages`)
- **Pages statiques** : Gestion des pages du site
- **Livret** : Pages numérotées avec images
- **Navigation** : Système de pages et URLs

## Configuration de la Base de Données

### Connexion PostgreSQL
```python
# Configuration dans clCnxBdd.py
Host: 10.5.0.1
Database: cpts
User: postgres
Password: toor
Port: 5437
```

### Schéma de Base
- **Schéma** : `cpts.public`
- **Type de base** : PostgreSQL
- **Encodage** : UTF-8

## Installation et Utilisation

### Prérequis
```bash
pip install psycopg>=2.9.10
pip install psycopg_binary>=3.2.3
pip install psycopg2>=2.9.9
pip install SQLAlchemy==1.4.23
```

### Installation du Package
```bash
# Installation depuis le wheel
pip install CPTSdal-1.0.1-py3-none-any.whl

# Ou installation depuis le code source
python setup.py install
```

### Utilisation de Base
```python
from bdd import cpts

# Initialisation des classes
users_manager = cpts.tusers()
articles_manager = cpts.tarticles()
events_manager = cpts.tevents()

# Lecture d'un utilisateur par ID
user = users_manager.readId("1")

# Lecture d'articles avec conditions
articles = articles_manager.readWhere("actif = true")

# Création d'un nouvel article
new_article = cpts.articles(users_manager.oCnx)
new_article.name = "Nouvel article"
new_article.description = "Description de l'article"
new_article.actif = True
sql = cpts.articles.insert(new_article)
```

## Architecture des Classes

### Pattern de Conception
Chaque classe suit un pattern standardisé :

1. **Classe de base** (`cpts_*.py`) : Contient la logique métier et les requêtes SQL
2. **Classe wrapper** (`t*.py`) : Fournit une interface simplifiée avec gestion automatique des connexions

### Méthodes Standard
Toutes les classes implémentent les méthodes CRUD de base :

- `insert(obj)` : Insertion d'un nouvel enregistrement
- `update(obj)` : Mise à jour d'un enregistrement existant
- `delete(obj)` : Suppression d'un enregistrement
- `readId(id)` : Lecture par identifiant unique
- `readWhere(conditions)` : Lecture avec conditions personnalisées

### Gestion des Connexions
- **Connexion automatique** : Chaque classe wrapper gère sa propre connexion
- **Mode debug** : Support du mode debug pour le développement
- **Gestion des erreurs** : Gestion robuste des erreurs de connexion

## Outils de Développement

### Générateur de Classes (`_OutilCreation/creClassFromBdd.py`)
Outil automatisé pour générer les classes de données à partir du schéma de base de données :

1. **Configuration** : Définir la base cible dans le script
2. **Génération** : Exécution du script pour créer les classes
3. **Personnalisation** : Modification manuelle des requêtes générées
4. **Intégration** : Ajout des nouvelles classes au package principal

### Processus de Génération
```python
# Configuration dans creClassFromBdd.py
nomBase = 'cpts'
nomRep = f'db{nomBase}'
cnxString = 'cnx.cpts'
typeBdd = "postgres"
```

## Gestion des Versions

### Versioning du Package
- **Fichiers à modifier** : `setup.py`, `Dockerfile`, `docker-compose.yml`
- **Incrémentation** : Version majeure pour les nouvelles tables
- **Compatibilité** : Maintien de la compatibilité ascendante

### Déploiement
1. **Génération de la wheel** : `python setup.py bdist_wheel`
2. **Installation locale** : `pip install *.whl`
3. **Déploiement en production** : Remplacement des fichiers sur le serveur

## Sécurité

### Gestion des Données Sensibles
- **Mots de passe** : Stockage sécurisé des mots de passe utilisateur
- **Tokens** : Gestion des tokens d'authentification
- **Injection SQL** : Protection contre les injections SQL via paramètres

### Bonnes Pratiques
- **Validation des entrées** : Vérification des données avant insertion
- **Échappement** : Gestion appropriée des caractères spéciaux
- **Connexions** : Fermeture appropriée des connexions de base de données

## Maintenance et Évolution

### Ajout de Nouvelles Tables
1. Exécuter le générateur de classes
2. Modifier les requêtes générées selon les besoins
3. Ajouter la classe wrapper dans `cpts.py`
4. Incrémenter la version du package
5. Tester et déployer

### Monitoring
- **Logs** : Suivi des opérations de base de données
- **Performance** : Monitoring des requêtes lentes
- **Erreurs** : Gestion centralisée des erreurs

## Support et Documentation

### Ressources
- **Code source** : Documentation inline dans le code
- **Exemples** : Scripts d'exemple dans `_OutilCreation/`
- **Tests** : Tests unitaires pour chaque classe

### Contact
- **Développeur** : Corentin Fredj (corentinfredj.dev@gmail.fr)
- **Organisation** : KDDS
- **Support** : Via les issues GitHub ou email

## Licence

Ce projet est sous licence GPL V3. Voir le fichier LICENSE pour plus de détails.

---

*Documentation générée automatiquement - Version 1.0.1*

# 📦 Scripts de Sauvegarde et Restauration Directus

Ce dossier contient des scripts **robustes** utilisant les commandes natives de Directus et PostgreSQL.

## 🗂️ Structure des fichiers

```
scripts/backup/
├── README.md                 # Cette documentation
├── backup-simple.ps1         # Script de sauvegarde robuste (PowerShell)
├── restore-complete.ps1      # Script de restauration robuste (PowerShell)
├── backup-simple.sh          # Script de sauvegarde (Bash/Linux)
├── restore-complete.sh       # Script de restauration (Bash/Linux)
└── backups/                  # Dossier des sauvegardes (créé automatiquement)
    └── directus_backup_YYYYMMDD_HHMMSS/
        ├── schema.yaml       # Schéma Directus (export natif)
        ├── postgres_dump.sql # Dump complet PostgreSQL
        ├── uploads.tar.gz    # Fichiers uploadés
        ├── docker-compose.dev.yml
        └── directus_tables.md
```

## 🚀 Utilisation rapide

### Sauvegarde (Windows)
```powershell
# Depuis la racine du projet
.\scripts\backup\backup-simple.ps1

# Ou depuis le dossier backup
cd scripts\backup
.\backup-simple.ps1
```

### Restauration (Windows)
```powershell
# Restaurer depuis une sauvegarde spécifique
.\scripts\backup\restore-complete.ps1 -BackupPath ".\scripts\backup\backups\directus_backup_20241201_143000"
```

### Sauvegarde (Linux/Mac)
```bash
# Depuis la racine du projet
./scripts/backup/backup-simple.sh

# Ou depuis le dossier backup
cd scripts/backup
./backup-simple.sh
```

### Restauration (Linux/Mac)
```bash
# Restaurer depuis une sauvegarde spécifique
./scripts/backup/restore-complete.sh ./backups/directus_backup_20241201_143000
```

## 📋 Scripts détaillés

### 1. `backup-simple.ps1` (Windows) / `backup-simple.sh` (Linux)
**Fonction :** Créer une sauvegarde robuste utilisant les commandes natives

**Paramètres :**
- `-BackupPath` : Dossier de destination (défaut: `.\backups`) - Windows uniquement

**Fonctionnalités :**
- Export du schéma Directus (structure)
- Dump PostgreSQL complet avec encodage UTF-8
- Sauvegarde des uploads (fichiers)
- Documentation des tables

**Exemple :**
```powershell
# Sauvegarde complète (Windows)
.\backup-simple.ps1

# Sauvegarde complète (Linux)
./backup-simple.sh

# Sauvegarde dans un dossier spécifique (Windows uniquement)
.\backup-simple.ps1 -BackupPath ".\my-backups"
```

### 2. `restore-complete.ps1` (Windows) / `restore-complete.sh` (Linux)
**Fonction :** Restauration complète et robuste d'une sauvegarde Directus

**Paramètres :**
- `-BackupPath` : Chemin vers le dossier de sauvegarde (Windows)
- `-Environment` : Environnement "dev" ou "prod" (Windows)
- `<backup_folder>` : Chemin vers le dossier de sauvegarde (Linux)
- `[dev|prod]` : Environnement (Linux, optionnel, défaut: dev)

**Fonctionnalités :**
- Suppression complète des volumes existants
- Vidage complet de la base de données (DROP SCHEMA CASCADE)
- Injection du dump PostgreSQL avec encodage UTF-8
- Correction automatique des permissions Directus
- Restauration des uploads avec correction des permissions
- Redémarrage automatique de Directus

**Exemple :**
```powershell
# Restauration complète (Windows)
.\restore-complete.ps1 -BackupPath ".\backups\directus_backup_20241201_143000" -Environment "dev"

# Restauration complète (Linux)
./restore-complete.sh ./backups/directus_backup_20241201_143000 dev
```

## 🔧 Fonctionnalités avancées

### Encodage UTF-8
Tous les scripts utilisent l'encodage UTF-8 pour préserver les caractères spéciaux (accents, cédilles, etc.) lors de la sauvegarde et restauration.

### Gestion des permissions
Le script de restauration corrige automatiquement :
- Les politiques Directus (admin_access, app_access)
- Les accès aux collections
- Les permissions CRUD pour toutes les collections
- Les permissions sur les fichiers (directus_files)

### Gestion des volumes
- Suppression complète des volumes existants
- Création de nouveaux volumes propres
- Correction des permissions des fichiers uploads

## 🚨 Important

**⚠️ ATTENTION :** Le script de restauration supprime complètement les volumes existants. Assurez-vous d'avoir une sauvegarde récente avant de l'utiliser.

## 🎯 Résumé

Ces scripts offrent une solution complète et robuste pour la sauvegarde et restauration de Directus :

- **Sauvegarde** : Export complet avec encodage UTF-8
- **Restauration** : Remise à zéro complète avec correction automatique des permissions
- **Multi-plateforme** : Scripts identiques pour Windows (PowerShell) et Linux (Bash)
- **Environnements** : Support dev et prod avec paramètres configurables

## 🚀 Démarrage rapide

### Sauvegarde
```bash
# Windows
.\backup-simple.ps1

# Linux
./backup-simple.sh
```

### Restauration
```bash
# Windows
.\restore-complete.ps1 -BackupPath ".\backups\directus_backup_20241201_143000" -Environment "dev"

# Linux
./restore-complete.sh ./backups/directus_backup_20241201_143000 dev
```

## 🛡️ Scénarios d'utilisation

### Développement local
```bash
# Sauvegarde avant modification
.\backup-simple.ps1  # Windows
./backup-simple.sh   # Linux

# Test de modifications...

# Restauration si problème
.\restore-complete.ps1 -BackupPath ".\backups\directus_backup_20241201_143000" -Environment "dev"  # Windows
./restore-complete.sh ./backups/directus_backup_20241201_143000 dev  # Linux
```

### Migration vers production
```bash
# 1. Sauvegarde complète
.\backup-simple.ps1  # Windows
./backup-simple.sh   # Linux

# 2. Copier les fichiers sur le serveur de production
# 3. Sur le serveur de production :
.\restore-complete.ps1 -BackupPath ".\backups\directus_backup_20241201_143000" -Environment "prod"  # Windows
./restore-complete.sh ./backups/directus_backup_20241201_143000 prod  # Linux
```

## ⚠️ Précautions importantes

1. **Toujours tester la restauration** sur un environnement de test avant la production
2. **Vérifier l'espace disque** avant de créer une sauvegarde
3. **Sauvegarder régulièrement** (quotidiennement en développement, plus fréquemment en production)
4. **Conserver plusieurs sauvegardes** pour éviter la perte de données
5. **Documenter les modifications** importantes avant sauvegarde

## 🔧 Dépannage

### Erreur "Container not found"
```bash
# Vérifier que les containers sont démarrés
docker-compose -f docker-compose.dev.yml ps

# Redémarrer si nécessaire
docker-compose -f docker-compose.dev.yml up -d
```

### Erreur "Permission denied"
```bash
# Exécuter en tant qu'administrateur (Windows)
# Ou ajuster les permissions du dossier
```

### Problème de restauration
```bash
# Vérifier que les fichiers de sauvegarde existent
ls .\backups\directus_backup_20241201_143000\  # Windows
ls ./backups/directus_backup_20241201_143000/  # Linux

# Créer une nouvelle sauvegarde
.\backup-simple.ps1  # Windows
./backup-simple.sh   # Linux
```

## 🎯 Avantages de cette approche

✅ **Robuste** : Utilise les commandes natives de Directus et PostgreSQL  
✅ **Fiable** : Pas de scripts complexes qui peuvent échouer  
✅ **Standard** : Méthodes recommandées par la documentation officielle  
✅ **Portable** : Fonctionne sur Windows, Linux et Mac  
✅ **Simple** : Scripts courts et faciles à comprendre  
✅ **Production-ready** : Adapté pour la production  
✅ **Encodage UTF-8** : Préserve les caractères spéciaux  
✅ **Permissions automatiques** : Correction automatique des droits Directus

## 📞 Support

En cas de problème :
1. Vérifier les logs Docker : `docker-compose -f docker-compose.dev.yml logs`
2. Vérifier l'espace disque disponible
3. S'assurer que les containers sont en cours d'exécution
4. Consulter la documentation Directus : https://docs.directus.io/

---
*Dernière mise à jour : Décembre 2024*

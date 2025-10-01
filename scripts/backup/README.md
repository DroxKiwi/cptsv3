# 📦 Scripts de Sauvegarde et Restauration Directus

Ce dossier contient des scripts **robustes** utilisant les commandes natives de Directus et PostgreSQL.

## 🗂️ Structure des fichiers

```
scripts/backup/
├── README.md                 # Cette documentation
├── backup-simple.ps1         # Script de sauvegarde robuste (PowerShell)
├── restore-simple.ps1        # Script de restauration robuste (PowerShell)
├── docker-backup.sh          # Script de sauvegarde (Bash/Linux)
├── docker-restore.sh         # Script de restauration (Bash/Linux)
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
.\scripts\backup\restore-simple.ps1 -BackupPath ".\scripts\backup\backups\directus_backup_20241201_143000"
```

### Sauvegarde (Linux/Mac)
```bash
# Depuis la racine du projet
./scripts/backup/docker-backup.sh

# Ou depuis le dossier backup
cd scripts/backup
./docker-backup.sh
```

### Restauration (Linux/Mac)
```bash
# Restaurer depuis une sauvegarde spécifique
./scripts/backup/docker-restore.sh ./backups/directus_backup_20241201_143000
```

## 📋 Scripts détaillés

### 1. `backup-simple.ps1` (Windows)
**Fonction :** Créer une sauvegarde robuste utilisant les commandes natives

**Paramètres :**
- `-BackupPath` : Dossier de destination (défaut: `.\backups`)

**Exemple :**
```powershell
# Sauvegarde complète
.\backup-simple.ps1

# Sauvegarde dans un dossier spécifique
.\backup-simple.ps1 -BackupPath ".\my-backups"
```

### 2. `restore-simple.ps1` (Windows)
**Fonction :** Restaurer Directus depuis une sauvegarde

**Paramètres :**
- `-BackupPath` : Chemin vers la sauvegarde (obligatoire)

**Exemple :**
```powershell
# Restauration complète
.\restore-simple.ps1 -BackupPath ".\backups\directus_backup_20241201_143000"
```

### 3. `docker-backup.sh` (Linux/Mac)
**Fonction :** Script Bash pour la sauvegarde

**Usage :**
```bash
# Sauvegarde complète
./docker-backup.sh
```

### 4. `docker-restore.sh` (Linux/Mac)
**Fonction :** Script Bash pour la restauration

**Usage :**
```bash
# Restauration
./docker-restore.sh ./backups/directus_backup_20241201_143000
```

## 🛡️ Scénarios d'utilisation

### Développement local
```powershell
# Sauvegarde avant modification
.\backup-simple.ps1

# Test de modifications...

# Restauration si problème
.\restore-simple.ps1 -BackupPath ".\backups\directus_backup_20241201_143000"
```

### Migration vers production
```bash
# 1. Sauvegarde complète
./docker-backup.sh

# 2. Copier les fichiers sur le serveur de production
# 3. Sur le serveur de production :
./docker-restore.sh ./backups/directus_backup_20241201_143000
```

### Récupération après incident
```powershell
# Restaurer depuis la dernière sauvegarde
.\restore-simple.ps1 -BackupPath ".\backups\directus_backup_20241201_143000"
```

## ⚠️ Précautions importantes

1. **Toujours tester la restauration** sur un environnement de test avant la production
2. **Vérifier l'espace disque** avant de créer une sauvegarde
3. **Sauvegarder régulièrement** (quotidiennement en développement, plus fréquemment en production)
4. **Conserver plusieurs sauvegardes** pour éviter la perte de données
5. **Documenter les modifications** importantes avant sauvegarde

## 🔧 Dépannage

### Erreur "Container not found"
```powershell
# Vérifier que les containers sont démarrés
docker-compose -f docker-compose.dev.yml ps

# Redémarrer si nécessaire
docker-compose -f docker-compose.dev.yml up -d
```

### Erreur "Permission denied"
```powershell
# Exécuter PowerShell en tant qu'administrateur
# Ou ajuster les permissions du dossier
```

### Problème de restauration
```powershell
# Vérifier que les fichiers de sauvegarde existent
ls .\backups\directus_backup_20241201_143000\

# Créer une nouvelle sauvegarde
.\backup-simple.ps1
```

## 🎯 Avantages de cette approche

✅ **Robuste** : Utilise les commandes natives de Directus et PostgreSQL  
✅ **Fiable** : Pas de scripts complexes qui peuvent échouer  
✅ **Standard** : Méthodes recommandées par la documentation officielle  
✅ **Portable** : Fonctionne sur Windows, Linux et Mac  
✅ **Simple** : Scripts courts et faciles à comprendre  
✅ **Production-ready** : Adapté pour la production

## 📞 Support

En cas de problème :
1. Vérifier les logs Docker : `docker-compose -f docker-compose.dev.yml logs`
2. Vérifier l'espace disque disponible
3. S'assurer que les containers sont en cours d'exécution
4. Consulter la documentation Directus : https://docs.directus.io/

---
*Dernière mise à jour : Décembre 2024*

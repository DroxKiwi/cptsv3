#!/bin/bash
# Script de sauvegarde robuste pour Directus avec Docker
# Usage: ./docker-backup.sh

set -e  # Arrêter en cas d'erreur

BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="directus_backup_$TIMESTAMP"

echo "🔄 Début de la sauvegarde Directus..."

# Créer le dossier de sauvegarde
mkdir -p "$BACKUP_DIR/$BACKUP_NAME"

# 1. Sauvegarde du schéma Directus (structure)
echo "📋 Export du schéma..."
docker exec cpts_directus_dev npx directus schema snapshot /directus/schema.yaml
docker cp cpts_directus_dev:/directus/schema.yaml "$BACKUP_DIR/$BACKUP_NAME/"

# 2. Sauvegarde PostgreSQL (données + structure)
echo "💾 Sauvegarde PostgreSQL..."
docker exec cpts_postgres_dev pg_dump -U postgres -d directus --encoding=UTF8 > "$BACKUP_DIR/$BACKUP_NAME/postgres_dump.sql"

# 3. Sauvegarde des uploads
echo "📁 Sauvegarde des uploads..."
docker run --rm -v cpts_directus_uploads:/data -v "$(pwd)/$BACKUP_DIR/$BACKUP_NAME:/backup" alpine tar czf /backup/uploads.tar.gz -C /data .

# 4. Sauvegarde de la configuration
echo "⚙️ Sauvegarde de la configuration..."
cp docker-compose.dev.yml "$BACKUP_DIR/$BACKUP_NAME/"
cp directus_tables.md "$BACKUP_DIR/$BACKUP_NAME/"

echo "✅ Sauvegarde terminée: $BACKUP_DIR/$BACKUP_NAME"
echo "📦 Contenu:"
ls -la "$BACKUP_DIR/$BACKUP_NAME"

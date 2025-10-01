# Script de sauvegarde Directus
# Usage: .\backup-directus.ps1

param(
    [string]$BackupPath = ".\backups",
    [switch]$IncludeData = $true,
    [switch]$IncludeUploads = $true
)

# Créer le dossier de sauvegarde
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupDir = "$BackupPath\directus_backup_$timestamp"
New-Item -ItemType Directory -Path $backupDir -Force

Write-Host "🔄 Début de la sauvegarde Directus..." -ForegroundColor Green

try {
    # 1. Sauvegarde du schéma Directus
    Write-Host "📋 Export du schéma..." -ForegroundColor Yellow
    docker exec cpts_directus_dev npx directus schema snapshot /directus/snapshot.json
    docker cp cpts_directus_dev:/directus/snapshot.json "$backupDir\schema.json"
    
    # 2. Sauvegarde des données (optionnel)
    if ($IncludeData) {
        Write-Host "💾 Export des données..." -ForegroundColor Yellow
        docker exec cpts_directus_dev npx directus database export /directus/data.sql
        docker cp cpts_directus_dev:/directus/data.sql "$backupDir\data.sql"
    }
    
    # 3. Sauvegarde des uploads (optionnel)
    if ($IncludeUploads) {
        Write-Host "📁 Sauvegarde des uploads..." -ForegroundColor Yellow
        docker run --rm -v cpts_directus_uploads:/data -v "${PWD}\${backupDir}:/backup" alpine tar czf /backup/uploads.tar.gz -C /data .
    }
    
    # 4. Sauvegarde de la configuration
    Write-Host "⚙️ Sauvegarde de la configuration..." -ForegroundColor Yellow
    Copy-Item "docker-compose.dev.yml" "$backupDir\"
    Copy-Item "directus_tables.md" "$backupDir\"
    
    # 5. Sauvegarde PostgreSQL (dump complet)
    Write-Host "🗄️ Dump PostgreSQL..." -ForegroundColor Yellow
    docker exec cpts_postgres_dev pg_dump -U postgres -d directus > "$backupDir\postgres_dump.sql"
    
    Write-Host "✅ Sauvegarde terminée dans: $backupDir" -ForegroundColor Green
    Write-Host "📦 Contenu de la sauvegarde:" -ForegroundColor Cyan
    Get-ChildItem $backupDir | Format-Table Name, Length, LastWriteTime
    
} catch {
    Write-Host "❌ Erreur lors de la sauvegarde: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}


# Script de sauvegarde simple et robuste pour Directus
# Utilise les commandes natives de Directus et PostgreSQL

param(
    [string]$BackupPath = ".\backups"
)

$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupDir = "$BackupPath\directus_backup_$timestamp"

Write-Host "Sauvegarde Directus..." -ForegroundColor Green

try {
    # Creer le dossier
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    
    # 1. Export du schema Directus (structure)
    Write-Host "Export du schema Directus..." -ForegroundColor Yellow
    docker exec cpts_directus_dev npx directus schema snapshot /directus/schema.yaml --yes
    docker cp cpts_directus_dev:/directus/schema.yaml "$backupDir\schema.yaml"
    
    # 2. Dump PostgreSQL (donnees + structure)
    Write-Host "Dump PostgreSQL..." -ForegroundColor Yellow
    docker exec cpts_postgres_directus_dev pg_dump -U admin -d directus --encoding=UTF8 > "$backupDir\postgres_dump.sql"
    
    # 3. Sauvegarde des uploads
    Write-Host "Sauvegarde des uploads..." -ForegroundColor Yellow
    docker run --rm -v cptsv3_directus_uploads_dev:/data -v "${PWD}\${backupDir}:/backup" alpine tar czf /backup/uploads.tar.gz -C /data .
    
    # 4. Documentation (optionnel)
    Copy-Item "..\..\directus_tables.md" "$backupDir\"
    
    Write-Host "Sauvegarde terminee: $backupDir" -ForegroundColor Green
    
    # Afficher les informations
    $files = Get-ChildItem $backupDir
    $totalSize = ($files | Measure-Object -Property Length -Sum).Sum / 1MB
    
    Write-Host "Fichiers crees:" -ForegroundColor Cyan
    foreach ($file in $files) {
        $size = [math]::Round($file.Length / 1KB, 2)
        Write-Host "  - $($file.Name) ($size KB)" -ForegroundColor White
    }
    Write-Host "Taille totale: $([math]::Round($totalSize, 2)) MB" -ForegroundColor Cyan
    
} catch {
    Write-Host "Erreur: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Script d'arrêt pour le développement
Write-Host "🛑 Arrêt de l'environnement de développement CPTS" -ForegroundColor Red

# Arrêter les bases de données
Write-Host "📊 Arrêt des bases de données..." -ForegroundColor Yellow
docker-compose -f docker-compose.dev.yml down

Write-Host "✅ Environnement arrêté !" -ForegroundColor Green

# ==============================================================================
# Script de Deploy e Sincronização GitHub / VPS - FTTRESP
# Padrão de Commit: nome_da_alteracao_DDMMAAAA_HHMMSS_v001
# Repositório: https://github.com/omardev3101/fttresp.git
# ==============================================================================

param (
    [string]$Opcao = "p",
    [string]$NomeAlteracao = "deploy_fttresp"
)

$plinkPath = "C:\Program Files\PuTTY\plink.exe"

# Leitura de Credenciais do arquivo .env
$envFile = ".env"
$vpsIP = IPVPS
$vpsUser = USERVPS
$vpsPass = PASSWDVPS

if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^\s*IPVPS\s*=\s*(.*)$') { $vpsIP = $matches[1].Trim() }
        if ($_ -match '^\s*USERVPS\s*=\s*(.*)$') { $vpsUser = $matches[1].Trim() }
        if ($_ -match '^\s*PASSWDVPS\s*=\s*(.*)$') { $vpsPass = $matches[1].Trim() }
    }
}

$dateStr = Get-Date -Format "ddMMyyyy"
$timeStr = Get-Date -Format "HHmmss"
$commitMsg = "${NomeAlteracao}_${dateStr}_${timeStr}_v001"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   FTTRESP - Sincronização GitHub e Deploy VPS" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Commit Message: $commitMsg" -ForegroundColor Yellow

# Opção 'p' (Push para GitHub e Deploy no VPS)
if ($Opcao -eq "p" -or $Opcao -eq "push") {
    Write-Host "--- Sincronizando com GitHub ---" -ForegroundColor Cyan
    git add .
    git commit -m "$commitMsg"
    git push origin main

    Write-Host "--- Conectando via Plink ao VPS Ubuntu ($vpsIP) ---" -ForegroundColor Cyan
    $remotePath = "/var/www/fttresp"
    $deployCmd = "if [ ! -d '$remotePath' ]; then mkdir -p '$remotePath' && git clone https://github.com/omardev3101/fttresp.git '$remotePath'; fi && " +
                  "cd $remotePath && git pull origin main && " +
                  "cd server && npm install && " +
                  "cd ../client && npm install && npm run build && " +
                  "cd .. && (pm2 restart fttresp-app || pm2 start server/src/server.js --name fttresp-app)"

    if (Test-Path $plinkPath) {
        & $plinkPath -pw $vpsPass "$vpsUser@$vpsIP" $deployCmd
        Write-Host "--- Deploy VPS Concluído com Sucesso! ---" -ForegroundColor Green
    } else {
        Write-Host "Plink não encontrado em $plinkPath. Git push realizado com sucesso." -ForegroundColor Yellow
    }
} else {
    Write-Host "Executado apenas em modo local." -ForegroundColor Yellow
}

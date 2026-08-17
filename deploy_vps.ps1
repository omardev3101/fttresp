# ==============================================================================
# Script de Deploy Nginx Oficial Kinghost (Porta 5005 + SSL) - FTTRESP
# Servidor: Ubuntu 22.04 LTS (IP: 187.45.255.59)
# URL HTTPS: https://pessistemas.vps-kinghost.net/fttresp/
# ==============================================================================

param (
    [string]$NomeAlteracao = "deploy_nginx_purge_orphans_port_5005"
)

$plinkPath = "C:\Program Files\PuTTY\plink.exe"

# Leitura de Credenciais do arquivo .env
$envFile = ".env"
$vpsIP = "187.45.255.59"
$vpsUser = "root"
$vpsPass = "Omar3101@"

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
Write-Host "   FTTRESP - Sincronização GitHub e Deploy VPS   " -ForegroundColor Cyan
Write-Host "   Domínio HTTPS: https://pessistemas.vps-kinghost.net/fttresp " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Commit Message: $commitMsg" -ForegroundColor Yellow
Write-Host "VPS IP Target: $vpsIP ($vpsUser)" -ForegroundColor Yellow

# 1. Commit e Push Local para GitHub (Branch master)
Write-Host "`n--- Step 1: Sincronizando repositório local com o GitHub ---" -ForegroundColor Cyan
git add .
git commit -m "$commitMsg"
git push origin master

# 2. Comando Remoto para o VPS (Remoção de Vhosts Órfãos e Configuração Oficial Nginx Kinghost)
$remotePath = "/var/www/fttresp"

$vpsCommand = @"
sudo apt-get update -y && \
sudo apt-get install -y postgresql postgresql-contrib curl git nginx && \
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && \
sudo apt-get install -y nodejs && \
sudo npm install -g pm2 && \
cat << 'EOF' > /tmp/setup.sql
CREATE USER fttresp_user WITH PASSWORD 'fttresp_pass_2026';
ALTER USER fttresp_user WITH PASSWORD 'fttresp_pass_2026';
CREATE DATABASE fttresp_db OWNER fttresp_user;
GRANT ALL PRIVILEGES ON DATABASE fttresp_db TO fttresp_user;
EOF
sudo -u postgres psql -f /tmp/setup.sql || true && \
if [ ! -d "$remotePath/.git" ]; then
    rm -rf "$remotePath" && git clone https://github.com/omardev3101/fttresp.git "$remotePath"
fi && \
cd "$remotePath" && \
git fetch origin master && git checkout master && git reset --hard origin/master && \
cd server && npm install && \
cat << 'EOF' > .env
PORT=5005
USE_POSTGRES=true
DATABASE_URL=postgres://fttresp_user:fttresp_pass_2026@localhost:5432/fttresp_db
JWT_SECRET=fttresp-super-secret-key-2026
EOF
node src/data/seed_pg.js && \
cd ../client && npm install && npm run build && \
cat << 'EOF' > /etc/nginx/nginx.conf
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
	worker_connections 768;
}

http {
	sendfile on;
	tcp_nopush on;
	types_hash_max_size 2048;

	include /etc/nginx/mime.types;
	default_type application/octet-stream;

	ssl_protocols TLSv1.2 TLSv1.3;
	ssl_prefer_server_ciphers on;

	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log;

	gzip on;

	include /etc/nginx/conf.d/*.conf;
	include /etc/nginx/sites-enabled/*;
}
EOF
rm -f /etc/nginx/sites-enabled/fttresp /etc/nginx/sites-available/fttresp /etc/nginx/conf.d/fttresp* /etc/nginx/snippets/fttresp* && \
cat << 'EOF' > /etc/nginx/sites-available/default
server {
    server_name pessistemas.vps-kinghost.net 187.45.255.59;

    # FTTRESP FRONTEND
    location ^~ /fttresp/ {
        alias /var/www/fttresp/client/dist/;
        index index.html;
        try_files `$uri `$uri/ /fttresp/index.html;
    }

    # FTTRESP API PRODUCAO (Node 5005 + PostgreSQL)
    location ^~ /fttresp/api/ {
        proxy_pass http://127.0.0.1:5005/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade `$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host `$host;
        proxy_cache_bypass `$http_upgrade;
    }

    # FTTRESP UPLOADS
    location ^~ /fttresp/uploads/ {
        alias /var/www/fttresp/client/public/uploads/;
    }

    location ^~ /sindmotoristas/ {
        alias /var/www/sindmotoristas/frontend/dist/;
        index index.html;
        error_page 404 =200 /sindmotoristas/index.html;
    }

    # API PRODUCAO
    location ^~ /sindmotoristas/api/ {
        proxy_pass http://127.0.0.1:3000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade `$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host `$host;
        proxy_cache_bypass `$http_upgrade;
    }

    # WEBSOCKET PRODUCAO
    location ^~ /sindmotoristas/ws {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade `$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host `$host;
        proxy_set_header X-Real-IP `$remote_addr;
        proxy_set_header X-Forwarded-For `$proxy_add_x_forwarded_for;
        proxy_read_timeout 86400;
    }

    location ^~ /sindtv {
        alias /var/www/sindtv/frontend/;
        index index.html;
        try_files `$uri `$uri/ /sindtv/index.html;
    }

    location ^~ /farmabus/ {
        alias /var/www/farmabus/frontend/dist/;
        index index.html;
        try_files `$uri `$uri/ /farmabus/index.html;
    }

    location ^~ /farmabus/api/ {
        proxy_pass http://127.0.0.1:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade `$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host `$host;
        proxy_cache_bypass `$http_upgrade;
    }

    # FRONTEND DEV
    location ^~ /testesindimotoristas/ {
        alias /var/www/testesindimotoristas/frontend/dist/;
        index index.html;
        error_page 404 =200 /testesindimotoristas/index.html;
    }

    # API DEV
    location ^~ /testesindimotoristas/api/ {
        proxy_pass http://127.0.0.1:3002/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade `$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host `$host;
        proxy_cache_bypass `$http_upgrade;
    }

    # WEBSOCKET DEV
    location ^~ /testesindimotoristas/ws {
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade `$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host `$host;
        proxy_set_header X-Real-IP `$remote_addr;
        proxy_set_header X-Forwarded-For `$proxy_add_x_forwarded_for;
        proxy_read_timeout 86400;
    }

    # UPLOADS DEV
    location /testesindimotoristas/uploads/ {
        alias /var/www/testesindimotoristas/backend/uploads/;
    }

    # FRONTEND TESTE
    location ^~ /sindmotoristas_teste/ {
        alias /var/www/sindmotoristas_teste/frontend/dist/;
        index index.html;
        error_page 404 =200 /sindmotoristas_teste/index.html;
    }

    # API TESTE
    location ^~ /sindmotoristas_teste/api/ {
        proxy_pass http://127.0.0.1:3003/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade `$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host `$host;
        proxy_cache_bypass `$http_upgrade;
    }

    # WEBSOCKET TESTE
    location ^~ /sindmotoristas_teste/ws {
        proxy_pass http://127.0.0.1:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade `$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host `$host;
        proxy_set_header X-Real-IP `$remote_addr;
        proxy_set_header X-Forwarded-For `$proxy_add_x_forwarded_for;
        proxy_read_timeout 86400;
    }

    # UPLOADS TESTE
    location /sindmotoristas_teste/uploads/ {
        alias /var/www/sindmotoristas_teste/backend/uploads/;
    }

    # ATALHO PARA AS TVS
    location /tv/ {
        rewrite ^/tv/(.*)$ /sindtv/tv/$1 permanent;
    }

    location ^~ /sindtv/api/ {
        proxy_pass http://127.0.0.1:5000/api/;
    }

    location /uploads/ {
        if (`$http_referer ~* /sindmotoristas_teste) {
            rewrite ^/uploads/(.*)$ /sindmotoristas_teste/uploads/`$1 last;
        }
        if (`$http_referer ~* /testesindimotoristas) {
            rewrite ^/uploads/(.*)$ /testesindimotoristas/uploads/`$1 last;
        }
        root /var/www/sindmotoristas/backend;
        try_files `$uri @sindtv_uploads;
    }

    location /api/ {
        if (`$http_referer ~* /sindmotoristas_teste) {
            rewrite ^/api/(.*)$ /sindmotoristas_teste/api/`$1 last;
        }
        if (`$http_referer ~* /testesindimotoristas) {
            rewrite ^/api/(.*)$ /testesindimotoristas/api/`$1 last;
        }
        proxy_pass http://127.0.0.1:3000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade `$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host `$host;
        proxy_cache_bypass `$http_upgrade;
    }

    location @sindtv_uploads {
        root /var/www/sindtv/backend;
        try_files `$uri =404;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade `$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host `$host;
        proxy_cache_bypass `$http_upgrade;
    }

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/pessistemas.vps-kinghost.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pessistemas.vps-kinghost.net/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    listen 80;
    server_name pessistemas.vps-kinghost.net 187.45.255.59;
    return 301 https://`$host`$request_uri;
}
EOF
ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default && \
sudo nginx -t && sudo systemctl reload nginx && \
cd .. && \
(pm2 restart fttresp-app || pm2 start server/src/server.js --name fttresp-app) && \
pm2 save
"@

# 3. Execução Remota via Plink
Write-Host "`n--- Step 2: Conectando ao VPS e atualizando arquivo Nginx oficial na porta 5005 ---" -ForegroundColor Cyan

if (Test-Path $plinkPath) {
    & $plinkPath -pw $vpsPass "$vpsUser@$vpsIP" $vpsCommand
    Write-Host "`n==================================================" -ForegroundColor Green
    Write-Host "   DEPLOY E ROTEAMENTO OFICIAL APLICADOS NA PORTA 5005! " -ForegroundColor Green
    Write-Host "   Acesse em: https://pessistemas.vps-kinghost.net/fttresp/ " -ForegroundColor Green
    Write-Host "==================================================" -ForegroundColor Green
} else {
    Write-Host "Plink não localizado em $plinkPath." -ForegroundColor Yellow
}

#!/bin/bash
# Simple Forge deployment script with SSR support
# Copy this entire script to your Forge deployment script

cd /home/forge/hollowpress.graveyardjokes.com

git pull origin $FORGE_SITE_BRANCH

$FORGE_COMPOSER install --no-interaction --prefer-dist --optimize-autoloader --no-dev

npm ci
npm run build
npm run build:ssr

# Kill existing SSR processes
pkill -f "node bootstrap/ssr/ssr.js" 2>/dev/null || true
lsof -ti:13720 | xargs kill -9 2>/dev/null || true

# Configure SSR environment
if ! grep -q "INERTIA_SSR_PORT=13720" .env; then
    echo "INERTIA_SSR_PORT=13720" >> .env
fi
if ! grep -q "INERTIA_SSR_ENABLED=true" .env; then
    echo "INERTIA_SSR_ENABLED=true" >> .env
fi

# Laravel optimizations
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start SSR server
mkdir -p storage/logs
nohup node bootstrap/ssr/ssr.js > storage/logs/ssr.log 2>&1 &

# Wait for SSR to start
sleep 3

# Reload PHP-FPM
if [[ -f /home/forge/.forge/forge-php-version ]]; then
    PHP_VERSION=$(cat /home/forge/.forge/forge-php-version)
    sudo -S service php${PHP_VERSION}-fpm reload
fi
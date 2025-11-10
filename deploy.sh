#!/bin/bash

cd /home/forge/your-domain.com

# Pull latest changes
git pull https://github.com/JoshuaAckerly/hollowpress.git main

# Install/update composer dependencies
composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev

# Install/update npm dependencies and build assets
npm ci
npm run build

# Database setup handled manually
# Run: php artisan migrate --force
# Run: php artisan db:seed --force

# Clear and cache config
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Clear all caches first
php artisan cache:clear
php artisan view:clear
php artisan config:clear
php artisan route:clear

# Restart queue workers
php artisan queue:restart

# Reload PHP-FPM
sudo service php8.2-fpm reload
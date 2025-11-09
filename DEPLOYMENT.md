# HollowPress Deployment Guide

## Laravel Forge Setup

### 1. Server Requirements
- PHP 8.2+
- MySQL 8.0+
- Node.js 18+
- Composer

### 2. Environment Variables
Copy `.env.example` to `.env` and update:

```bash
APP_NAME=HollowPress
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=forge
DB_USERNAME=forge
DB_PASSWORD=your_db_password

MAIL_FROM_ADDRESS=noreply@your-domain.com
```

### 3. Forge Configuration

#### Site Setup
1. Create new site in Forge
2. Set repository: `https://github.com/JoshuaAckerly/hollowpress.git`
3. Set branch: `main`
4. Set web directory: `/public`

#### Database Setup
1. Create MySQL database in Forge
2. Update `.env` with database credentials

#### Deployment Script
Use the provided `deploy.sh` or add to Forge:

```bash
cd /home/forge/your-domain.com
git pull origin main
composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev
npm ci && npm run build
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan queue:restart
sudo service php8.2-fpm reload
```

### 4. Initial Database Setup

After first deployment, run:
```bash
php artisan db:seed --class=ProductionSeeder
```

### 5. SSL Certificate
Enable SSL certificate in Forge for HTTPS.

### 6. Queue Workers (Optional)
If using queues, set up queue workers in Forge.

## Manual Deployment Steps

1. Push code to repository
2. Deploy via Forge dashboard
3. Verify site is working
4. Check logs for any errors

## Troubleshooting

- Check Forge logs for deployment errors
- Verify file permissions
- Ensure all environment variables are set
- Check database connection
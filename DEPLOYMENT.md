# HollowPress Deployment Guide

## 🚀 Production Deployment

### Hypervisor Production Deployment

HollowPress uses Hypervisor for production deployment to AWS EC2.

### Quick Deploy to Production

```bash
# On production server
cd /var/www/hollowpress
./deploy-production.sh
```

### Production Server Requirements
- PHP 8.3+
- MySQL 8.0+
- Node.js 22+
- Nginx
- Redis
- Supervisor
- PM2 (for SSR management)

### Production Environment Variables

Copy `.env.example` to `.env` and update:

```bash
APP_NAME=HollowPress
APP_ENV=production
APP_DEBUG=false
APP_URL=https://hollowpress.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hollowpress_prod
DB_USERNAME=hollowpress_prod
DB_PASSWORD=secure_password_here

INERTIA_SSR_ENABLED=true
INERTIA_SSR_URL=http://127.0.0.1:13720
INERTIA_SSR_PORT=13720

MAIL_FROM_ADDRESS=noreply@hollowpress.com
```

## 🧪 Test Server Deployment

For deploying to the polyrepo test server, see the main [TEST_DEPLOYMENT.md](../TEST_DEPLOYMENT.md) guide.

### Quick Deploy to Test Server

```bash
# On test server
cd /var/www/hollowpress
./deploy-test.sh
```

### Server Requirements
- PHP 8.3+
- MySQL 8.0+
- Node.js 22+
- Nginx
- Redis
- Supervisor

### Environment Variables

Copy `.env.example` to `.env` and update:

```bash
APP_NAME=HollowPress
APP_ENV=staging
APP_DEBUG=true
APP_URL=https://test-hollowpress.yourdomain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hollowpress
DB_USERNAME=hollowpress
DB_PASSWORD=test123password

INERTIA_SSR_ENABLED=true
INERTIA_SSR_URL=http://127.0.0.1:13720
INERTIA_SSR_PORT=13720

MAIL_FROM_ADDRESS=noreply@test-hollowpress.yourdomain.com
```

## 📝 Manual Deployment Steps

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Update"
   git push origin main
   ```

2. **SSH to test server and deploy**
   ```bash
   ssh user@YOUR_VM_IP
   cd /var/www/hollowpress
   ./deploy-test.sh
   ```

## 🔧 Troubleshooting

### Check Logs
```bash
tail -f storage/logs/laravel.log
tail -f storage/logs/ssr.log
```

### Verify SSR Server
```bash
lsof -i :13720  # Should show node process
```

### Clear Caches
```bash
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear
```

### Fix Permissions
```bash
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```
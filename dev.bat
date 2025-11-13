@echo off
echo Starting Hollow Press Development Servers...
echo.
echo Backend: http://127.0.0.1:8006
echo Frontend: http://127.0.0.1:5179
echo.

start "Hollow Press Backend" cmd /k "php artisan serve --port=8006"
timeout /t 2 /nobreak >nul
start "Hollow Press Frontend" cmd /k "npm run dev"

echo Development servers started!
echo Press any key to exit...
pause >nul
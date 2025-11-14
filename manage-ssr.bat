@echo off
setlocal enabledelayedexpansion

REM SSR Management Script for Multiple Laravel Projects (Windows)
REM Usage: manage-ssr.bat [start|stop|restart|status] [project_name]

REM Configuration - Update these paths to your actual project directories
set "PROJECT_hollowpress=C:\Users\acker\Herd\hollowpress"
set "PROJECT_project2=C:\path\to\project2"
set "PROJECT_project3=C:\path\to\project3"
set "PROJECT_project4=C:\path\to\project4"
set "PROJECT_project5=C:\path\to\project5"

set "PORT_hollowpress=13720"
set "PORT_project2=13715"
set "PORT_project3=13716"
set "PORT_project4=13717"
set "PORT_project5=13718"

if "%1"=="" goto show_help
if "%2"=="" goto show_help

set "action=%1"
set "target=%2"

if "%action%"=="start" goto start_action
if "%action%"=="stop" goto stop_action
if "%action%"=="restart" goto restart_action
if "%action%"=="status" goto status_action
goto show_help

:start_action
if "%target%"=="all" (
    call :start_ssr hollowpress
    call :start_ssr project2
    call :start_ssr project3
    call :start_ssr project4
    call :start_ssr project5
) else (
    call :start_ssr %target%
)
goto end

:stop_action
if "%target%"=="all" (
    call :stop_ssr hollowpress
    call :stop_ssr project2
    call :stop_ssr project3
    call :stop_ssr project4
    call :stop_ssr project5
) else (
    call :stop_ssr %target%
)
goto end

:restart_action
if "%target%"=="all" (
    call :stop_ssr hollowpress
    call :stop_ssr project2
    call :stop_ssr project3
    call :stop_ssr project4
    call :stop_ssr project5
    timeout /t 3 >nul
    call :start_ssr hollowpress
    call :start_ssr project2
    call :start_ssr project3
    call :start_ssr project4
    call :start_ssr project5
) else (
    call :stop_ssr %target%
    timeout /t 3 >nul
    call :start_ssr %target%
)
goto end

:status_action
if "%target%"=="all" (
    call :status_ssr hollowpress
    call :status_ssr project2
    call :status_ssr project3
    call :status_ssr project4
    call :status_ssr project5
) else (
    call :status_ssr %target%
)
goto end

:stop_ssr
set "project=%1"
call set "port=%%PORT_%project%%%"
if "!port!"=="" (
    echo Unknown project: %project%
    goto :eof
)

echo Stopping SSR for %project% on port !port!...

REM Kill processes using the port
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":!port!"') do (
    taskkill /PID %%a /F >nul 2>&1
)

echo SSR stopped for %project%
goto :eof

:start_ssr
set "project=%1"
call set "project_path=%%PROJECT_%project%%%"
call set "port=%%PORT_%project%%%"

if "!project_path!"=="" (
    echo Unknown project: %project%
    goto :eof
)

if not exist "!project_path!" (
    echo Error: Project directory !project_path! does not exist
    goto :eof
)

echo Starting SSR for %project% on port !port!...

cd /d "!project_path!"

REM Check if .env has correct port
findstr /C:"INERTIA_SSR_PORT=!port!" .env >nul 2>&1
if errorlevel 1 (
    echo Warning: .env file doesn't have INERTIA_SSR_PORT=!port!
    echo Please add: INERTIA_SSR_PORT=!port! to your .env file
)

REM Build SSR if needed
if not exist "bootstrap\ssr\ssr.js" (
    echo Building SSR bundle...
    npm run build:ssr
)

REM Start SSR in background
start /B node bootstrap\ssr\ssr.js > storage\logs\ssr.log 2>&1
echo SSR started for %project%
goto :eof

:status_ssr
set "project=%1"
call set "port=%%PORT_%project%%%"
if "!port!"=="" (
    echo Unknown project: %project%
    goto :eof
)

netstat -ano | findstr ":!port!" >nul 2>&1
if errorlevel 1 (
    echo %project%: Not running on port !port!
) else (
    echo %project%: Running on port !port!
)
goto :eof

:show_help
echo Usage: %0 [start^|stop^|restart^|status] [project_name^|all]
echo.
echo Available projects:
echo   - hollowpress (port 13720)
echo   - project2 (port 13715)
echo   - project3 (port 13716)
echo   - project4 (port 13717)
echo   - project5 (port 13718)
echo.
echo Examples:
echo   %0 start hollowpress
echo   %0 stop all
echo   %0 status all
echo   %0 restart project2
goto end

:end
endlocal
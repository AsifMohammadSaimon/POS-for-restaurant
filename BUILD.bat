@echo off
title Mady Builder
color 0A
echo ============================================
echo   Mady POS - Auto Builder
echo ============================================
echo.
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed!
    echo Please download it from https://nodejs.org
    pause & exit /b
)
echo [1/4] Removing old node_modules...
if exist node_modules (
    rmdir /s /q node_modules
)
echo.
echo [2/4] Installing dependencies...
call npm install --legacy-peer-deps
if errorlevel 1 ( echo [ERROR] npm install failed. & pause & exit /b )
echo.
echo [3/4] Building the app...
call npm run build
if errorlevel 1 ( echo [ERROR] Build failed. & pause & exit /b )
echo.
echo [4/4] Packaging as Windows .exe...
call npx electron-builder --win
if errorlevel 1 ( echo [ERROR] Packaging failed. & pause & exit /b )
echo.
echo ============================================
echo   SUCCESS! Your .exe is in the release folder.
echo ============================================
explorer release
pause

@echo off
chcp 65001 >nul 2>&1
setlocal enabledelayedexpansion

echo.
echo   ╔══════════════════════════════════════════╗
echo   ║   emdash-zh Translation Rebuild          ║
echo   ║   (dictionary update only)               ║
echo   ╚══════════════════════════════════════════╝
echo.

set "PROJECT_DIR=%~dp0"

:: ── 1. Build ───────────────────────────────────────────────────
echo [..] Building engine...
node "!PROJECT_DIR!tools\build.mjs"
if !errorlevel! neq 0 (
    echo [ERROR] Build failed
    pause
    exit /b 1
)

:: ── 2. Find Emdash and deploy ──────────────────────────────────
set "FOUND=0"
for %%p in (
    "E:\emdash\resources"
    "%LOCALAPPDATA%\Programs\emdash\resources"
    "D:\emdash\resources"
) do (
    if !FOUND! equ 0 if exist "%%~p\app\out\renderer\assets\" (
        set "EMDASH_RESOURCES=%%~p"
        set "FOUND=1"
    )
)

if !FOUND! equ 0 (
    echo [ERROR] Emdash app/assets directory not found
    pause
    exit /b 1
)

copy /y "!PROJECT_DIR!dist\emdash-zh.js" "!EMDASH_RESOURCES!\app\out\renderer\assets\emdash-zh.js" >nul 2>&1
echo [OK] Deployed to: !EMDASH_RESOURCES!\app\out\renderer\assets\

:: ── 3. Done ────────────────────────────────────────────────────
echo.
echo   Rebuild complete. Restart Emdash to see updated translations.
echo.
pause

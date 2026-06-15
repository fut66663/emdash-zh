@echo off
chcp 65001 >nul 2>&1
setlocal enabledelayedexpansion

echo.
echo   ╔══════════════════════════════════════════╗
echo   ║   Emdash Chinese Localization            ║
echo   ║   Uninstaller                            ║
echo   ╚══════════════════════════════════════════╝
echo.

:: ── 1. Find Emdash ────────────────────────────────────────────
set "FOUND=0"

if exist "%LOCALAPPDATA%\Programs\emdash\resources\app.asar.bak" (
    set "EMDASH_RESOURCES=%LOCALAPPDATA%\Programs\emdash\resources"
    set "FOUND=1"
)
if !FOUND! equ 0 if exist "%LOCALAPPDATA%\Programs\emdash\resources\app\out\renderer\index.html" (
    set "EMDASH_RESOURCES=%LOCALAPPDATA%\Programs\emdash\resources"
    set "FOUND=1"
)
if !FOUND! equ 0 if exist "E:\emdash\resources\app.asar.bak" (
    set "EMDASH_RESOURCES=E:\emdash\resources"
    set "FOUND=1"
)
if !FOUND! equ 0 if exist "E:\emdash\resources\app\out\renderer\index.html" (
    set "EMDASH_RESOURCES=E:\emdash\resources"
    set "FOUND=1"
)
if !FOUND! equ 0 if exist "D:\emdash\resources\app.asar.bak" (
    set "EMDASH_RESOURCES=D:\emdash\resources"
    set "FOUND=1"
)
if !FOUND! equ 0 if exist "D:\emdash\resources\app\out\renderer\index.html" (
    set "EMDASH_RESOURCES=D:\emdash\resources"
    set "FOUND=1"
)

if !FOUND! equ 0 (
    echo Emdash installation not found. Nothing to uninstall.
    pause
    exit /b 0
)

echo [OK] Emdash found: !EMDASH_RESOURCES!

:: ── 2. Restore index.html ─────────────────────────────────────
set "INDEX_HTML=!EMDASH_RESOURCES!\app\out\renderer\index.html"

if exist "!INDEX_HTML!.emdash-zh-backup" (
    copy /y "!INDEX_HTML!.emdash-zh-backup" "!INDEX_HTML!" >nul
    del "!INDEX_HTML!.emdash-zh-backup" >nul 2>&1
    echo [OK] Restored original index.html
) else if exist "!INDEX_HTML!" (
    findstr /v /c:"emdash-zh.js" "!INDEX_HTML!" > "!INDEX_HTML!.clean"
    if exist "!INDEX_HTML!.clean" (
        move /y "!INDEX_HTML!.clean" "!INDEX_HTML!" >nul
        echo [OK] Removed injection manually
    )
)

:: ── 3. Remove translation engine ──────────────────────────────
if exist "!EMDASH_RESOURCES!\app\out\renderer\assets\emdash-zh.js" (
    del "!EMDASH_RESOURCES!\app\out\renderer\assets\emdash-zh.js" >nul 2>&1
    echo [OK] Removed emdash-zh.js
)

:: ── 4. Restore main process ───────────────────────────────────
set "MAIN_JS=!EMDASH_RESOURCES!\app\out\main\index.js"
if exist "!MAIN_JS!.emdash-zh-backup" (
    copy /y "!MAIN_JS!.emdash-zh-backup" "!MAIN_JS!" >nul
    del "!MAIN_JS!.emdash-zh-backup" >nul 2>&1
    echo [OK] Restored original main process
)

:: ── 5. Restore app.asar ──────────────────────────────────────
if exist "!EMDASH_RESOURCES!\app.asar.bak" (
    if exist "!EMDASH_RESOURCES!\app.asar" (
        del "!EMDASH_RESOURCES!\app.asar" >nul 2>&1
    )
    move "!EMDASH_RESOURCES!\app.asar.bak" "!EMDASH_RESOURCES!\app.asar" >nul
    echo [OK] Restored app.asar
)

echo.
echo   Uninstallation complete. Restart Emdash.
echo.
pause

@echo off
chcp 65001 >nul 2>&1
setlocal enabledelayedexpansion

echo.
echo   ╔══════════════════════════════════════════╗
echo   ║     Emdash Chinese Localization          ║
echo   ║     emdash-zh v1.2.1 (MIT)               ║
echo   ╚══════════════════════════════════════════╝
echo.

:: ── 0. Check Node.js ──────────────────────────────────────────
where node >nul 2>&1
if !errorlevel! neq 0 (
    echo [ERROR] Node.js is required but not found.
    echo         Download: https://nodejs.org
    pause
    exit /b 1
)
for /f "tokens=*" %%v in ('node -v') do echo [OK] Node.js %%v

:: ── 1. Find Emdash installation ───────────────────────────────
set "FOUND=0"

if exist "%LOCALAPPDATA%\Programs\emdash\resources\app.asar" (
    set "EMDASH_RESOURCES=%LOCALAPPDATA%\Programs\emdash\resources"
    set "FOUND=1"
)
if !FOUND! equ 0 if exist "C:\Program Files\emdash\resources\app.asar" (
    set "EMDASH_RESOURCES=C:\Program Files\emdash\resources"
    set "FOUND=1"
)
if !FOUND! equ 0 if exist "E:\emdash\resources\app.asar" (
    set "EMDASH_RESOURCES=E:\emdash\resources"
    set "FOUND=1"
)
if !FOUND! equ 0 if exist "D:\emdash\resources\app.asar" (
    set "EMDASH_RESOURCES=D:\emdash\resources"
    set "FOUND=1"
)

if !FOUND! equ 0 (
    echo [ERROR] Emdash installation not found.
    echo.
    echo   Checked:
    echo     %%LOCALAPPDATA%%\Programs\emdash
    echo     C:\Program Files\emdash
    echo     E:\emdash
    echo     D:\emdash
    echo.
    echo   If Emdash is installed elsewhere, set the
    echo   EMDASH_RESOURCES environment variable and re-run.
    pause
    exit /b 1
)

echo [OK] Emdash found: !EMDASH_RESOURCES!

:: ── 2. Extract app.asar ───────────────────────────────────────
set "PROJECT_DIR=%~dp0"
set "NEED_EXTRACT=0"

if not exist "!EMDASH_RESOURCES!\app\out\renderer\index.html" (
    set "NEED_EXTRACT=1"
)

:: If app.asar reappeared, Emdash was updated — force re-extract
if exist "!EMDASH_RESOURCES!\app.asar" (
    echo [..] Detected new Emdash version, re-extracting...
    set "NEED_EXTRACT=1"
    :: Clean old extracted directory
    if exist "!EMDASH_RESOURCES!\app" (
        rmdir /s /q "!EMDASH_RESOURCES!\app" >nul 2>&1
    )
)

if "!NEED_EXTRACT!"=="1" (
    echo [..] Extracting app.asar (this takes ~10 seconds)...
    node "!PROJECT_DIR!tools\extract-asar.mjs" "!EMDASH_RESOURCES!"
    if !errorlevel! neq 0 (
        echo [ERROR] ASAR extraction failed.
        echo         Try running as Administrator, or manually extract:
        echo         npx @electron/asar extract app.asar app
        pause
        exit /b 1
    )
    echo [OK] Extraction complete
) else (
    echo [OK] app/ directory up to date
)

:: ── 3. Rename app.asar so Electron uses app/ directory ────────
if exist "!EMDASH_RESOURCES!\app.asar" (
    if not exist "!EMDASH_RESOURCES!\app.asar.bak" (
        move "!EMDASH_RESOURCES!\app.asar" "!EMDASH_RESOURCES!\app.asar.bak" >nul
        echo [OK] app.asar renamed to app.asar.bak
    ) else (
        del "!EMDASH_RESOURCES!\app.asar" >nul 2>&1
        echo [OK] app.asar removed (backup already exists)
    )
)

:: ── 4. Inject translation engine ──────────────────────────────
set "INDEX_HTML=!EMDASH_RESOURCES!\app\out\renderer\index.html"

if not exist "!INDEX_HTML!" (
    echo [ERROR] index.html not found: !INDEX_HTML!
    pause
    exit /b 1
)

:: Check if already injected
findstr /c:"emdash-zh.js" "!INDEX_HTML!" >nul 2>&1
if !errorlevel! equ 0 (
    echo [OK] Script tag already injected
) else (
    :: Create backup
    if not exist "!INDEX_HTML!.emdash-zh-backup" (
        copy /y "!INDEX_HTML!" "!INDEX_HTML!.emdash-zh-backup" >nul
        echo [OK] Backup: index.html.emdash-zh-backup
    )

    :: Inject before the module script line
    set "TEMP_FILE=!INDEX_HTML!.tmp"
    (
        for /f "usebackq delims=" %%a in ("!INDEX_HTML!") do (
            set "line=%%a"
            echo !line! | findstr /c:"type=\"module\"" >nul 2>&1
            if !errorlevel! equ 0 (
                echo     ^<script src="./assets/emdash-zh.js"^>^</script^>
            )
            echo !line!
        )
    ) > "!TEMP_FILE!"
    move /y "!TEMP_FILE!" "!INDEX_HTML!" >nul
    echo [OK] Script tag injected
)

:: ── 5. Copy translation engine ────────────────────────────────
copy /y "!PROJECT_DIR!dist\emdash-zh.js" "!EMDASH_RESOURCES!\app\out\renderer\assets\emdash-zh.js" >nul 2>&1
if !errorlevel! equ 0 (
    echo [OK] emdash-zh.js deployed
) else (
    echo [ERROR] Failed to deploy emdash-zh.js
    pause
    exit /b 1
)

:: ── 6. Patch native menu ──────────────────────────────────────
node "!PROJECT_DIR!tools\patch-main-menu.mjs" "!EMDASH_RESOURCES!"
if !errorlevel! equ 0 (
    echo [OK] Native menu translated
) else (
    echo [WARN] Menu patch skipped (DOM translations still work)
)

:: ── Done ──────────────────────────────────────────────────────
echo.
echo   ╔══════════════════════════════════════════╗
echo   ║   Installation complete!  ✓              ║
echo   ║                                          ║
echo   ║   Restart Emdash to see Chinese UI.      ║
echo   ║                                          ║
echo   ║   Uninstall: run uninstall.bat           ║
echo   ║   After Emdash update: re-run install    ║
echo   ╚══════════════════════════════════════════╝
echo.
pause

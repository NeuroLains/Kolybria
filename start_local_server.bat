@echo off
cd /d "%~dp0"
echo Запуск backend (почтовый сервер)...
start "" cmd /k "node server.cjs"

echo Запуск frontend...
call npm run dev
pause
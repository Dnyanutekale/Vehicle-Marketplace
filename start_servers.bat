@echo off
echo Starting Vehicle Marketplace...
start cmd /k ".\.venv\Scripts\python.exe manage.py runserver"
start cmd /k "cd frontend && npm run dev"
echo Servers are starting in new windows.
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:8000

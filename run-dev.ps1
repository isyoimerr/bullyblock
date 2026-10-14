$ErrorActionPreference = "Stop"

$projectPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectPath

Write-Host "Limpiando procesos antiguos del puerto 5173..."
Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue | ForEach-Object {
    if ($_.OwningProcess) {
        Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue
    }
}

if (-not (Test-Path (Join-Path $projectPath 'node_modules'))) {
    Write-Host "No hay dependencias instaladas. Ejecutando npm install..."
    npm install
}

Write-Host "Iniciando BullyBlock en http://localhost:5173"
npm run dev

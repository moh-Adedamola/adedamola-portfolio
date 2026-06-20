# scripts/prisma-env.ps1
# Usage: . .\scripts\prisma-env.ps1
# Loads .env.local into the current PowerShell session so Prisma CLI
# commands (migrate, studio, db seed) can find DATABASE_URL.

$envFile = Join-Path (Join-Path $PSScriptRoot "..") ".env.local"

Get-Content $envFile | Where-Object { $_ -match "^\s*[^#].*=.*" } | ForEach-Object {
  $parts = $_ -split "=", 2
  $key   = $parts[0].Trim()
  $value = $parts[1].Trim().Trim('"')
  [System.Environment]::SetEnvironmentVariable($key, $value, "Process")
  Write-Host "  Loaded: $key"
}

Write-Host ""
Write-Host "Env vars loaded from .env.local. You can now run Prisma commands."

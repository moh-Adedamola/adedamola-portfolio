#Requires -Version 5.1
# scaffold.ps1 — Bootstrap the Afeez founder portfolio
# Run from the project root: .\scaffold.ps1
$ErrorActionPreference = 'Stop'

# ── 1. Stash context\ and build\ into Windows temp ───────────────────────────
$stamp   = Get-Date -Format 'yyyyMMddHHmmss'
$tempDir = Join-Path $env:TEMP "portfolio-stash-$stamp"
New-Item -ItemType Directory -Path $tempDir | Out-Null
Write-Host "-> Stash directory: $tempDir"

$stashed = @()
foreach ($dir in 'context', 'build') {
    if (Test-Path $dir) {
        Move-Item -Path $dir -Destination (Join-Path $tempDir $dir)
        $stashed += $dir
        Write-Host "   stashed: $dir\"
    }
}

# ── 2. Scaffold into a temp subfolder, then hoist files to root ───────────────
$scaffoldDir = 'next-scaffold-tmp'

try {
    Write-Host ''
    Write-Host '-> Running create-next-app@latest...'

    npx create-next-app@latest $scaffoldDir `
        --typescript `
        --eslint `
        --tailwind `
        --app `
        --src-dir `
        --import-alias '@/*' `
        --use-npm

    if ($LASTEXITCODE -ne 0) { throw "create-next-app exited with code $LASTEXITCODE" }

    # Move every generated file/folder (including hidden ones like .gitignore)
    # up from the subfolder into the project root.
    Write-Host ''
    Write-Host '-> Hoisting generated files to project root...'
    Get-ChildItem -Path $scaffoldDir -Force | ForEach-Object {
        Move-Item -Path $_.FullName -Destination '.' -Force
    }
    Remove-Item -Path $scaffoldDir -Force

    # Fix the package.json "name" field — create-next-app sets it to the
    # subfolder name (_next_scaffold); correct it to the real project name.
    Write-Host '-> Fixing package.json name...'
    $pkgPath = '.\package.json'
    (Get-Content $pkgPath -Raw) `
        -replace '"name": "next-scaffold-tmp"', '"name": "adedamola-portfolio"' |
        Set-Content $pkgPath -Encoding UTF8

    # ── 3. Extend .gitignore with project-specific entries ────────────────────
    Write-Host '-> Extending .gitignore...'
    $extraLines = @(
        '',
        '# -- Project-specific --',
        '# Block bare .env files (Next.js default only blocks .env*.local)',
        '.env',
        '.env.*',
        '# Allow an example template to be committed',
        '!.env.example',
        '',
        '# Prisma generated client (created by: npx prisma generate)',
        'src/generated/'
    )
    Add-Content -Path '.gitignore' -Value $extraLines -Encoding UTF8

    Write-Host ''
    Write-Host 'Scaffold complete. Verify the setup:'
    Write-Host '  npm run dev    -> http://localhost:3000'
    Write-Host '  npm run build  -> should pass with zero errors'
}
finally {
    # Remove the temp subfolder if it still exists (failure path)
    if (Test-Path $scaffoldDir) {
        Remove-Item -Path $scaffoldDir -Recurse -Force -ErrorAction SilentlyContinue
    }

    # Always restore stashed folders
    Write-Host ''
    Write-Host '-> Restoring stashed folders...'
    foreach ($dir in $stashed) {
        $src = Join-Path $tempDir $dir
        if (Test-Path $src) {
            Move-Item -Path $src -Destination ".\$dir"
            Write-Host "   restored: $dir\"
        }
    }
    Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue
}

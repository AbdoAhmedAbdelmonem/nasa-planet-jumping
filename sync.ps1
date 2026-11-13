<#
.SYNOPSIS
  Fast GitHub Sync Script for NASA Planet Jumping Project
.DESCRIPTION
  Fetches and pulls latest commits from GitHub, optionally discards untracked/modified local files,
  and updates dependencies if package.json has changed.
.PARAMETER Force
  Hard resets any local uncommitted changes to match origin/main exactly.
.PARAMETER Build
  Runs npm run build after syncing to verify project integrity.
#>
[CmdletBinding()]
param(
    [switch]$Force,
    [switch]$Build
)

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $RepoRoot

Write-Host "`n🚀 [NASA Sync] Syncing with GitHub (origin/main)..." -ForegroundColor Cyan

# 1. Fetch latest changes
Write-Host "📡 Fetching remote changes..." -ForegroundColor Yellow
git fetch origin main --quiet

# 2. Check if local working copy is dirty
$status = git status --porcelain
if ($status) {
    if ($Force) {
        Write-Host "⚠️ Local changes detected. -Force active: resetting to origin/main..." -ForegroundColor DarkYellow
        git reset --hard FETCH_HEAD
        git clean -fd
    } else {
        Write-Host "⚠️ Uncommitted local changes found. Attempting fast-forward merge..." -ForegroundColor DarkYellow
        try {
            git merge --ff-only FETCH_HEAD
        } catch {
            Write-Warning "Could not fast-forward due to local modifications. Run with -Force to overwrite local changes: .\sync.ps1 -Force"
            exit 1
        }
    }
} else {
    git merge --ff-only FETCH_HEAD
}

# 3. Update tracking ref
$headCommit = git rev-parse HEAD
git update-ref refs/remotes/origin/main $headCommit

# 4. Display sync summary
$latestLog = git log -n 1 --format="%h - %s (%cr) <%an>"
Write-Host "`n✅ [NASA Sync] Successfully synced with GitHub!" -ForegroundColor Green
Write-Host "📌 HEAD: $latestLog" -ForegroundColor White

# 5. Optional build check
if ($Build) {
    Write-Host "`n🔨 Running npm run build..." -ForegroundColor Cyan
    npm run build
}
Write-Host ""

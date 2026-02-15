param(
  [string]$Owner = 'lalitbodana236',
  [string]$Repo = 'rent360-ui',
  [switch]$DryRun
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw 'GitHub CLI (gh) is not installed. Install with: winget install GitHub.cli'
}

$null = gh auth status --hostname github.com 2>$null
if ($LASTEXITCODE -ne 0) {
  throw 'gh is not authenticated. Run: gh auth login'
}

$issues = gh issue list --repo "$Owner/$Repo" --state all --limit 1000 --json number,title | ConvertFrom-Json
Write-Host "Total issues found: $($issues.Count)"

foreach ($i in $issues) {
  if ($DryRun) {
    Write-Host "[DRY-RUN] Would delete #$($i.number) - $($i.title)"
    continue
  }

  Write-Host "Deleting #$($i.number) - $($i.title)"
  gh issue delete $i.number --repo "$Owner/$Repo" --yes | Out-Null
}

if ($DryRun) {
  Write-Host 'Dry run mode was enabled. No issues were deleted.'
} else {
  Write-Host 'All issues deleted.'
}

param(
  [string]$Owner = 'lalitbodana236',
  [string]$Repo = 'rent360-ui',
  [string]$ProjectTitle = 'RENT360',
  [string]$SeedFile = 'scripts/project-seed/issues.json',
  [string]$ProgressOutput = 'docs/planning/monthly-progress-report.md',
  [switch]$DryRun,
  [switch]$BootstrapOnly,
  [switch]$ReportOnly
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

if (-not (Get-Command powershell -ErrorAction SilentlyContinue)) {
  throw 'PowerShell executable not found.'
}

if ($BootstrapOnly -and $ReportOnly) {
  throw 'Use only one of -BootstrapOnly or -ReportOnly.'
}

$bootstrapArgs = @(
  '-ExecutionPolicy','Bypass',
  '-File','scripts/bootstrap-github-project.ps1',
  '-Owner',$Owner,
  '-Repo',$Repo,
  '-ProjectTitle',$ProjectTitle,
  '-SeedFile',$SeedFile
)

$reportArgs = @(
  '-ExecutionPolicy','Bypass',
  '-File','scripts/project-progress-report.ps1',
  '-Owner',$Owner,
  '-Repo',$Repo,
  '-Output',$ProgressOutput
)

if ($DryRun) {
  $bootstrapArgs += '-DryRun'
}

if (-not $ReportOnly) {
  Write-Host '--- Running bootstrap step ---'
  & powershell @bootstrapArgs
  if ($LASTEXITCODE -ne 0) {
    throw 'Bootstrap step failed.'
  }
}

if (-not $BootstrapOnly) {
  Write-Host '--- Running progress report step ---'
  & powershell @reportArgs
  if ($LASTEXITCODE -ne 0) {
    throw 'Progress report step failed.'
  }
}

Write-Host 'Planning cycle completed successfully.'

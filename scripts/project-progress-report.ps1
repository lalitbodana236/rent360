param(
  [string]$Owner = 'lalitbodana236',
  [string]$Repo = 'rent360-ui',
  [string]$Output = 'docs/planning/monthly-progress-report.md'
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

$issues = gh issue list --repo "$Owner/$Repo" --state all --limit 1000 --json title,state,milestone,labels | ConvertFrom-Json

$storyIssues = $issues | Where-Object { $_.title -match '^\[(CORE|AUTH|DASH|PROP|TEN|PAY|SOC|MKT|COMM|REP|SET|OPS)-\d+\]' }

function Get-SprintNumber([object]$issue) {
  if ($issue.milestone -and $issue.milestone.title -match '^Sprint\s+(\d+)$') {
    return [int]$Matches[1]
  }

  $sprintLabel = $issue.labels | Where-Object { $_.name -match '^sprint-(\d+)$' } | Select-Object -First 1
  if ($sprintLabel -and $sprintLabel.name -match '^sprint-(\d+)$') {
    return [int]$Matches[1]
  }

  return $null
}

$bySprint = @{}
for ($i = 1; $i -le 12; $i++) {
  $bySprint[$i] = [pscustomobject]@{ Planned = 0; Completed = 0 }
}

foreach ($it in $storyIssues) {
  $s = Get-SprintNumber $it
  if (-not $s) { continue }
  if (-not $bySprint.ContainsKey($s)) { continue }

  $bySprint[$s].Planned += 1
  if ($it.state -eq 'CLOSED') {
    $bySprint[$s].Completed += 1
  }
}

$monthMap = @{
  1 = @(1,2)
  2 = @(3,4)
  3 = @(5,6)
  4 = @(7,8)
  5 = @(9,10)
  6 = @(11,12)
}

$lines = @()
$lines += '# Monthly Progress Report'
$lines += ''
$lines += "Repository: $Owner/$Repo"
$lines += "Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$lines += ''
$lines += '## Sprint Progress'
$lines += ''
$lines += '| Sprint | Planned | Completed | Remaining | Completion % |'
$lines += '|---|---:|---:|---:|---:|'

for ($i = 1; $i -le 12; $i++) {
  $planned = $bySprint[$i].Planned
  $completed = $bySprint[$i].Completed
  $remaining = [Math]::Max(0, $planned - $completed)
  $pct = if ($planned -eq 0) { 0 } else { [Math]::Round(($completed * 100.0) / $planned, 1) }
  $lines += "| Sprint $i | $planned | $completed | $remaining | $pct% |"
}

$lines += ''
$lines += '## Monthly Progress'
$lines += ''
$lines += '| Month | Sprints | Planned | Completed | Remaining | Completion % |'
$lines += '|---|---|---:|---:|---:|---:|'

for ($m = 1; $m -le 6; $m++) {
  $sprints = $monthMap[$m]
  $planned = 0
  $completed = 0
  foreach ($s in $sprints) {
    $planned += $bySprint[$s].Planned
    $completed += $bySprint[$s].Completed
  }
  $remaining = [Math]::Max(0, $planned - $completed)
  $pct = if ($planned -eq 0) { 0 } else { [Math]::Round(($completed * 100.0) / $planned, 1) }
  $lines += "| Month $m | Sprint $($sprints[0]) + Sprint $($sprints[1]) | $planned | $completed | $remaining | $pct% |"
}

$lines += ''
$lines += '## Action Notes'
$lines += ''
$lines += '1. Focus next week on high carry-over sprints.'
$lines += '2. Rebalance FE/BE/QA capacity where completion % is low.'
$lines += '3. Update monthly tracker file with this report values.'

$dir = Split-Path -Parent $Output
if ($dir -and -not (Test-Path $dir)) {
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

$lines -join "`r`n" | Set-Content -Path $Output
Write-Host "Generated: $Output"

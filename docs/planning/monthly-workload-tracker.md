# Monthly Workload Tracker (Rent360)

Use this to track monthly planned vs completed work at leadership level.

## Month Mapping
- Month 1: Sprint 1 + Sprint 2
- Month 2: Sprint 3 + Sprint 4
- Month 3: Sprint 5 + Sprint 6
- Month 4: Sprint 7 + Sprint 8
- Month 5: Sprint 9 + Sprint 10
- Month 6: Sprint 11 + Sprint 12

## Baseline Planned Story Count (from `scripts/project-seed/issues.json`)
- Month 1: 4
- Month 2: 3
- Month 3: 6
- Month 4: 8
- Month 5: 6
- Month 6: 7
- Total: 34

## Tracking Table
| Month | Sprint Range | Planned Stories | Completed Stories | Carry Over | Completion % | Notes |
|---|---|---:|---:|---:|---:|---|
| Month 1 | S1-S2 | 4 | 0 | 0 | 0% | |
| Month 2 | S3-S4 | 3 | 0 | 0 | 0% | |
| Month 3 | S5-S6 | 6 | 0 | 0 | 0% | |
| Month 4 | S7-S8 | 8 | 0 | 0 | 0% | |
| Month 5 | S9-S10 | 6 | 0 | 0 | 0% | |
| Month 6 | S11-S12 | 7 | 0 | 0 | 0% | |

## How To Update Monthly
1. Run the progress report script:
```powershell
powershell -ExecutionPolicy Bypass -File scripts/project-progress-report.ps1 -Owner lalitbodana236 -Repo rent360-ui
```
2. Copy the monthly numbers from generated report.
3. Update the table above and add decisions in Notes.

## Management Checks (Monthly Review)
1. Are critical-path stories completed on time?
2. Is carry-over rising for 2+ months?
3. Which module is bottlenecked (BE/FE/QA)?
4. Is velocity stable enough to keep roadmap target?

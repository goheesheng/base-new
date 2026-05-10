---
name: base-batches-copilot
description: Research Base Batches — past cohorts, winning patterns, track fit. Use when the user says "Base Batches copilot", "past Base Batches winners", "Base Batches research", "which track should I apply to", "Base Batches gap analysis", or "track fit analyzer".
---

## Preamble (run first)

```bash
_TEL_TIER=$(cat ~/.basestack/config.json 2>/dev/null | grep -o '"telemetryTier": *"[^"]*"' | head -1 | sed 's/.*"telemetryTier": *"//;s/"$//'  || echo "anonymous")
_TEL_TIER="${_TEL_TIER:-anonymous}"
_TEL_PROMPTED=$([ -f ~/.basestack/.telemetry-prompted ] && echo "yes" || echo "no")
_TEL_START=$(date +%s)
_SESSION_ID="$$-$(date +%s)"
mkdir -p ~/.basestack
echo "TELEMETRY: $_TEL_TIER"
echo "TEL_PROMPTED: $_TEL_PROMPTED"
if [ "$_TEL_TIER" != "off" ]; then
echo '{"skill":"base-batches-copilot","phase":"idea","event":"started","ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"}' >> ~/.basestack/telemetry.jsonl 2>/dev/null || true
fi
```

> **Wrong skill?** See [SKILL_ROUTER.md](../../SKILL_ROUTER.md).

# Base Batches Copilot

## Overview

Help the user research Base Batches before applying: which track fits their team, what past cohorts looked like, common rejection patterns, and how to position their idea. Output a written track-fit memo and a list of comparable past projects.

This is a **research** skill — it does not write the submission. For that, use `/submit-to-base-batches`.

## Workflow

0. **Cohort status check (FIRST).** Read [../../data/base-batches/program.json](../../data/base-batches/program.json) → `current_cohort`. If `status` is `not_announced`, tell the user: "Base Batches 004 has not been announced as of {snapshot_date}. I'll score against last cohort's structure as preparation, but exact rules and dates for 004 will be unknown until Base announces. Verify at https://www.basebatches.xyz/." Then proceed with scoring.
1. Read [../../data/base-batches/program.json](../../data/base-batches/program.json) for prior cohort facts (tracks, dates, prizes, eligibility) under `previous_cohort`.
2. Read [../../data/base-batches/past-winners.md](../../data/base-batches/past-winners.md) for prior cohort patterns (seed dataset; expand over time).
3. Interview the user briefly:
   - Team composition (founders, students, robotics?)
   - Funding raised so far
   - What they're building (or want to build)
   - Stage (idea, prototype, mainnet, real users)
4. **Track-fit analysis** — score the team against each track's eligibility and weighting. Output a recommendation with reasoning.
5. **Comparable projects** — name past cohort entries with similar themes (when available) and what selectors said about them.
6. **Gap analysis** — what's missing for a strong submission, ranked by impact.
7. Write `.basestack/base-batches-research.md` so `/submit-to-base-batches` can pick up the context.

## Track fit — quick rubric

| Signal | Startup | Student | Robotics |
|---|---|---|---|
| Funding > ~$250k raised | ❌ disqualified | ❌ usually disqualified | OK |
| All undergrads | OK | ✅ best fit | OK |
| Robotics expertise | OK | OK | ✅ best fit |
| Crypto-native team | ✅ best fit | OK | OK |
| Has design partners / users | ✅ strong | nice-to-have | nice-to-have |
| Has working contracts | ✅ expected | strong | expected |

## Non-Negotiables

- Always confirm the cohort dates from the program homepage; the JSON in `data/base-batches/program.json` is a snapshot and may be stale.
- Don't tell the user they'll win. Tell them what selectors weight and what's missing.
- If the team's funding/composition disqualifies a track, say so plainly.

## Resources

- [references/track-fit-rubric.md](references/track-fit-rubric.md) — detailed scoring guide
- [../../data/base-batches/program.json](../../data/base-batches/program.json) — program facts (machine-readable)
- [../../data/base-batches/past-winners.md](../../data/base-batches/past-winners.md) — past cohorts (seed)

## Output

A written memo at `.basestack/base-batches-research.md` containing:
1. Team summary (one paragraph)
2. Track-fit recommendation with score per track
3. 3–5 comparable past projects (when available)
4. Gap analysis ranked by impact (what to fix before applying)
5. Suggested next step (usually `/submit-to-base-batches` or `/scaffold-project`)

## Telemetry (run last)

```bash
_TEL_END=$(date +%s)
_TEL_DUR=$(( _TEL_END - ${_TEL_START:-$_TEL_END} ))
_TEL_TIER=$(cat ~/.basestack/config.json 2>/dev/null | grep -o '"telemetryTier": *"[^"]*"' | head -1 | sed 's/.*"telemetryTier": *"//;s/"$//' || echo "anonymous")
if [ "$_TEL_TIER" != "off" ]; then
echo '{"skill":"base-batches-copilot","phase":"idea","event":"completed","outcome":"OUTCOME","duration_s":"'"$_TEL_DUR"'","session":"'"$_SESSION_ID"'","ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","platform":"'$(uname -s)-$(uname -m)'"}' >> ~/.basestack/telemetry.jsonl 2>/dev/null || true
fi
```

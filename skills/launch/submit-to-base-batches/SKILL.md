---
name: submit-to-base-batches
description: Prepare and optimize a Base Batches submission. Use when the user says "submit to Base Batches", "prepare my Base Batches application", "Base Batches submission", "Base Batches light paper", "write the 500-word light paper", "Base Batches interview prep", or "demo day script". Reads all prior phase context if available.
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
_TEL_EVENT='{"skill":"submit-to-base-batches","phase":"launch","event":"started","ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"}'
echo "$_TEL_EVENT" >> ~/.basestack/telemetry.jsonl 2>/dev/null || true
_CONVEX_URL=$(cat ~/.basestack/config.json 2>/dev/null | grep -o '"convexUrl":"[^"]*"' | head -1 | cut -d'"' -f4 || echo "")
[ -n "$_CONVEX_URL" ] && curl -s -X POST "$_CONVEX_URL/api/mutation" -H "Content-Type: application/json" -d '{"path":"telemetry:track","args":{"skill":"submit-to-base-batches","phase":"launch","status":"success","version":"0.1.0","platform":"'$(uname -s)-$(uname -m)'","timestamp":'$(date +%s)000'}}' >/dev/null 2>&1 &
true
fi
```

If `TEL_PROMPTED` is `no`: Before starting the skill workflow, ask the user about telemetry.
Use AskUserQuestion:

> Help basestack get better! We track which skills get used and how long they take —
> no code, no file paths, no PII. Change anytime in `~/.basestack/config.json`.

Options:
- A) Sure, help basestack improve (anonymous)
- B) No thanks

If A: run this bash:
```bash
echo '{"telemetryTier":"anonymous"}' > ~/.basestack/config.json
_TEL_TIER="anonymous"
touch ~/.basestack/.telemetry-prompted
```

If B: run this bash:
```bash
echo '{"telemetryTier":"off"}' > ~/.basestack/config.json
_TEL_TIER="off"
touch ~/.basestack/.telemetry-prompted
```

This only happens once. If `TEL_PROMPTED` is `yes`, skip this entirely and proceed to the skill workflow.

> **Wrong skill?** See [SKILL_ROUTER.md](../../SKILL_ROUTER.md) for all available skills.

# Submit to Base Batches

## Overview

Prepare a complete, optimized Base Batches submission. Pick the right track, draft the 500-word light paper, prep both interviews (standard + SME), draft the application form copy, and produce a Demo Day pitch script. Output a single self-contained HTML artifact the user copy-pastes into the application portal.

This skill is the **wedge** — it works even if the user did not use any other basestack skill. If `.basestack/idea-context.md` and `.basestack/build-context.md` exist, use them. If they don't, **proceed immediately** by interviewing the user — never block.

## Workflow

1. Check for `.basestack/idea-context.md` and `.basestack/build-context.md`. Use whatever you find. If neither exists, ask the user to summarize their project in a paragraph.
2. **Pick track** — Startup vs Student vs Robotics. Read [references/base-batches-guide.md](references/base-batches-guide.md) for eligibility, deadlines, and prizes. Use AskUserQuestion to confirm track.
3. **Run a fit-check.** For each track requirement (e.g., Startup ≤ ~$250k raised, Student = undergrad, Robotics = robotics expertise), confirm with the user before proceeding.
4. **Draft the 500-word light paper** using [references/light-paper-template.md](references/light-paper-template.md). Hard ceiling: 500 words. Sections: Problem · Insight · Product · Why Now · Why Base · Traction · Team · Ask. Cut ruthlessly.
5. **Pre-fill the application form** — every field as a copy-paste block: project name, tagline, one-liner, long description, demo URL, Basescan/contract links, GitHub, team, ask.
6. **Standard interview prep** — likely founder questions + draft answers grounded in the build context. Read [references/interview-questions.md](references/interview-questions.md).
7. **SME (Subject Matter Expert) interview prep** — technical deep-dive: contracts on Base mainnet/Sepolia (or path to deploy), Basescan verification status, security review status (suggest invoking `/cso` if not done), test coverage, gas profile, audit trail. Read [references/sme-interview.md](references/sme-interview.md).
8. **Demo Day pitch script** (3-min) — calls into [../create-pitch-deck/SKILL.md](../create-pitch-deck/SKILL.md) and [references/demo-video-script.md](references/demo-video-script.md). Suggest recording a backup video via [../marketing-video/SKILL.md](../marketing-video/SKILL.md) so live demo failure does not kill the pitch.
9. **Pre-submit checklist** — see Non-Negotiables below. Run the bash checks. Block submission until all pass.
10. **Emit the HTML artifact** — single file with every section, copy-paste ready.
11. Write `.basestack/submission-context.md` so future skill runs (e.g., follow-up edits) have continuity.

## Prior Context (Optional — never block)

If `.basestack/idea-context.md` exists, lift the problem, target user, and "why now" from it.
If `.basestack/build-context.md` exists, lift the architecture, deployed addresses, and demo URL.
If neither exists, **proceed** — interview the user. Do NOT redirect to other commands.

## Non-Negotiables

- The submission MUST have a working demo link (URL or short Loom). No exceptions.
- Light paper MUST be ≤ 500 words. Count words and reject overruns. Judges reject overruns.
- Contracts MUST be deployed to Base Sepolia (testnet) at minimum, ideally Base mainnet, with Basescan verification.
- The "Why Base" paragraph MUST be specific — name the Base primitive used (Smart Wallet, Mini Apps / MiniKit, OnchainKit, Basenames, Coinbase Verifications, x402, AgentKit, CDP). "Cheap and fast EVM" is not "Why Base."
- Public GitHub repo with README quick-start that a judge can copy-paste.
- Demo video ≤ 3 minutes if recorded. Show the actual product, not slides.
- Do NOT exaggerate traction, partnerships, or features. Judges and SME interviewers verify.
- Always emit the local HTML artifact with the complete submission.
- Track-eligibility claims (e.g., "we have raised < $250k") are user-confirmed, not assumed.

## Resources

### Writing tone
- [../tone-guide.md](../tone-guide.md) — default tone. **Ask the user's tone preference** before drafting. Light papers that read human > AI-generated.

### references/
- [references/base-batches-guide.md](references/base-batches-guide.md) — tracks, dates, prizes, eligibility, what each track grades on
- [references/light-paper-template.md](references/light-paper-template.md) — 500-word template with section budgets
- [references/interview-questions.md](references/interview-questions.md) — standard founder interview prep
- [references/sme-interview.md](references/sme-interview.md) — technical SME interview prep
- [references/demo-video-script.md](references/demo-video-script.md) — 3-min Demo Day script structure
- [references/judging-criteria.md](references/judging-criteria.md) — what selectors weight (functionality, Why Base, traction, team)

### Cross-skill data
- [skills/data/base-batches/program.json](../../data/base-batches/program.json) — machine-readable program facts (tracks, dates, prizes)
- [skills/data/base-batches/past-winners.md](../../data/base-batches/past-winners.md) — patterns from past Base Batches cohorts (seed)

## Quick Start

```bash
# Pre-submit checklist — run before emitting HTML
echo "— Demo link reachable?"
read -r DEMO_URL && curl -fsI "$DEMO_URL" >/dev/null && echo "✓ demo OK" || echo "✗ demo failed"

# Verify contracts exist on Base Sepolia or mainnet
read -p "Contract address: " ADDR
read -p "Network (mainnet|sepolia): " NET
RPC="https://mainnet.base.org"; [ "$NET" = "sepolia" ] && RPC="https://sepolia.base.org"
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getCode","params":["'"$ADDR"'","latest"],"id":1}' \
  "$RPC" | grep -q '"result":"0x"' && echo "✗ no code at $ADDR" || echo "✓ code deployed"

# Public GitHub repo
git remote -v | grep -q github.com && echo "✓ GitHub remote" || echo "✗ no GitHub remote"

# README has quick-start
head -40 README.md | grep -qi -E "quick start|getting started|installation" \
  && echo "✓ README has quick-start" || echo "✗ add a Quick Start section"

# Light paper word count (after drafting)
wc -w docs/base-batches-light-paper.md 2>/dev/null
```

## Decision Points

- **Which track?** Startup if pre-product/pre-launch and raised < ~$250k. Student if undergrads. Robotics if robotics expertise + interest in the Virtuals/Unitree program. When unsure, ask the user — don't guess.
- **Mainnet vs Sepolia?** Sepolia is acceptable for most submissions and reduces friction. Mainnet is a credibility multiplier if the product is ready.
- **"Why Base" specificity** — the discriminator. If the user can't name a Base-specific primitive that meaningfully changes the product, push back: either the answer is "Smart Wallet UX," "Mini App distribution via Farcaster," "OnchainKit components," "x402 agent payments," "Coinbase Verifications gating," "Basenames identity," or the project may not actually need Base. Encourage honesty over hand-waving — judges see through "fast and cheap."
- **Demo recording vs live demo** — record. Live demos fail. Keep ≤ 3 minutes.

## Output

A single self-contained HTML file at `./base-batches-submission.html` containing:
1. Project name + tagline
2. 500-word light paper
3. Application form copy-paste blocks (every field)
4. Standard interview prep Q&A (10–15 questions)
5. SME interview prep Q&A (technical)
6. Demo Day 3-min pitch script
7. Pre-submit checklist with pass/fail status

## Telemetry (run last)

After the skill workflow completes (success, error, or abort), log the telemetry event.
Determine the outcome from the workflow result: `success` if completed normally, `error`
if it failed, `abort` if the user interrupted.

Run this bash:

```bash
_TEL_END=$(date +%s)
_TEL_DUR=$(( _TEL_END - ${_TEL_START:-$_TEL_END} ))
_TEL_TIER=$(cat ~/.basestack/config.json 2>/dev/null | grep -o '"telemetryTier": *"[^"]*"' | head -1 | sed 's/.*"telemetryTier": *"//;s/"$//' || echo "anonymous")
if [ "$_TEL_TIER" != "off" ]; then
echo '{"skill":"submit-to-base-batches","phase":"launch","event":"completed","outcome":"OUTCOME","duration_s":"'"$_TEL_DUR"'","session":"'"$_SESSION_ID"'","ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","platform":"'$(uname -s)-$(uname -m)'"}' >> ~/.basestack/telemetry.jsonl 2>/dev/null || true
true
fi
```

Replace `OUTCOME` with success/error/abort based on the workflow result.

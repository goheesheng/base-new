# CLAUDE.md — basestack (base-new)

## What this is

Skills and knowledge base to ship on Base — Idea to Base Batches. A Base-focused fork of `sendaifun/solana-new`.

## Install

```bash
curl -fsSL https://base.new/setup.sh | bash
```

If the domain isn't live yet:

```bash
curl -fsSL https://raw.githubusercontent.com/goheesheng/base-new/main/public/setup.sh \
  | BASESTACK_BASE_URL="https://raw.githubusercontent.com/goheesheng/base-new/main/public" bash
```

## Usage

Users invoke skills via Claude Code:

```bash
claude "/submit-to-base-batches Prep my Base Batches submission"
claude "/base-batches-copilot Which track should I apply to?"
claude "/find-next-crypto-idea What should I build on Base?"
claude "/scaffold-project Set up Foundry + OnchainKit"
```

## Wedge skill

`submit-to-base-batches` (under `skills/launch/`) is the wedge. It works standalone — even on projects that did not use any other basestack skill. It produces:

1. A 500-word light paper (hard ceiling enforced).
2. Pre-filled application form copy.
3. Standard founder interview prep.
4. SME (technical) interview prep.
5. 3-minute Demo Day pitch script.
6. Pre-submit checklist (demo URL, Basescan-verified contracts, GitHub, README quick-start, word count).
7. A single self-contained HTML artifact at `./base-batches-submission.html`.

## Skill priority for routing

When the user's prompt mentions Base Batches, light paper, the 500-word artifact, demo day, or interview prep — route to `submit-to-base-batches`. When the prompt is about which track to apply to, past cohorts, or track fit — route to `base-batches-copilot`.

For chain-agnostic phases (idea, validation, pitch, video) the upstream Solana-flavored skills work as-is.

For chain-specific build skills (`scaffold-project`, `deploy-to-mainnet`, `debug-program`, `build-defi-protocol`, `launch-token`, `verify-humanity-poh`, `virtual-solana-incubator`) — these still assume Solana. Use them as a structural guide; verify chain-specific instructions before running. Base-native rewrites are tracked in the README roadmap.

## Phase handoff

```
.basestack/idea-context.md         → scaffold-project reads to pick the stack
.basestack/build-context.md        → submit-to-base-batches reads to draft the light paper
.basestack/base-batches-research.md → submit-to-base-batches reads for track + gap analysis
.basestack/submission-context.md   → emitted by submit-to-base-batches for follow-up runs
```

Context files are optional, never gates. If missing, the skill interviews directly.

## File map

```
cli/
  branding.ts                # single source of truth for product strings (basestack)
  index.ts                   # command dispatcher
  telemetry.ts               # skill usage tracking (Convex + local JSONL)
  init.ts                    # auto-install skills to ~/.claude/skills/ etc
  data/
    clonable-repos.json      # legacy Solana repos (rewrite pending for Base)
    solana-skills.json       # legacy Solana skills (rewrite pending)
    solana-mcps.json         # legacy MCPs (rewrite pending)
skills/
  SKILL_ROUTER.md            # Base skills listed first
  README.md                  # skills overview + roadmap
  idea/
    base-batches-copilot/    # NEW — track fit + cohort research
    find-next-crypto-idea/   # chain-agnostic
    validate-idea/           # chain-agnostic
    competitive-landscape/   # chain-agnostic
    defillama-research/      # works for Base (filter chain)
    colosseum-copilot/       # legacy Solana, kept for reference
    solana-beginner/         # legacy Solana
    learn/                   # chain-agnostic
  build/                     # mostly Solana-flavored; rewrites pending
  launch/
    submit-to-base-batches/  # NEW — wedge skill
    submit-to-hackathon/     # legacy Colosseum prep
    create-pitch-deck/       # chain-agnostic
    marketing-video/         # chain-agnostic
    deploy-to-mainnet/       # Solana-flavored; Base rewrite pending
    apply-grant/             # Solana grant flavored
    video-craft/             # chain-agnostic
    tone-guide.md
  data/
    base-batches/            # NEW — program.json, past-winners.md
    base-knowledge/          # NEW — Base primitives reference
    colosseum/               # legacy
    solana-knowledge/        # legacy
    ideas/                   # 114+ curated startup ideas (filter for Base)
    defi/                    # DefiLlama API spec
    guides/                  # shared guides (some chain-agnostic, some Solana)
    specs/                   # phase handoff JSON contract
public/
  setup.sh                   # one-command install (downloads skills.tar.gz)
scripts/
  package-skills.sh          # builds public/skills.tar.gz
convex/                      # opt-in telemetry backend
```

## Conventions

- ESM-only (`.js` import extensions, NodeNext module resolution).
- Strict TypeScript, no implicit any.
- Skill SKILL.md files have frontmatter (`name`, `description`) — no other front-matter fields.
- All skills include the same telemetry preamble + telemetry coda; the body in between is what differs.
- Branding strings live in `cli/branding.ts` — change there, not scattered.
- `~/.basestack/` is the config dir; `.basestack/` is the project-local context dir. Skills must reference both correctly (not `~/.superstack/`).

## Roadmap

See README.md "Roadmap" — Base-native rewrites for the build phase are the highest priority after the wedge skill is shipping.

## Credit

This fork preserves the architecture and many skills from `sendaifun/solana-new` by SendAI + Superteam. Replacements and additions are noted as "NEW" above.

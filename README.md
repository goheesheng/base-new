# basestack
[![base.new](https://img.shields.io/badge/base.new-Install-0052FF?logo=coinbase&logoColor=white)](https://base.new)
[![Skills](https://img.shields.io/badge/skills-2_Base_native_+_legacy-0052FF)](#ecosystem-catalog)
[![Base Batches 004](https://img.shields.io/badge/Base_Batches_004-not_announced-FFB800)](https://www.basebatches.xyz/)
[![Fork of](https://img.shields.io/badge/fork_of-sendaifun%2Fsolana--new-555)](https://github.com/sendaifun/solana-new)
[![License](https://img.shields.io/github/license/goheesheng/base-new)](LICENSE)

The open-source platform behind [base.new](https://base.new) — journey skills + an in-browser drafter that take you from "what should I build for Base Batches?" to a submitted application. A Base-focused fork of [`sendaifun/solana-new`](https://github.com/sendaifun/solana-new).

Works with [Claude Code](https://claude.ai/code), [Codex](https://openai.com/index/codex/), and any agent that reads `~/.claude/skills/` or `~/.codex/skills/`.

> **Cohort status.** Base Batches 004 has not been announced as of 2026-05-10. The dates and rules referenced by these skills are from cohort 003 (closed). Skills surface this on first run; verify current at [basebatches.xyz](https://www.basebatches.xyz/) before submitting.

## Install

```bash
curl -fsSL https://base.new/setup.sh | bash
```

Until `base.new` is registered, install from this repo:

```bash
curl -fsSL https://raw.githubusercontent.com/goheesheng/base-new/main/public/setup.sh \
  | BASESTACK_BASE_URL="https://raw.githubusercontent.com/goheesheng/base-new/main/public" bash
```

Installs skills (Markdown prompts) to `~/.claude/skills/`, `~/.codex/skills/`, and `~/.agents/skills/`, plus the Base knowledge base, guides, and catalog data. Nothing touches your PATH or runs in the background.

**Requirements:** Git and Node.js 20+.

## Quick Start

The wedge — works standalone, even on projects that did not use any other basestack skill:

```bash
claude "/submit-to-base-batches Prep my Base Batches submission"
```

Or step through the journey:

```bash
claude "/find-next-crypto-idea What should I build on Base?"
claude "/base-batches-copilot Which track should I apply to?"
claude "/scaffold-project Set up Foundry + OnchainKit + Smart Wallet"
claude "/submit-to-base-batches Prep my submission"
```

Every skill interviews you first — never assumes. Or skip the install entirely and use the in-browser tools at [base.new/draft](https://base.new/draft) and [base.new/track](https://base.new/track).

## Journey Skills

Base Batches phase + 4 journey phases. You ask naturally, the right skill activates.

```
  BASE BATCHES             IDEA                     BUILD                          LAUNCH
  ──────────────────────   ──────────────────────   ───────────────────────────    ──────────────────────
  base-batches-copilot     find-next-crypto-idea    scaffold-project*              submit-to-base-batches
  submit-to-base-batches   validate-idea            build-with-claude              deploy-to-mainnet*
                           competitive-landscape    review-and-iterate             create-pitch-deck
                           defillama-research       cso                            marketing-video
                                                    roast-my-product               apply-grant
                                                    product-review
                                                    frontend-design-guidelines
                                                    brand-design
                                                    page-load-animations
                                                    number-formatting
                                                    design-taste

  *  = Solana-flavored, useful as a guide; Base rewrite in the roadmap below.
```

### Base Batches

| Skill | What it does |
|-------|-------------|
| `base-batches-copilot` | Track-fit rubric (Startup / Student / Robotics), cohort research, gap analysis. Surfaces 004-not-announced status. |
| `submit-to-base-batches` | The wedge. 500-word light paper drafter (hard ceiling), application form pre-fill, founder + SME interview prep, Demo Day script, pre-submit checklist, single self-contained HTML artifact. |

### Idea

| Skill | What it does |
|-------|-------------|
| `find-next-crypto-idea` | Interviews you to discover and rank crypto startup ideas |
| `validate-idea` | Stress-tests an idea with a structured validation sprint |
| `competitive-landscape` | Maps competitors, substitutes, and whitespace |
| `defillama-research` | Researches DeFi protocols on Base using real-time TVL data |

### Build

| Skill | What it does |
|-------|-------------|
| `scaffold-project` | Sets up workspace with the right repo, skills, MCPs *(Solana-flavored — rewrite pending)* |
| `build-with-claude` | Guides you through MVP implementation step by step |
| `review-and-iterate` | Code review for quality, security, and production readiness |
| `cso` | Infrastructure-first security audit: secrets, deps, CI/CD, OWASP |
| `roast-my-product` | Harsh, honest product critique — finds every weakness before judges do |
| `product-review` | Balanced UX/quality evaluation with improvement roadmap |
| `frontend-design-guidelines` | High-quality web interface rules with Tailwind + shadcn defaults |
| `brand-design` | Brand palette, typography, gradients, tone/voice |
| `page-load-animations` | Production framer-motion recipes for entrances, staggers, modals |
| `number-formatting` | Crypto UI number formatting — zero-subscript, abbreviations, dynamic decimals |
| `design-taste` | Design judgment, anti-AI-slop review, premium-feel direction |

### Launch

| Skill | What it does |
|-------|-------------|
| `submit-to-base-batches` | **The wedge** — full Base Batches submission packet |
| `deploy-to-mainnet` | Pre-flight checklist *(Solana-flavored — Base rewrite pending)* |
| `create-pitch-deck` | Structured pitch deck for Demo Day, VCs, or grants |
| `marketing-video` | Code-driven (Remotion) + AI-generated video production |
| `apply-grant` | Grant application helper *(originally Solana grants — usable as a template)* |

## In-browser tools

If you don't want to install the CLI, the same checks run in your browser:

| Tool | What it does |
|------|-------------|
| `base.new` | Landing page with install command, the journey, the side-terminal demo |
| `base.new/draft` | The 500-word light paper drafter with hard ceiling, per-section budgets, and Why Base specificity check |
| `base.new/track` | Interactive track-fit rubric with DQ surfacing |

The web tools are a static Next.js export — no backend, your draft saves to `localStorage`.

## How Phases Connect

Each phase writes context to `.basestack/` in your project. The next phase reads it automatically.

```
find-next-crypto-idea     ──writes──>  .basestack/idea-context.md
base-batches-copilot      ──writes──>  .basestack/base-batches-research.md
scaffold-project          ──reads───>  .basestack/idea-context.md
build-with-claude         ──writes──>  .basestack/build-context.md
submit-to-base-batches    ──reads───>  .basestack/{idea,build,base-batches-research}.md
                          ──writes──>  .basestack/submission-context.md
                          ──writes──>  ./base-batches-submission.html
```

Context files are optional, not gates. Skip to any phase — the skill asks you directly if context is missing.

## Ecosystem Catalog

Ships with a catalog of the Base ecosystem that skills search and recommend from.

| Catalog | Count | Examples |
|---------|-------|----------|
| **Base primitives** | 8 | Smart Wallet, Mini Apps + MiniKit, OnchainKit, Basenames, Coinbase Verifications, x402, AgentKit, CDP |
| **Knowledge** | 1 doc + growing | `data/base-knowledge/01-what-and-why-base.md` — when Base actually matters vs. when it's a wrapper |
| **Base Batches data** | program.json + past-winners.md | Tracks, dates, prizes, eligibility (snapshot); cohort patterns (seed) |
| **Inherited Solana catalogs** | 106 repos / 78 skills / 36 MCPs | From upstream solana-new — kept verbatim while Base catalogs are seeded |
| **Ideas** | 515+ | Curated from YC, a16z, Alliance, Superteam (filter for Base) |

Catalog data lives in `cli/data/` (legacy Solana — pending Base rewrite) and `skills/data/base-batches/` + `skills/data/base-knowledge/` (Base-native).

## Telemetry

Anonymous, opt-in, privacy-first. Tracks which skills get used and how long they take — no code, no file paths, no PII. Default is **off**.

```bash
# Check or change in ~/.basestack/config.json
# Options: "off" (default) | "anonymous" | "community"
```

## Project Structure

```
cli/
  branding.ts                 Single source of truth (PRODUCT_NAME=basestack, etc.)
  index.ts                    Command dispatcher and main entry
  telemetry.ts                Skill usage tracking (Convex + local JSONL)
  init.ts                     Auto-install skills to ~/.claude/ and ~/.codex/
  data/                       (Solana catalogs — Base rewrite pending)
skills/
  SKILL_ROUTER.md             Routing table — Base skills listed first
  README.md                   Skills overview + roadmap
  idea/
    base-batches-copilot/     NEW — track fit + cohort research
    find-next-crypto-idea/    chain-agnostic
    validate-idea/            chain-agnostic
    competitive-landscape/    chain-agnostic
    defillama-research/       works for Base (filter chain)
    (legacy Solana skills retained)
  build/                      Mostly Solana-flavored; rewrites pending
  launch/
    submit-to-base-batches/   NEW — wedge skill
    create-pitch-deck/        chain-agnostic
    marketing-video/          chain-agnostic
    (legacy Solana skills retained)
  data/
    base-batches/             NEW — program.json (cohort 004 status), past-winners.md
    base-knowledge/           NEW — Base primitives reference
    (legacy Solana data retained)
public/
  setup.sh                    One-command install (downloads skills.tar.gz)
scripts/
  package-skills.sh           Builds public/skills.tar.gz from skills/
web/
  app/                        Next.js 15 (App Router) — landing + /draft + /track
  components/                 InstallTerminal + TypingTerminal
  lib/                        lightPaper.ts (drafter logic) + trackFit.ts (rubric)
convex/                       Opt-in telemetry backend
```

## Roadmap

In priority order, the Base-native rewrites still to land:

- [ ] Backfill `data/base-batches/past-winners.md` from public 002/003 cohort announcements
- [ ] Rewrite `data/specs/phase-handoff.md` from `.superstack/` → `.basestack/`
- [ ] `build-mini-app` (new) — Farcaster Mini App via MiniKit + OnchainKit
- [ ] `smart-wallet-ux` (new) — passkey auth, batched calls, paymasters
- [ ] `agent-payments-x402` (new) — agent commerce via x402
- [ ] `evm-incubator` (replaces `virtual-solana-incubator`) — Solidity / Foundry / OZ / ERC-20 / 4626 / AA
- [ ] `scaffold-project` rewrite for Foundry + OnchainKit + Smart Wallet
- [ ] `deploy-to-mainnet` rewrite for Base Sepolia → mainnet + Basescan verify
- [ ] `debug-contract` (replaces `debug-program`) — Tenderly, `cast`, `forge debug`
- [ ] `build-defi-protocol` rewrite for Aerodrome, Morpho, Uniswap v4 hooks
- [ ] `cso` rewrite with EVM threat model (reentrancy, oracle, 4626 inflation, sig replay)
- [ ] When 004 is announced: update `program.json.current_cohort.status` to `open` with real dates

## Contributing

PRs welcome. Highest-leverage areas: filling out `past-winners.md`, rewriting Solana-flavored build skills for the Base stack, and seeding more Base ecosystem repos/MCPs into the catalog.

For new skills, the format is:

1. `skills/<phase>/<skill-name>/SKILL.md` with frontmatter (`name`, `description`).
2. `skills/<phase>/<skill-name>/references/` with methodology files.
3. Optional `agents/openai.yaml`.
4. Re-run `./scripts/package-skills.sh` to rebuild the bundle.

## Credits

Built on [solana-new](https://github.com/sendaifun/solana-new) by [SendAI](https://sendai.fun) and [Superteam](https://superteam.fun) — the skill framework, install pattern, telemetry approach, and many chain-agnostic skills (`find-next-crypto-idea`, `roast-my-product`, `create-pitch-deck`, `frontend-design-guidelines`, etc.) are theirs.

Powered by the Base ecosystem:

- [Base](https://base.org) and [Coinbase](https://coinbase.com) — L2, Smart Wallet, OnchainKit, CDP, Basenames, Verifications
- [Farcaster](https://farcaster.xyz) — Mini Apps surface
- [Foundry](https://github.com/foundry-rs/foundry), [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts), [viem](https://github.com/wevm/viem) — Contract + frontend tooling
- [DefiLlama](https://defillama.com) — TVL data for DeFi research
- [Anthropic](https://anthropic.com) and [OpenAI](https://openai.com) — Claude Code and Codex agent frameworks
- And the Base Batches team for running the program these skills target.

## License

[MIT](LICENSE) — matching upstream.

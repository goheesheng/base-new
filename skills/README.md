# Skills — Base Batches Edition

Codex / Claude / Agent skills that take a Base builder from "what should I build?" to a submitted Base Batches application. Every skill interviews you first — never assumes.

This is a Base-focused fork of `sendaifun/solana-new`. The skill _framework_ (interview-driven, phase-handoff, telemetry-opt-in, references/) is preserved as-is. Base-native skills are listed first in each phase.

```
  BASE BATCHES            IDEA                    BUILD                          LAUNCH
  ────────────────────    ────────────────────    ────────────────────────       ────────────────────
  base-batches-copilot    find-next-crypto-idea   scaffold-project*              submit-to-base-batches
  submit-to-base-batches  validate-idea           build-with-claude*             deploy-to-mainnet*
                          competitive-landscape   review-and-iterate             create-pitch-deck
                          defillama-research      cso                            marketing-video
                                                  roast-my-product
                                                  product-review
                                                  brand-design
                                                  frontend-design-guidelines
                                                  page-load-animations
                                                  number-formatting
                                                  design-taste

  *  = Solana-flavored (works for guidance, Base rewrite in progress)
```

## The wedge: `submit-to-base-batches`

If you take only one skill from this repo, take this one:

```bash
claude "/submit-to-base-batches Prep my Base Batches submission"
```

It works **standalone** — even if your project was built without basestack. It interviews you, drafts the 500-word light paper (hard ceiling enforced), pre-fills every application field, runs the pre-submit checklist, and emits a single HTML artifact you copy-paste into the application portal.

## The journey

### Phase 0 — Base Batches research

| Skill | What it does | Example prompt |
|---|---|---|
| `base-batches-copilot` | Track-fit analysis, past cohorts, gap analysis | "Which Base Batches track should I apply to?" |

### Phase 1 — Idea

| Skill | What it does | Example prompt |
|---|---|---|
| `find-next-crypto-idea` | Interview-driven idea discovery and ranking | "What should I build on Base?" |
| `validate-idea` | Structured validation sprint | "Stress-test my idea" |
| `competitive-landscape` | Map competitors, substitutes, opportunities | "Who else is doing this?" |
| `defillama-research` | DeFi market research (filter chain to Base) | "Show me Base DeFi opportunities" |

**Output**: `.basestack/idea-context.md`.

### Phase 2 — Build

Many of these are still Solana-flavored. They produce useful generic patterns; for Base specifics check the integration points yourself or rewrite as you go.

| Skill | What it does | Notes |
|---|---|---|
| `scaffold-project` | Workspace setup, repo + skills + MCPs | Solana-flavored — Foundry/OnchainKit rewrite pending |
| `build-with-claude` | Step-by-step MVP implementation | Mostly chain-agnostic |
| `review-and-iterate` | Code review for quality + security | Chain-agnostic |
| `cso` | Infra-first security audit | Useful checklist regardless of chain |
| `roast-my-product` | Brutal product critique | Chain-agnostic |
| `product-review` | Balanced UX/quality evaluation | Chain-agnostic |
| `frontend-design-guidelines` | Web interface rules with Tailwind/shadcn | Chain-agnostic |
| `brand-design` | Brand palette + typography + voice | Chain-agnostic |
| `page-load-animations` | Framer-motion recipes | Chain-agnostic |
| `number-formatting` | Crypto UI number formatting | Chain-agnostic |
| `design-taste` | Anti-AI-slop design judgment | Chain-agnostic |

**Output**: `.basestack/build-context.md`.

### Phase 3 — Launch (Base Batches submission + GTM)

| Skill | What it does | Example prompt |
|---|---|---|
| **`submit-to-base-batches`** | **Wedge skill — full Base Batches submission** | "Prep my Base Batches submission" |
| `deploy-to-mainnet` | Deployment checklist | Solana-flavored — Foundry rewrite pending |
| `create-pitch-deck` | Pitch deck for investors / Demo Day | Chain-agnostic |
| `marketing-video` | Demo videos via Remotion or AI | Chain-agnostic |
| `apply-grant` | Grant application helper | Solana-grant flavored |

## Phase handoff

Each phase writes markdown context to `.basestack/` in your project directory. The next phase reads it automatically.

```
.basestack/idea-context.md         → scaffold-project reads to pick the stack
.basestack/build-context.md        → submit-to-base-batches reads to draft the light paper
.basestack/base-batches-research.md → submit-to-base-batches reads for track + gap analysis
.basestack/submission-context.md   → emitted by submit-to-base-batches for follow-up runs
```

Context files are **optional, not gates**. Every skill proceeds immediately if context is missing — it just asks you directly instead.

## Base knowledge base

`data/base-knowledge/` is the seed knowledge base, mirroring solana-new's pattern:

| Doc | Covers |
|---|---|
| `01-what-and-why-base.md` | Base L2, native primitives, when Base actually matters |

`data/base-batches/` holds program facts:

| File | Covers |
|---|---|
| `program.json` | Tracks, dates, prizes, eligibility (snapshot — verify with homepage) |
| `past-winners.md` | Past cohort patterns (seed; expand over time) |

The legacy Solana knowledge base remains under `data/solana-knowledge/` for skills that still reference it.

## Getting started

```bash
curl -fsSL https://base.new/setup.sh | bash
```

Then ask directly:

```bash
claude "/submit-to-base-batches Prep my Base Batches submission"
claude "/find-next-crypto-idea I want to build on Base"
claude "/base-batches-copilot Which track should I apply to?"
```

## Adding a new skill

Skills live in the phase folder where they contribute most:

```
skills/
  idea/       ← discovery, research, validation, learning
  build/      ← scaffolding, implementation, review, security
  launch/     ← deployment, pitching, submissions, marketing
```

To add a new skill:

1. Create `skills/<phase>/<skill-name>/SKILL.md` with frontmatter (`name`, `description`).
2. Add `references/` with methodology and framework markdown files.
3. Optionally add `agents/openai.yaml` with display name and default prompt.
4. Re-run setup to install it.

The skill auto-discovers — no registration needed.

## Roadmap

Highest-priority Base-native rewrites still to land:

- `build-mini-app` (new) — Farcaster Mini App via MiniKit + OnchainKit
- `smart-wallet-ux` (new) — passkey auth, batched calls, paymasters
- `agent-payments-x402` (new) — agent commerce via x402
- `evm-incubator` (replaces `virtual-solana-incubator`) — Solidity, Foundry, OZ, ERC-20/721/1155/4626, AA
- `scaffold-project` rewrite for Foundry + OnchainKit + Smart Wallet
- `deploy-to-mainnet` rewrite for Base Sepolia → mainnet + Basescan verify
- `debug-contract` (replaces `debug-program`) — Tenderly, `cast`, `forge debug`
- `build-defi-protocol` rewrite for Aerodrome, Morpho, Uniswap v4 hooks, ERC-4626 vaults
- `cso` rewrite with EVM threat model (reentrancy, oracle, ERC-4626 inflation, signature replay)
- `verify-humanity` rewrite for World ID / Coinbase Verifications / Privy

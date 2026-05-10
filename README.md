# base-new — basestack for Base Batches

> Ship on Base — Idea to Base Batches.
>
> A Base-focused fork of [`sendaifun/solana-new`](https://github.com/sendaifun/solana-new).
> The skill framework is preserved; the catalog and the wedge skill (`submit-to-base-batches`) are Base-native.

## Why this exists

Base Batches is the front door to the Base ecosystem (Startup, Student, Robotics tracks → grants + a $50k investment from the Base Ecosystem Fund / Virtuals Fund + Demo Day). Submissions are graded on:

- a working demo,
- a 500-word light paper,
- a "Why Base" specific enough to name a primitive,
- a founder interview,
- an SME (technical) interview.

`base-new` is a CLI installer that drops Claude Code / Codex / Agents skills onto your machine to take you from idea → built product → submitted application. It mirrors the install pattern of `solana.new`.

## Install

```bash
curl -fsSL https://base.new/setup.sh | bash
```

This downloads `skills.tar.gz` and installs into:

- `~/.claude/skills/`
- `~/.codex/skills/`
- `~/.agents/skills/`
- `~/.basestack/manifest.json` (uninstall manifest)
- `~/.basestack/config.json` (telemetry preference)

Telemetry is opt-in. See `public/setup.sh` for the full install flow — you can audit it before running.

> Until `base.new` is registered, the install can run from this repo:
>
> ```bash
> curl -fsSL https://raw.githubusercontent.com/goheesheng/base-new/main/public/setup.sh \
>   | BASESTACK_BASE_URL="https://raw.githubusercontent.com/goheesheng/base-new/main/public" bash
> ```

## The wedge: `/submit-to-base-batches`

If you take only one skill, take this one. It works **standalone** — even if your project was built without basestack:

```bash
claude "/submit-to-base-batches Prep my Base Batches submission"
```

What it does:

1. Reads `.basestack/idea-context.md` and `.basestack/build-context.md` if they exist; otherwise interviews you.
2. Picks the right track (Startup / Student / Robotics) with a fit-check rubric.
3. Drafts the **500-word light paper** (hard ceiling enforced).
4. Pre-fills every application form field as a copy-paste block.
5. Preps the standard founder interview and the SME (technical) interview.
6. Generates a 3-minute Demo Day pitch script.
7. Runs the pre-submit checklist (demo URL, contracts on Basescan, public repo, README quick-start, light-paper word count).
8. Emits a single self-contained HTML artifact.

## Phases

| Phase | Skills (Base-native first) |
|---|---|
| Base Batches | `base-batches-copilot`, `submit-to-base-batches` |
| Idea | `find-next-crypto-idea`, `validate-idea`, `competitive-landscape`, `defillama-research` |
| Build | `scaffold-project`*, `build-with-claude`, `review-and-iterate`, `cso`, `roast-my-product`, `product-review`, `frontend-design-guidelines`, `brand-design`, `page-load-animations`, `number-formatting`, `design-taste` |
| Launch | `submit-to-base-batches`, `deploy-to-mainnet`*, `create-pitch-deck`, `marketing-video`, `apply-grant` |

`*` = Solana-flavored, useful as a guide but Base rewrite pending. See `skills/README.md` for the roadmap.

## Repo layout

```
base-new/
├── public/setup.sh           # one-command install, downloads skills.tar.gz
├── install.sh                # alternative npm-package install path
├── cli/                      # TS dispatcher + telemetry + catalog data
│   ├── branding.ts           # SINGLE source of truth for product strings
│   └── data/                 # repos, skills, MCPs catalogs (Solana — rewrite pending)
├── skills/
│   ├── SKILL_ROUTER.md       # routing table — Base skills listed first
│   ├── README.md             # skills overview
│   ├── idea/
│   │   ├── base-batches-copilot/   # NEW — track fit + cohort research
│   │   └── (find-next-crypto-idea, validate-idea, …)
│   ├── build/                # mostly Solana-flavored, rewrites pending
│   ├── launch/
│   │   ├── submit-to-base-batches/ # NEW — wedge skill
│   │   ├── submit-to-hackathon/    # legacy Solana/Colosseum prep
│   │   └── (create-pitch-deck, marketing-video, …)
│   └── data/
│       ├── base-batches/     # NEW — program.json, past-winners.md
│       ├── base-knowledge/   # NEW — Base primitives reference
│       ├── colosseum/        # legacy
│       ├── solana-knowledge/ # legacy
│       └── (ideas, defi, guides, specs)
├── scripts/
│   └── package-skills.sh     # builds public/skills.tar.gz from skills/
└── convex/                   # opt-in telemetry backend
```

## Pack the skill bundle

```bash
./scripts/package-skills.sh
# → public/skills.tar.gz, served to install.sh / setup.sh
```

If you self-host on a domain, point the install URL at it. If you stay on GitHub raw, set `BASESTACK_BASE_URL` to the raw URL.

## Roadmap (Base-native rewrites still to land)

- `build-mini-app` — Farcaster Mini App via MiniKit + OnchainKit
- `smart-wallet-ux` — passkey auth, batched calls, paymasters
- `agent-payments-x402` — agent commerce via x402
- `evm-incubator` — Solidity / Foundry / OZ / ERC-20 / ERC-4626 / AA
- `scaffold-project` rewrite for Foundry + OnchainKit + Smart Wallet
- `deploy-to-mainnet` rewrite for Base Sepolia → mainnet + Basescan verify
- `debug-contract` — Tenderly, `cast`, `forge debug`
- `build-defi-protocol` rewrite for Aerodrome, Morpho, Uniswap v4 hooks
- `cso` rewrite with EVM threat model (reentrancy, oracle, 4626 inflation, sig replay)
- `verify-humanity` rewrite for World ID / Coinbase Verifications / Privy

PRs welcome.

## Credit

This is a fork of [`sendaifun/solana-new`](https://github.com/sendaifun/solana-new) by SendAI + Superteam. The skill framework, install pattern, telemetry approach, and many of the chain-agnostic skills (`find-next-crypto-idea`, `roast-my-product`, `create-pitch-deck`, `frontend-design-guidelines`, etc.) are theirs. Base-specific skills, catalogs, and rewrites are this fork's.

## License

MIT, matching upstream.

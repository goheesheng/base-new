# Base Batches — Program Guide

What Base Batches is, who can apply, what to ship, and how each track is graded.

> ## ⚠ Cohort status (snapshot 2026-05-10)
>
> **Base Batches 004 — the next cohort — has NOT been announced as of this writing.**
> The dates, prize amounts, and submission rules below are from the **previous cohort (003)**, which has already closed. Do not submit against these dates.
>
> Before drafting a submission:
> 1. Open https://www.basebatches.xyz/ — the homepage tells you whether a cohort is currently open and what the dates are.
> 2. If no cohort is open, decide whether to (a) wait, (b) prep now and submit when 004 opens, or (c) target a different program.
> 3. Skills will draft the submission either way — drafting against last cohort's structure is reasonable preparation, but the user must know dates haven't been re-confirmed.
>
> The skill (`submit-to-base-batches`) MUST surface this status check before drafting. Do not silently assume the previous cohort's windows.

## What Base Batches is

A Base-run accelerator with three parallel tracks (Startup, Student, Robotics). The goal: take builders from idea / pre-launch through Demo Day with mentorship, capital access, and a public stage. Successful teams enter the Base ecosystem with grants and follow-on investment from the Base Ecosystem Fund and (for Robotics) the Virtuals Fund.

## Tracks

### Startup track
- **Who**: Pre-seed teams that have raised less than ~$250k. Pre-product, pre-launch, or pre-seed stages.
- **Application window**: ~Feb 17 – Mar 9 (per current cohort). Verify dates.
- **Program**: ~Mar 23 – May 15. 8-week virtual program.
- **Prizes**:
  - Top 15 teams: $10k grant + 8-week program + Demo Day spot.
  - Min 3 teams: $50k investment from the Base Ecosystem Fund.
- **Selection signal**: investability. Treat the application like a pre-seed pitch, not a hackathon entry.

### Student track
- **Who**: Undergraduate students, worldwide. Cross-university teams allowed.
- **Application window**: ~Feb 17 – Apr 27.
- **Prizes**: Top 5 teams — flights to San Francisco + Demo Day presentation.
- **Selection signal**: technical chops + a real demo. Less weight on traction; more on what you actually built.

### Robotics track (by Virtuals)
- **Who**: Builders with robotics expertise or strong demonstrated interest.
- **Application window**: ~Feb 16 – Mar 30.
- **Program**: ~Apr 6 – May 1. Demo Day May 4 + late May.
- **Cohort size**: 10 teams.
- **Resources**: Robotics lab access, ~30 Unitree G1 units, expenses up to $10k covered.
- **Prizes**: 3 winning teams — $50k investment from Virtuals Fund.
- **Selection signal**: technical experience in robotics policies, plus a viable Base/onchain hook.

## Submission requirements (Startup)

1. Standard application form.
2. **500-word light paper** — Problem · Insight · Product · Why Now · Why Base · Traction · Team · Ask.
3. Standard founder interview.
4. Subject Matter Expert (SME) interview — technical deep-dive.

The SME interview is where many strong-on-paper submissions fall apart. Treat it as a technical fitness test: deployed addresses, Basescan verification, test coverage, security review status, gas profile, and a coherent answer to "why Base specifically."

## What each track actually grades

These are inferred from the public program copy and the way past Coinbase / Base programs run. Treat as a starting heuristic, not gospel.

| Criterion | Startup weight | Student weight | Robotics weight |
|---|---|---|---|
| Working demo | High | **Highest** | High |
| Why Base (primitive specificity) | **Highest** | High | Med |
| Founder/team quality | **Highest** | High | High |
| Technical execution | Med | High | **Highest** |
| Traction / users | Med | Low | Low |
| Market size & ask | High | Low | Med |

## "Why Base" — the discriminator

The single most common reason to lose. "Cheap, fast, EVM L2" is not "Why Base." A strong Why Base names a specific primitive that meaningfully changes the product:

- **Smart Wallet** — passkey auth, batched calls, gas sponsorship without 4337 plumbing.
- **Mini Apps + MiniKit** — Farcaster distribution channel; lets you reach users where they already are.
- **OnchainKit** — drops in identity, transactions, frames as React components; faster to a polished UI.
- **Basenames** — onchain identity primitive for the Coinbase distribution surface.
- **Coinbase Verifications** — onchain attestations (country, KYC) for compliant gating.
- **x402** — agent commerce protocol; lets autonomous agents pay for resources via HTTP 402.
- **AgentKit** — Coinbase's agent toolkit, MPC wallets, onchain actions.
- **CDP (Coinbase Developer Platform)** — onramp, faucet, smart accounts, paymaster.

If your product would work identically on any L2, you don't have a Why Base. Either:
- find the primitive your product actually depends on, or
- pick a different program. Don't fake it.

## Common rejection patterns

1. Light paper ≥ 500 words (auto-reject in many cohorts).
2. No deployed contracts (or deployed but not verified on Basescan).
3. Generic Why Base ("we use Base because it's fast").
4. Founder interview reveals the team can't actually ship.
5. SME interview reveals the contracts are a fork with no novel work.
6. Demo URL broken at review time.
7. Track mismatch — e.g., a 4-person well-funded team applying to Student.

## Useful URLs

- Program homepage: https://www.basebatches.xyz/
- Base docs: https://docs.base.org/
- OnchainKit: https://onchainkit.xyz/
- Mini Apps: https://docs.base.org/mini-apps/
- Smart Wallet: https://docs.base.org/identity/smart-wallet/quickstart/
- Basescan: https://basescan.org/
- Base Sepolia faucet: https://www.base.org/builders/faucet

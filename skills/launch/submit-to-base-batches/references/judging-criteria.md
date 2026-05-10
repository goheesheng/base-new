# Selector / Judging Criteria — Base Batches

What selectors actually weight. Inferred from the public program copy and how Coinbase / Base programs have run historically. Use as a starting heuristic; the published rubric (when available) overrides this.

## Primary criteria

### 1. Working demo (heaviest single factor)
- Can a selector try the product right now?
- Live URL > recorded video > screenshots > "we'll deploy soon."
- Devnet / Sepolia is fine, **clearly labeled**.

**How to score high**: Demo URL in the application. README quick-start that runs in < 5 minutes. A backup recorded demo in case live breaks.

### 2. Why Base specificity
- Names a Base primitive (Smart Wallet, MiniKit, OnchainKit, Basenames, Coinbase Verifications, x402, AgentKit, CDP).
- Articulates why the product is materially worse on any other L2.

**How to score high**: One specific sentence. "Smart Wallet passkey auth replaces our 30s onboarding with 8s, doubling activation in our last A/B."

### 3. Founder/team
- Have they shipped before?
- Why this problem, why this team, why now?
- Skin in the game (left a job, going full-time, etc.).

**How to score high**: 2–3 sentences. Names + what each person shipped + GitHub/Farcaster/Twitter.

### 4. Technical execution (heavier in Robotics, lighter in Student)
- Code on GitHub. Public.
- Contracts verified on Basescan.
- Test coverage visible.
- Architecture coherent — frontend, contracts, indexer, off-chain match the claims.

**How to score high**: `forge coverage` ≥ 70%. README documents the architecture. `Deploy.s.sol` is real.

### 5. Traction
- Users, transactions, TVL, waitlist, design partner LOIs.
- Honest numbers > inflated ones. SME catches inflation later.
- Pre-traction is OK — declare it and name the next milestone.

**How to score high**: A real number with a recent date. "237 unique wallets connected in the last 14 days, +14% week-over-week."

### 6. Ask & coachability
- What you want from the program.
- Specificity. "Intros to {{type of design partner}}" beats "exposure."

## Track-specific weighting

| Criterion | Startup | Student | Robotics |
|---|---|---|---|
| Working demo | High | **Highest** | High |
| Why Base | **Highest** | High | Med |
| Team | **Highest** | High | High |
| Technical execution | Med | High | **Highest** |
| Traction | Med | Low | Low |
| Market & ask | High | Low | Med |

## Selector psychology

- They review hundreds of submissions per cohort.
- They spend 2–5 minutes per submission on the first pass.
- Light paper opening + demo URL + Why Base = 80% of the first-pass decision.
- They look for **reasons to advance**, not reasons to reject — give them a clear hook.

## Common rejection reasons

1. Light paper > 500 words → auto-reject in many cohorts.
2. Demo URL broken at review time.
3. Generic "Why Base."
4. Founder interview reveals weak shipping ability.
5. SME interview reveals contracts are unmodified forks.
6. Track mismatch (e.g., funded team applying to Student).
7. Inflated traction caught in interview.

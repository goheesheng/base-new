# 500-Word Light Paper Template

The light paper is the artifact selectors actually grade. Hard ceiling: 500 words. Overruns get auto-rejected in many cohorts. Aim for 480 to leave headroom.

## Section budget (target)

| Section | Words | Purpose |
|---|---|---|
| Title + tagline | ~20 | Lock the reader in 5 seconds |
| Problem | 60–80 | Whose problem, why it matters now |
| Insight | 40–60 | What you see that others don't |
| Product | 80–100 | What it does, how a user uses it (concrete) |
| Why Now | 40–60 | What changed (regulatory, technical, behavioral) |
| **Why Base** | 60–80 | Specific primitive(s); not generic |
| Traction | 30–60 | Real numbers; or "no traction yet, here's our plan" |
| Team | 30–50 | Who, why you, prior shipping |
| Ask | 20–30 | What you want from Base Batches |

Total ≈ 380–540. After a tight pass, land at ≤ 500.

## Template (fill, then cut)

```markdown
# {{Project Name}} — {{One-sentence tagline}}

## Problem
{{Describe a specific user with a specific pain. Avoid "users want." Start with a person doing a job.}}

## Insight
{{What is the non-obvious thing you believe? "We believe X, while everyone else believes Y." One paragraph.}}

## Product
{{What does it actually do, today? Walk through one concrete user flow in 3–5 sentences. Name the screens, the actions, the outcome. No hand-waving.}}

## Why Now
{{What changed in the last 6–18 months that makes this possible/timely? Regulation, infra (e.g., Smart Wallet GA), behavior (e.g., Farcaster Mini Apps), capital. One paragraph.}}

## Why Base
{{Name the Base primitive your product depends on and explain why your product is materially worse without it. Examples that pass: "Smart Wallet's passkey auth lets us onboard users in 8 seconds with no seed phrase." "We ship as a Mini App, distributed in Farcaster feeds — that's our user acquisition channel." "Coinbase Verifications let us geo-gate without KYC vendors."

Examples that fail: "Base is cheap and fast." "We chose Base for its growing ecosystem."}}

## Traction
{{Real numbers, not vibes. Users, transactions, TVL, waitlist count, design-partner LOIs, downloads. If you have nothing, say "no traction yet — here's the next 4 weeks." Honesty beats inflation; SME interviews verify.}}

## Team
{{Names, roles, what each person previously shipped. 2–3 sentences. Link Twitter/Farcaster/GitHub. Keep tight.}}

## Ask
{{What do you want? Grant + program is the obvious answer; be specific about the introductions, design partners, or technical reviewers you'd most benefit from.}}
```

## Word-count helper

```bash
# After writing the draft:
wc -w docs/base-batches-light-paper.md
# Aim for 480–500. Cut adverbs and qualifiers first.
```

## Cutting passes

1. **Adverbs and qualifiers**: "really," "actually," "very," "just" — almost always deletable.
2. **Throat-clearing**: "It's worth noting that," "We believe that," — cut.
3. **Hedge words**: "might," "could potentially" — pick a stance.
4. **Rephrasings**: if you said it once, don't say it again with different words.
5. **Marketing fluff**: "revolutionary," "next-generation," "best-in-class" — delete.

## Anti-patterns

- Opening with "Web3 is broken because…" (selectors have read this 1,000 times).
- A whole paragraph on the blockchain trilemma.
- Listing every chain you considered before picking Base.
- Naming team members without saying what they shipped before.
- A roadmap that lists Q3, Q4, 2027 (you're applying to an 8-week program).
- "Why Base" that consists of "Coinbase has 100M users."

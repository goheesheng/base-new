export type SectionId =
  | "title"
  | "problem"
  | "insight"
  | "product"
  | "why_now"
  | "why_base"
  | "traction"
  | "team"
  | "ask";

export interface SectionDef {
  id: SectionId;
  label: string;
  hint: string;
  placeholder: string;
  budget: [number, number];
}

export const SECTIONS: SectionDef[] = [
  {
    id: "title",
    label: "Title + tagline",
    hint: "Project name + one-sentence tagline. Lock the reader in 5 seconds.",
    placeholder:
      "PayMini — instant USDC payouts to gig workers in 8 seconds via a Farcaster Mini App.",
    budget: [10, 25],
  },
  {
    id: "problem",
    label: "Problem",
    hint: "A specific user with a specific pain. Avoid 'users want.' Start with a person doing a job.",
    placeholder:
      "Freelance designer Sarah collects payments across 4 platforms (Stripe, PayPal, Wise, Venmo) — 3–7 day waits, 4% lost to fees, no single dashboard. The gig economy adds 8M new earners a year, all with the same fragmented payout problem.",
    budget: [60, 80],
  },
  {
    id: "insight",
    label: "Insight",
    hint: "What's the non-obvious thing you believe? 'We believe X, while everyone else believes Y.'",
    placeholder:
      "Most onchain payment apps lose to incumbents on UX. We believe the wedge isn't a better wallet — it's distribution. A payment app that lives inside Farcaster reaches the user where they already are, and a Smart Wallet collapses signup to one tap.",
    budget: [40, 60],
  },
  {
    id: "product",
    label: "Product",
    hint: "What it does today. Walk through one concrete user flow in 3–5 sentences. Name the screens, actions, outcome.",
    placeholder:
      "PayMini is a Mini App. A buyer opens the cast, taps Pay, signs once with their Smart Wallet — funds settle to the recipient's Basename in 2 seconds. The recipient sees a notification in Warpcast and can off-ramp via Coinbase. We've shipped invoice creation, multi-recipient splits, and on-chain receipts.",
    budget: [80, 100],
  },
  {
    id: "why_now",
    label: "Why now",
    hint: "What changed in the last 6–18 months that makes this possible? Regulation, infra, behavior, capital.",
    placeholder:
      "Smart Wallet GA in 2024 collapsed onboarding from minutes to seconds. Mini Apps ship in Warpcast, where 250k crypto-native users live. USDC on Base now settles instantly with sub-cent fees. Three of the four pieces we need just became free.",
    budget: [40, 60],
  },
  {
    id: "why_base",
    label: "Why Base",
    hint: "Name the Base primitive your product depends on. NOT 'fast and cheap.'",
    placeholder:
      "Smart Wallet's passkey auth is our onboarding — without it, the Mini App is just another wallet-connect dApp and we lose 70% of users on the connect step. Mini App distribution is our acquisition channel — we appear in feed casts the user already follows. Coinbase Verifications gate cross-border payouts to compliant countries.",
    budget: [60, 80],
  },
  {
    id: "traction",
    label: "Traction",
    hint: "Real numbers. Or 'no traction yet — here's the plan for the next 4 weeks.' Honesty beats inflation.",
    placeholder:
      "Closed beta since March 12 with 47 paying invoicers. $11.4k GTV across 312 invoices, +28% week-over-week. 3 design partners (NFT studio, freelance collective, agency). 6-month waitlist of 1,200.",
    budget: [30, 60],
  },
  {
    id: "team",
    label: "Team",
    hint: "Names, roles, what each person previously shipped. 2–3 sentences. Link Twitter / Farcaster / GitHub.",
    placeholder:
      "Mira (CEO) — built and sold Stripe-style payment processor for SEA gig workers. Yusuf (CTO) — Solidity since 2017, audited 4 protocols. Both full-time, paid out of savings.",
    budget: [30, 50],
  },
  {
    id: "ask",
    label: "Ask",
    hint: "What you want from Base Batches besides the grant. Specific intros, design partners, technical reviewers.",
    placeholder:
      "Grant + program. Specifically: introductions to 2–3 large creator collectives on Farcaster as design partners, and a Smart Wallet engineering review of our session-key implementation.",
    budget: [20, 30],
  },
];

export const TOTAL_CEILING = 500;
export const TOTAL_TARGET_LOW = 480;

export function wordCount(text: string): number {
  if (!text) return 0;
  // Match the same notion of "word" judges' word-counters use:
  // sequences of non-whitespace separated by whitespace.
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const GENERIC_WHY_BASE_PHRASES = [
  "fast and cheap",
  "low fees",
  "low gas",
  "cheap and fast",
  "growing ecosystem",
  "base has 100m users",
  "coinbase has 100m users",
  "ethereum equivalent",
  "evm equivalent",
  "scales ethereum",
];

const BASE_PRIMITIVES = [
  "smart wallet",
  "passkey",
  "mini app",
  "minikit",
  "onchainkit",
  "basename",
  "coinbase verifications",
  "x402",
  "agentkit",
  "cdp",
  "paymaster",
];

export function whyBaseDiagnostic(text: string): {
  hasPrimitive: boolean;
  hasGenericPhrase: boolean;
  primitivesFound: string[];
} {
  const lc = text.toLowerCase();
  const primitivesFound = BASE_PRIMITIVES.filter((p) => lc.includes(p));
  const hasGenericPhrase = GENERIC_WHY_BASE_PHRASES.some((p) => lc.includes(p));
  return {
    hasPrimitive: primitivesFound.length > 0,
    hasGenericPhrase,
    primitivesFound,
  };
}

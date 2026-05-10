# What is Base, and why build on it?

Base is Coinbase's L2 — an Optimistic Rollup built on the OP Stack, EVM-equivalent, with mainnet live since August 2023. For Base Batches submissions, "Why Base" is the most-graded question, so this file walks through the actual answers.

## In one paragraph

Base is an EVM L2 with the lowest-friction onramp in crypto (you're already in Coinbase), the largest distribution surface (Coinbase has ~100M users + Farcaster Mini App distribution), and a pile of native primitives that don't exist this cleanly elsewhere: Smart Wallet (passkey + 4337 without the plumbing), MiniKit (Mini Apps with onchain actions in Farcaster), OnchainKit (drop-in React components), Basenames (onchain identity), Coinbase Verifications (KYC-grade attestations), and x402 (HTTP 402 micropayments for agents).

## When Base actually matters (vs. when it's a wrapper)

**Base materially helps when:**
- Onboarding latency matters (Smart Wallet collapses signup to seconds with passkeys).
- Distribution is the moat (Mini Apps in Farcaster + Coinbase surface area).
- You need compliant gating (Coinbase Verifications: country, KYC level, as onchain attestations).
- Users will hold or transact stablecoins (USDC native, low fees).
- You want agents to pay for resources autonomously (x402, AgentKit).
- You want a clean React stack out of the box (OnchainKit + viem + wagmi).

**Base is a wrapper when:**
- Your protocol is general-purpose DeFi with no Base-specific integration.
- "We chose Base because it's fast and cheap" is the only reason given.
- The product would behave identically on Arbitrum, Optimism, or Polygon zkEVM.

If your only "Why Base" is gas + speed, your submission is in trouble. Find a primitive your product depends on, or pick a different program.

## The native primitives, briefly

### Smart Wallet
Passkey-based wallet with native 4337 plumbing handled. No seed phrases. Onboards in seconds. Supports gas sponsorship via paymasters and batched transactions natively. The single biggest UX unlock on Base.
Docs: https://docs.base.org/identity/smart-wallet/quickstart/

### Mini Apps (MiniKit)
Mini Apps run inside Farcaster clients (Warpcast, Coinbase Wallet, etc.). MiniKit gives you the framework. Mini Apps inherit Farcaster's social graph and notification surface — that's the distribution unlock. If your product wants free user acquisition from a crypto-native social graph, this is it.
Docs: https://docs.base.org/mini-apps/

### OnchainKit
A React component library for crypto UIs. `<Wallet />`, `<Transaction />`, `<Identity />`, `<Swap />`, `<Earn />`, frame components, and more. Cuts a typical "build a Web3 frontend" task from days to hours.
Docs: https://onchainkit.xyz/

### Basenames
Onchain identity primitive — `username.base.eth`. ENS-compatible. Used for display, gating, allowlisting.
Docs: https://www.base.org/names

### Coinbase Verifications
Onchain attestations issued by Coinbase based on KYC information they already have. Country, account level, region. Lets you build compliance-aware features without running KYC yourself.
Docs: https://docs.cdp.coinbase.com/verifications/docs/welcome

### x402
HTTP 402-based micropayment protocol. Lets agents (or any HTTP client) pay for resources programmatically — APIs, content, compute. Strong fit for AI x crypto.
Docs: https://www.x402.org/

### AgentKit
Coinbase's framework for onchain agents. MPC wallets, action toolkit, integrations.
Docs: https://docs.cdp.coinbase.com/agentkit/docs/welcome

### CDP (Coinbase Developer Platform)
Onramp, faucet, smart accounts, paymaster. The plumbing you don't want to rebuild.
Docs: https://docs.cdp.coinbase.com/

## Core dev stack (for the build phase)

- **Smart contracts**: Foundry (preferred) or Hardhat, OpenZeppelin contracts, Solady for gas-tight primitives.
- **Frontend**: Next.js + viem + wagmi + RainbowKit OR OnchainKit + Smart Wallet.
- **Indexing**: Goldsky, Envio, Ponder, Subsquid, or direct viem `watchEvent`.
- **Hosting**: Vercel for frontend; Base mainnet/Sepolia for contracts.
- **Monitoring**: Tenderly, Alchemy, Basescan watchlists.

## Network details

| Network | Chain ID | RPC | Explorer |
|---|---|---|---|
| Base mainnet | 8453 | https://mainnet.base.org | https://basescan.org |
| Base Sepolia | 84532 | https://sepolia.base.org | https://sepolia.basescan.org |

## Where to go next

- Pick your wedge primitive (Smart Wallet / Mini App / OnchainKit / x402 / Verifications).
- `/scaffold-project` to set up the workspace.
- `/submit-to-base-batches` when you have a working demo.

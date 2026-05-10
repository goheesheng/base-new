# SME (Subject Matter Expert) Interview Prep

This is the technical interview. The SME is usually a Base/Coinbase engineer or external reviewer who reads your code and asks pointed questions. It's where strong-on-paper submissions fall apart.

## What SMEs verify

- The contracts the founder claimed exist, exist, and are verified on Basescan.
- The architecture is coherent — the contracts and the frontend match the claims in the light paper.
- The team understands the failure modes of their design (reentrancy, oracle, ERC-4626 inflation, replay, signature, gas grief, MEV).
- "Why Base" is real — the team can articulate which Base primitive they depend on and why.
- The team can ship.

## Pre-interview checklist

```bash
# 1. Contracts deployed and verified
read -p "Mainnet or sepolia contract address: " ADDR
echo "→ Open: https://basescan.org/address/$ADDR  (or sepolia.basescan.org)"
echo "→ Confirm: source code verified, ABI public, no proxy hiding logic"

# 2. Tests
ls test/ 2>/dev/null && forge coverage --report summary 2>/dev/null
echo "→ Aim for ≥ 70% line coverage on the contracts the SME will read"

# 3. Static analysis (if Foundry/Solidity)
which slither && slither . --print human-summary 2>&1 | head -40
which mythril && myth analyze contracts/

# 4. Gas profile
forge test --gas-report 2>/dev/null | head -40
```

## Likely SME questions

### Architecture
1. **Walk me through the call graph for the most important user action.**
   *Be ready to draw it. From frontend → wallet → contract → events → indexer.*
2. **Where does state live, and what's the source of truth?**
   *On-chain vs off-chain split. Why each piece is where it is.*
3. **What happens if your indexer goes down?**
   *Acceptable answer: "Reads degrade gracefully to direct RPC; writes unaffected."*

### Contract security
4. **What's your reentrancy story?**
   *Specific. CEI pattern, ReentrancyGuard, or no external calls. "We follow the checks-effects-interactions pattern in `withdraw()` — see line X."*
5. **How are oracles handled? What if the oracle stalls?**
   *Stale check, deviation check, fallback.*
6. **What's the upgrade story? Who can change the code?**
   *Multisig, timelock, no upgrades — pick one and own it.*
7. **ERC-4626 inflation attack mitigation?** (if vault)
   *Initial deposit, virtual shares, decimal offset.*
8. **Signature replay protection?** (if EIP-712)
   *Domain separator, nonce, deadline.*

### Base-specific
9. **Why Base — at the technical layer?**
   *Name the primitive. Show the integration point in code.*
10. **How are you using Smart Wallet / Mini Apps / OnchainKit / Coinbase Verifications / x402?**
    *Code reference. "Our login flow is in `src/auth.tsx` — line 42 uses `useSmartWallet()`."*
11. **What's your gas story on Base?**
    *Numbers. "User action X costs ~0.0001 ETH at 0.05 gwei, measured on Sepolia."*

### Operations
12. **How do you monitor production?**
    *Tenderly, Alchemy webhooks, Goldsky, Basescan watchlists. Pick what you actually use.*
13. **What's your incident response if a bug is found?**
    *Pause function, multisig response time, comms plan.*
14. **What's deployed, by whom, and how?**
    *Deploy script (`script/Deploy.s.sol`), deployer key custody, post-deploy verification steps.*

### Quality
15. **Coverage and test quality?**
    *`forge coverage` numbers. Property tests / invariant tests / fuzz?*
16. **Has anyone reviewed the code besides your team?**
    *Even informal. Friend who audits, public posting on Twitter, etc.*

## Anti-patterns to avoid in the SME interview

- Hand-waving on a specific question ("yeah we handle that"). Cite a line.
- Pretending the upgrade path is decided when it isn't. Say "we haven't decided yet, here are the trade-offs."
- Quoting test counts without coverage. "We have 47 tests" — fine, but `forge coverage` is the real number.
- Naming Base primitives you didn't actually integrate. SME opens the repo.
- Calling code "audited" when it isn't. "Reviewed by a friend who audits" is fine. "Audited by Trail of Bits" is verifiable.

## If you can't answer a question

Say so. "We haven't built that yet — here's how we'd approach it." Pretending is worse than admitting.

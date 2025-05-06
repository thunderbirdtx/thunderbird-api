# 🦅 Thunderbird

**Gas optimization infrastructure for Ethereum bots & wallets.**  
Estimate gas, submit private bundles, and save ETH — all powered by open source tools.

---

## 💡 What is Thunderbird?

Thunderbird is a lightweight infrastructure project designed to help bots and wallets optimize their Ethereum transactions. It includes:

- A private gas-aware API
- Open-source SDKs for bots/devs
- Flashbots and EIP-1559 support
- A minimal front-end explorer

---

## 🚧 Status

Thunderbird is currently in active development.  
Follow along [on Twitter](https://twitter.com/thunderbird_eth) for updates.

---

## 📦 Monorepo Overview

| Path           | Description                      |
|----------------|----------------------------------|
| `/api`         | Express-based private gas API    |
| `/sdk`         | Public TypeScript SDK (soon)     |
| `/site`        | Coming soon landing page         |

---

## 🛠 Getting Started (Dev)

```bash
git clone https://github.com/yourname/thunderbird.git
cd thunderbird/api
npm install
npm run dev
```

> Requires Node 18+

---

## 🧠 Roadmap Highlights

- [x] Gas estimate API
- [x] Flashbots submission support
- [x] EIP-1559 replacement logic
- [x] Wallet gas usage tracking
- [ ] `/simulate`, `/wait`, `/alerts` endpoints
- [ ] SDK release
- [ ] Gas strategy plugin support
- [ ] L2 + multi-chain support

---

## 🤝 Contributing

Open source SDKs will be released under MIT.  
Issues, feedback, and PRs welcome as we open up!

---

## 💸 Support the Project

If this tool saves you gas, consider donating:

```
0x225eb7fEF5308Fd49F1a3A2eF5c0Fd803C4b9011
```

Thank you for supporting open Ethereum infra.

---

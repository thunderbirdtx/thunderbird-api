# 🦅 Thunderbird

![Tests](https://github.com/thunderbirdtx/thunderbird/actions/workflows/test.yml/badge.svg)

**Gas optimization infrastructure for Ethereum bots & wallets.**  
Estimate gas, submit private bundles, and save ETH — all powered by open source tools.

---

## What is Thunderbird?

Thunderbird is a lightweight infrastructure project designed to help bots, dApps and wallets optimize their Ethereum transactions. It includes:

- A private gas-aware API
- Open-source SDKs for bots/devs
- Flashbots and EIP-1559 support
- A minimal front-end explorer

---

## 🚧 Status

Thunderbird is currently in active development.  
Follow along [on Twitter](https://twitter.com/thunderbirdtx) for updates.

---


##  Getting Started (Dev)

```bash
git clone https://github.com/thunderbirdtx/thunderbird-api.git
cd thunderbird-api
npm install
npm run dev
```

> Requires Node 18+

---

##  Roadmap Highlights

- [x] Gas estimate API
- [x] Flashbots submission support
- [x] EIP-1559 replacement logic
- [x] Wallet gas usage tracking
- [ ] `/simulate`, `/wait`, `/alerts` endpoints
- [ ] [SDK release](https://github.com/thunderbirdtx/thunderbird)
- [ ] Gas strategy plugin support
- [ ] L2 + multi-chain support

---

##  Contributing

Open source SDKs will be released under MIT.  
Issues, feedback, and PRs welcome as we open up!

---

## Docker Setup

To run the Thunderbird API locally with Docker and Redis:

### 1. Build and Start

```bash
docker-compose up --build
```

This will start:
- `api`: the Express API (port 3001)
- `redis`: for background job queues
- `db`: PostgreSQL (optional, if using Prisma with Postgres)

### 2. Environment Variables

Create a `.env` file or use `docker-compose`:

```env
REDIS_URL=redis://redis:6379
DATABASE_URL=postgresql://postgres:postgres@db:5432/thunderbird
THUNDERBIRD_DEBUG=true
```

### 3. Prisma Setup (if using Postgres)

Update your `schema.prisma`:

```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "debian-openssl-3.0.x"]
}
```

Then run:

```bash
npx prisma generate
```

---

##  Running Tests

This project uses [Jest](https://jestjs.io/) for testing.

### Run All Tests:

```bash
npm test
```

### Lint Before Push (recommended)

```bash
npm run lint
```

Linting uses ESLint and checks the `src/` and `__tests__/` folders. CI runs both lint and tests on every push to `main`.

To enable logging for test debugging:

```bash
THUNDERBIRD_DEBUG=true npm test
```

## Licensing

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).  
You are free to use, modify, and distribute the software with proper attribution.

---

##  Support the Project

If this tool saves you gas, consider donating:

```
0x225eb7fEF5308Fd49F1a3A2eF5c0Fd803C4b9011
```

Thank you for supporting open Ethereum infra.

---

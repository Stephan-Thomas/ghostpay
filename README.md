# GhostPay

> Privacy-focused payroll and salary wallet system built on the Stellar blockchain

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Stellar](https://img.shields.io/badge/Stellar-SDK-purple)](https://developers.stellar.org/)

## 🌟 Features

- **Privacy-First Design**: Generate disposable Stellar receiving addresses for each salary payment cycle
- **Master Wallet**: Keep a hidden master wallet for fund consolidation
- **Automatic Consolidation**: Scheduled jobs to sweep funds from disposable wallets
- **Multi-Wallet Dashboard**: Manage all your wallets in one place
- **Stablecoin Support**: Track USDC and other Stellar-based stablecoins
- **QR Code Generation**: Easy payment receiving with QR codes
- **Wallet Aliases**: Create memorable aliases for your wallets
- **Transaction History**: Complete audit trail of all transactions
- **Notification System**: Get alerts for incoming payments

## 🏗️ Architecture

```
ghostpay/
├── apps/
│   ├── frontend/          # Next.js + TypeScript + Tailwind
│   └── backend/           # Node.js + Express + TypeScript
├── packages/
│   ├── database/          # Prisma ORM schemas and migrations
│   └── shared/            # Shared types and utilities
├── docker-compose.yml     # Docker orchestration
└── scripts/               # Utility scripts
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Docker & Docker Compose (optional, for containerized setup)
- PostgreSQL (if running without Docker)
- Redis (if running without Docker)

### Development Setup

1. **Clone the repository**

```bash
git clone https://github.com/ghostpay/ghostpay.git
cd ghostpay
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start the database (using Docker)**

```bash
pnpm docker:up
```

Or set up PostgreSQL and Redis manually.

5. **Run database migrations**

```bash
pnpm db:push
pnpm db:generate
```

6. **Start development servers**

```bash
pnpm dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- API Documentation: http://localhost:4000/api-docs

### Docker Setup

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Architecture Guide](./docs/ARCHITECTURE.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Security Policy](./SECURITY.md)

## 🛠️ Tech Stack

### Frontend
- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [React Query](https://tanstack.com/query) - Data fetching
- [Stellar SDK](https://github.com/StellarCN/py-stellar-base) - Blockchain integration

### Backend
- [Express](https://expressjs.com/) - Web framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Prisma](https://www.prisma.io/) - Database ORM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Redis](https://redis.io/) - Caching
- [Stellar SDK](https://stellar.org/developers) - Blockchain integration
- [JWT](https://jwt.io/) - Authentication
- [Swagger/OpenAPI](https://swagger.io/) - API documentation

### DevOps
- [Docker](https://www.docker.com/) - Containerization
- [GitHub Actions](https://github.com/features/actions) - CI/CD
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

## 📁 Project Structure

```
ghostpay/
├── apps/
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── app/              # Next.js App Router
│   │   │   ├── components/       # Reusable components
│   │   │   ├── hooks/            # Custom React hooks
│   │   │   ├── lib/              # Utilities and helpers
│   │   │   ├── stores/           # Zustand stores
│   │   │   └── types/            # TypeScript types
│   │   ├── public/               # Static assets
│   │   └── package.json
│   └── backend/
│       ├── src/
│       │   ├── config/           # Configuration
│       │   ├── controllers/      # Route controllers
│       │   ├── middleware/       # Express middleware
│       │   ├── models/           # Database models
│       │   ├── repositories/     # Data access layer
│       │   ├── routes/           # API routes
│       │   ├── services/         # Business logic
│       │   ├── utils/            # Utilities
│       │   └── server.ts         # Entry point
│       └── package.json
├── packages/
│   ├── database/
│   │   ├── prisma/
│   │   │   └── schema.prisma     # Database schema
│   │   └── package.json
│   └── shared/
│       ├── src/
│       │   ├── types/            # Shared TypeScript types
│       │   ├── constants/        # Shared constants
│       │   └── utils/            # Shared utilities
│       └── package.json
├── docs/                         # Documentation
├── scripts/                      # Utility scripts
└── .github/
    └── workflows/                # GitHub Actions CI/CD
```

## 🔐 Security

GhostPay takes security seriously. Key security features include:

- **Encrypted wallet storage**: Private keys are encrypted at rest
- **Rate limiting**: API rate limiting to prevent abuse
- **Input validation**: All inputs validated using Zod
- **CORS protection**: Configured CORS policies
- **Helmet.js**: Security headers middleware
- **Audit logging**: All wallet actions are logged

### Security Considerations

> ⚠️ **TODO**: The following security improvements are planned:
> - Multi-signature wallet support
> - Hardware wallet integration
> - Enhanced encryption for sensitive data
> - Security audit and penetration testing
> - Bug bounty program

See [SECURITY.md](./SECURITY.md) for more details.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Good First Issues

Look for issues labeled:
- `good first issue` - Perfect for beginners
- `help wanted` - Needs community help
- `enhancement` - New features to implement

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [Stellar Development Foundation](https://stellar.org/) for the Stellar blockchain
- [Prisma](https://prisma.io/) for the excellent ORM
- [Vercel](https://vercel.com/) for Next.js

## 📞 Support

- Documentation: [docs/](./docs/)
- Issues: [GitHub Issues](https://github.com/ghostpay/ghostpay/issues)
- Discussions: [GitHub Discussions](https://github.com/ghostpay/ghostpay/discussions)

---

Built with ❤️ and zero baincells by the GhostPay Team

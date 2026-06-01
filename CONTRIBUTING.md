# Contributing to GhostPay

Thank you for your interest in contributing to GhostPay! This document provides guidelines and instructions for contributing.

## 🌟 How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find out you don't need to create one. When creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what behavior you expected**
- **Include screenshots if possible**
- **Include system information (OS, Node version, browser, etc.)**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List some examples of how this enhancement would be used**

### Pull Requests

1. Fork the repository and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## 🏗️ Development Setup

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Docker & Docker Compose (optional)
- PostgreSQL
- Redis

### Setting Up Development Environment

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/ghostpay.git
cd ghostpay

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start services (using Docker)
pnpm docker:up

# Run database migrations
pnpm db:push
pnpm db:generate

# Start development
pnpm dev
```

## 📋 Coding Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Use Prettier for formatting (runs on pre-commit via lint-staged)
- Run ESLint before committing

```bash
# Check linting
pnpm lint

# Format code
pnpm format
```

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat(wallet): add multi-signature support
fix(auth): resolve JWT token expiration issue
docs(readme): update installation instructions
```

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation
- `refactor/description` - Code refactoring

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run backend tests
pnpm test:backend

# Run frontend tests
pnpm test:frontend
```

### Writing Tests

- Write unit tests for services and utilities
- Write integration tests for API endpoints
- Aim for at least 80% code coverage
- Use descriptive test names

## 📁 Project Structure

### Backend (`apps/backend`)

```
apps/backend/src/
├── config/           # Configuration files
├── controllers/      # Request handlers
├── middleware/       # Express middleware
├── models/           # Database models
├── repositories/     # Data access layer
├── routes/           # API routes
├── services/         # Business logic
├── utils/            # Utility functions
└── server.ts         # Entry point
```

### Frontend (`apps/frontend`)

```
apps/frontend/src/
├── app/              # Next.js App Router pages
├── components/       # Reusable components
├── hooks/            # Custom React hooks
├── lib/              # Utilities and helpers
├── stores/           # Zustand stores
└── types/            # TypeScript types
```

### Shared Packages (`packages/`)

- `database/` - Prisma schema and migrations
- `shared/` - Shared types and utilities

## 🔧 Areas for Contribution

### Beginner-Friendly Tasks

- [ ] Documentation improvements
- [ ] Adding unit tests
- [ ] UI/UX improvements
- [ ] Bug fixes in non-critical paths
- [ ] Translation/localization

### Intermediate Tasks

- [ ] API endpoint implementations
- [ ] Frontend component development
- [ ] Database query optimization
- [ ] Integration testing
- [ ] Error handling improvements

### Advanced Tasks

- [ ] Security enhancements
- [ ] Blockchain transaction logic
- [ ] Performance optimization
- [ ] Multi-signature wallet support
- [ ] Encryption system improvements
- [ ] Cron job implementation for consolidation
- [ ] Real-time notification system

## 🔐 Security

Please review our [Security Policy](./SECURITY.md) before contributing security-related code.

### Security-Sensitive Areas

> ⚠️ **TODO - Security Improvements Needed:**
> - Enhanced encryption for private keys
> - Multi-signature wallet implementation
> - Hardware wallet integration
> - Rate limiting improvements
> - Input sanitization
> - SQL injection prevention audit

## 📝 Code Review Process

1. All submissions require review by maintainers
2. Be respectful and constructive in reviews
3. Address all review comments before merging
4. CI checks must pass before merging

## 🤔 Questions?

- Check the [documentation](./docs/)
- Search existing issues
- Ask in [GitHub Discussions](https://github.com/ghostpay/ghostpay/discussions)

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.
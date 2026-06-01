#!/bin/bash

# GhostPay Development Setup Script
# Automates initial setup and configuration

set -e

echo "🚀 GhostPay Development Setup"
echo "=============================="
echo

# Check prerequisites
echo "✓ Checking prerequisites..."
if ! command -v node &> /dev/null; then
  echo "❌ Node.js not found. Please install Node.js >= 18.0.0"
  exit 1
fi

if ! command -v pnpm &> /dev/null; then
  echo "❌ pnpm not found. Installing pnpm..."
  npm install -g pnpm
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ pnpm version: $(pnpm --version)"
echo

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Setup environment
echo "⚙️  Setting up environment..."
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✓ Created .env file from .env.example"
  echo "  ⚠️  Please edit .env with your configuration"
else
  echo "✓ .env already exists"
fi
echo

# Check Docker
if command -v docker-compose &> /dev/null; then
  echo "🐳 Starting Docker services..."
  docker-compose up -d
  echo "✓ Docker services started"
  echo
  
  # Wait for services
  echo "⏳ Waiting for services to be ready..."
  sleep 5
else
  echo "⚠️  Docker not found. Skipping Docker setup."
  echo "   Ensure PostgreSQL and Redis are running locally"
  echo
fi

# Run migrations
echo "🗄️  Setting up database..."
pnpm db:generate
pnpm db:push
echo "✓ Database setup complete"
echo

# Summary
echo "✅ Setup complete!"
echo
echo "Next steps:"
echo "  1. Review and edit .env file if needed"
echo "  2. Run 'pnpm dev' to start development servers"
echo "  3. Frontend: http://localhost:3000"
echo "  4. Backend API: http://localhost:4000"
echo "  5. API Docs: http://localhost:4000/api-docs (TODO)"
echo
echo "Documentation:"
echo "  - Contributing: https://github.com/ghostpay/ghostpay/blob/main/CONTRIBUTING.md"
echo "  - Architecture: https://github.com/ghostpay/ghostpay/blob/main/docs/ARCHITECTURE.md"
echo

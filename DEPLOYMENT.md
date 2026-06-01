<!-- Deployment instructions and deployment checklist-->
# Deployment Guide

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Code linting passes
- [ ] TypeScript compilation successful
- [ ] Environment variables configured
- [ ] Database migrations reviewed
- [ ] Security audit passed
- [ ] Performance optimizations applied
- [ ] Monitoring and logging configured

## Environment Setup

### Production Environment Variables

```bash
NODE_ENV=production
BACKEND_PORT=4000
DATABASE_URL=postgresql://user:pass@prod-db:5432/ghostpay
REDIS_URL=redis://prod-redis:6379
JWT_SECRET=<generate-strong-secret>
ENCRYPTION_KEY=<generate-32-char-hex>
STELLAR_NETWORK=public
# ... (see .env.example for all variables)
```

## Docker Deployment

### Building Docker Images

```bash
# Build specific services
docker-compose build backend
docker-compose build frontend

# Build all services
docker-compose build

# Build with arguments
docker build --build-arg NODE_ENV=production -f Dockerfile.backend -t ghostpay-backend:latest .
```

### Pushing to Registry

```bash
# Tag images
docker tag ghostpay-backend:latest ghcr.io/ghostpay/backend:latest
docker tag ghostpay-frontend:latest ghcr.io/ghostpay/frontend:latest

# Push images
docker push ghcr.io/ghostpay/backend:latest
docker push ghcr.io/ghostpay/frontend:latest
```

### Running on Production

```bash
# Using docker-compose
docker-compose -f docker-compose.prod.yml up -d

# Using Kubernetes
kubectl apply -f k8s/
```

## Database Migrations

```bash
# Run migrations
pnpm db:push

# Verify migrations
pnpm db:studio

# Rollback (if needed)
# TODO: Implement rollback strategy
```

## Health Checks

```bash
# API Health
curl http://localhost:4000/health

# Deep health check
curl http://localhost:4000/health/deep

# Frontend
curl http://localhost:3000
```

## Monitoring

- TODO: Set up APM (Application Performance Monitoring)
- TODO: Configure error tracking (Sentry)
- TODO: Set up log aggregation (ELK, Datadog)
- TODO: Configure alerts

## Rollback Procedure

1. Identify the issue
2. Revert to previous container version
3. Verify services are healthy
4. Investigate root cause
5. Deploy fix to staging first

## TODO: Deployment Automation

- [ ] Implement CD pipeline with GitHub Actions
- [ ] Auto-deploy on merge to main
- [ ] Staging environment deployment
- [ ] Blue-green deployment strategy
- [ ] Canary deployments for production
- [ ] Automated rollback on health check failure

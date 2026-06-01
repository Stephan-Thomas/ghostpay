/**
 * Development Checklist
 * Pre-deployment and quality checklist for GhostPay
 */

# Development & Deployment Checklist

## Pre-Commit Checklist

- [ ] Code follows TypeScript best practices
- [ ] No `any` types used (unless absolutely necessary with comment)
- [ ] No `console.log` statements in production code
- [ ] ESLint passes: `pnpm lint`
- [ ] Prettier formatting applied: `pnpm format`
- [ ] Type checking passes: `pnpm typecheck`
- [ ] Related tests pass: `pnpm test`
- [ ] No unused imports
- [ ] Comments explain "why", not "what"

## Pull Request Checklist

- [ ] PR has clear description
- [ ] Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/)
- [ ] Tests are written for new functionality
- [ ] Documentation updated (README, docs, comments)
- [ ] No breaking changes (or documented as breaking)
- [ ] Database migrations included (if needed)
- [ ] Environment variables documented
- [ ] API changes documented in Swagger/comments

## Code Review Checklist

- [ ] Code is readable and maintainable
- [ ] No security vulnerabilities
- [ ] Performance implications considered
- [ ] Error handling is comprehensive
- [ ] Logging is appropriate
- [ ] Database queries are optimized
- [ ] No N+1 queries
- [ ] API responses are consistent

## Testing Checklist

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] API tests pass
- [ ] Code coverage > 50%
- [ ] Manual testing completed
- [ ] Edge cases tested
- [ ] Error scenarios tested
- [ ] Load testing considered (for heavy operations)

## Security Checklist

- [ ] No secrets in code
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention verified
- [ ] XSS prevention verified
- [ ] CSRF tokens used (if applicable)
- [ ] Rate limiting implemented
- [ ] Authentication/authorization verified
- [ ] Dependencies have no critical vulnerabilities
- [ ] Sensitive data is encrypted
- [ ] Audit logging implemented

## Database Checklist

- [ ] Database schema is normalized
- [ ] Indexes are appropriate
- [ ] Migrations are tested
- [ ] Rollback plan documented
- [ ] Backup strategy in place
- [ ] Data retention policies followed

## Frontend Checklist

- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Cross-browser compatibility checked
- [ ] Accessibility (WCAG 2.1 AA) standards met
- [ ] Loading states implemented
- [ ] Error states handled
- [ ] Empty states shown
- [ ] Touch-friendly interactions (if mobile)
- [ ] Performance optimized (Lighthouse > 80)

## Backend Checklist

- [ ] API endpoints documented
- [ ] Error messages are helpful
- [ ] Request validation comprehensive
- [ ] Response format is consistent
- [ ] Pagination implemented (where needed)
- [ ] Filtering/sorting options documented
- [ ] Rate limiting configured
- [ ] Monitoring/logging setup

## Staging Deployment Checklist

- [ ] All CI/CD checks pass
- [ ] Manual testing in staging environment
- [ ] Database migrations tested
- [ ] Performance metrics acceptable
- [ ] Monitoring alerts configured
- [ ] Rollback plan documented
- [ ] Stakeholders notified

## Production Deployment Checklist

- [ ] Staging deployment successful
- [ ] Health checks pass
- [ ] All services healthy
- [ ] Monitoring dashboard online
- [ ] Alert notifications working
- [ ] Runbook updated
- [ ] Team on standby for 1 hour post-deploy
- [ ] Backup completed

## Post-Deployment Checklist

- [ ] Monitor error rates
- [ ] Monitor performance metrics
- [ ] Check application logs
- [ ] Verify feature functionality
- [ ] Test critical user flows
- [ ] Collect user feedback
- [ ] Document any issues
- [ ] Communicate status to team

## Performance Checklist

- [ ] API response times < 200ms
- [ ] Frontend load time < 3s (First Contentful Paint)
- [ ] Database queries optimized
- [ ] Redis caching implemented
- [ ] CDN configured (if applicable)
- [ ] Asset compression enabled
- [ ] Unnecessary re-renders eliminated

## Security Audit Checklist (Monthly)

- [ ] Dependency audit: `npm audit`
- [ ] Security headers verified
- [ ] SSL/TLS certificate valid
- [ ] CORS policy reviewed
- [ ] API permissions verified
- [ ] Database access controls checked
- [ ] Logs checked for suspicious activity
- [ ] Backup integrity verified

## Documentation Checklist

- [ ] README updated
- [ ] API documentation updated
- [ ] Architecture documentation updated
- [ ] Setup instructions clear
- [ ] Troubleshooting guide updated
- [ ] Deployment guide updated
- [ ] Contributing guide followed
- [ ] CHANGELOG updated

## Feature Completeness Checklist

- [ ] Feature implemented as specified
- [ ] UI/UX meets design specs
- [ ] All happy paths work
- [ ] Error paths handled
- [ ] Edge cases covered
- [ ] Performance acceptable
- [ ] Security verified
- [ ] Tests comprehensive

---

**Pro Tips**:
- Use this checklist as a template for your workflows
- Adapt as needed for your specific requirements
- Consider automating checks where possible (GitHub Actions, pre-commit hooks)
- Regularly review and update this checklist
- Celebrate completed deployments! 🎉

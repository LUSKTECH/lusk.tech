# GitHub Actions Workflows Setup

This document explains the CI/CD workflows configured for this project.

## Workflows Overview

### 1. CI Pipeline (`ci.yml`)
Runs on every push and PR to main/develop branches.

**Jobs:**
- **Lint**: ESLint code quality checks
- **Test & Coverage**: Vitest tests with Codecov reporting
- **Build**: Production build verification
- **A11y**: Accessibility testing with axe-core
- **Lighthouse**: Performance, accessibility, SEO, and best practices audits
- **Security**: Snyk vulnerability scanning
- **SonarCloud**: Code quality and security analysis

### 2. Security Checks (`security.yml`)
Comprehensive security scanning on push, PR, and weekly schedule.

**Jobs:**
- **Dependency Review**: Checks for vulnerable dependencies in PRs
- **Snyk**: Vulnerability scanning with SARIF upload to GitHub Security
- **NPM Audit**: Native npm security audit
- **Secret Scanning**: TruffleHog for exposed secrets
- **OpenSSF Scorecard**: Security best practices assessment

### 3. CodeQL Security Scan (`codeql.yml`)
GitHub's semantic code analysis for security vulnerabilities. Runs on push, PR, and weekly schedule.

### 4. Dependabot Auto-Merge (`dependabot-auto-merge.yml`)
Automatically approves and merges patch/minor dependency updates after CI passes.

### 5. Deploy (`deploy.yml`)
Deploys to Netlify on push to main branch.

## Required Secrets

Add these secrets in GitHub Settings → Secrets and variables → Actions:

### Codecov
1. Sign up at https://codecov.io
2. Add repository
3. Copy token
4. Add as `CODECOV_TOKEN`

### Snyk
1. Sign up at https://snyk.io
2. Go to Account Settings → API Token
3. Add as `SNYK_TOKEN`

### SonarCloud
1. Sign up at https://sonarcloud.io
2. Import repository
3. Copy token from project settings
4. Add as `SONAR_TOKEN`
5. Update `sonar-project.properties` with your org/project key

### Netlify (if not using Netlify's GitHub integration)
1. Get auth token from Netlify User Settings → Applications
2. Add as `NETLIFY_AUTH_TOKEN`
3. Get site ID from Site Settings → General
4. Add as `NETLIFY_SITE_ID`

### Lighthouse CI (Optional)
For persistent storage of Lighthouse reports:
1. Set up LHCI server or use temporary storage
2. Add `LHCI_GITHUB_APP_TOKEN` if using GitHub app

## Local Testing

### Run tests with coverage
```bash
npm run test:coverage
```

### Run linting
```bash
npm run lint
```

### Run accessibility scan
```bash
npm run build
npx serve -s dist -l 3000 &
npx @axe-core/cli http://localhost:3000
```

### Run Lighthouse
```bash
npm run build
npx serve -s dist -l 3000 &
npx lhci autorun
```

## Dependabot Configuration

Dependabot is configured to:
- Check for npm package updates weekly (Mondays at 9 AM)
- Check for GitHub Actions updates weekly
- Auto-merge patch and minor updates after CI passes
- Assign PRs to @codylusk

## Branch Protection Rules (Recommended)

Configure in GitHub Settings → Branches → Add rule for `main`:

- ✅ Require a pull request before merging
- ✅ Require status checks to pass before merging
  - lint
  - test
  - build
  - a11y
  - lighthouse
  - security
- ✅ Require branches to be up to date before merging
- ✅ Require conversation resolution before merging
- ✅ Do not allow bypassing the above settings

## Monitoring & Dashboards

- **Codecov**: https://codecov.io/gh/[username]/lusk.tech
- **SonarCloud**: https://sonarcloud.io/project/overview?id=lusktechnologies_lusk-tech
- **Snyk**: https://app.snyk.io
- **GitHub Security**: Repository → Security tab
  - Security Advisories
  - Dependabot Alerts
  - Code Scanning (CodeQL, Snyk SARIF)
  - Secret Scanning
  - OpenSSF Scorecard

## Security Features

### GitHub Security Integration

All security tools report to GitHub's Security tab using SARIF format:
- CodeQL findings
- Snyk vulnerabilities
- Dependency Review results
- OpenSSF Scorecard metrics

### Automated Security Updates

- **Dependabot**: Groups security updates for priority merging
- **Auto-merge**: Security patches auto-merge after CI passes
- **Weekly Scans**: Scheduled security checks every Monday

### Secret Protection

- TruffleHog scans for exposed secrets
- GitHub Secret Scanning enabled
- Pre-commit hooks recommended (see below)

### License Compliance

- MIT License
- Dependency Review blocks GPL-2.0 and GPL-3.0 licenses
- License information in package.json

## Troubleshooting

### CI failing on coverage
Ensure vitest and coverage dependencies are installed:
```bash
npm install -D vitest @vitest/coverage-v8 jsdom @testing-library/react
```

### Lighthouse failing
Check that all routes are accessible and performance thresholds in `lighthouserc.js` are realistic.

### SonarCloud not receiving coverage
Verify `sonar-project.properties` has correct project key and coverage path.

### Dependabot not auto-merging
Ensure branch protection rules allow auto-merge and CI passes all checks.

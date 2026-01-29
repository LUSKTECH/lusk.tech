# Workflow Trigger Paths

This document explains which file changes trigger which workflows to optimize CI/CD performance.

## Path Filter Strategy

Workflows only run when relevant files change, preventing unnecessary builds and saving CI minutes.

## Workflow Triggers

### CI Pipeline (`ci.yml`)

**Triggers on changes to:**
- `src/**` - Source code
- `server/**` - Backend server code
- `public/**` - Static assets
- `*.js` - Root-level config files (vite.config.js, etc.)
- `*.json` - Package files (package.json, etc.)
- `*.html` - HTML entry points
- `.github/workflows/ci.yml` - Workflow itself

**Does NOT trigger on:**
- `*.md` - Documentation files
- `LICENSE` - License file
- `.github/**` (except ci.yml) - Other GitHub configs
- `SECURITY.md` - Security policy

**Why:** Documentation changes don't affect code quality, tests, or build output.

---

### Security Checks (`security.yml`)

**Triggers on changes to:**
- `src/**` - Source code
- `server/**` - Backend code
- `package*.json` - Dependencies
- `.github/workflows/security.yml` - Workflow itself

**Does NOT trigger on:**
- `public/**` - Static assets
- `*.md` - Documentation
- Config files (unless they're package.json)

**Why:** Security scans focus on code and dependencies, not static assets or docs.

**Note:** Also runs on schedule (weekly) regardless of changes.

---

### CodeQL Security Scan (`codeql.yml`)

**Triggers on changes to:**
- `src/**` - Source code
- `server/**` - Backend code
- `*.js` - JavaScript files
- `.github/workflows/codeql.yml` - Workflow itself

**Does NOT trigger on:**
- `*.json` - Config files
- `public/**` - Static assets
- `*.md` - Documentation

**Why:** CodeQL analyzes code structure, not configuration or assets.

**Note:** Also runs on schedule (weekly) regardless of changes.

---

### Deploy (`deploy.yml`)

**Triggers on changes to:**
- `src/**` - Source code
- `server/**` - Backend code
- `public/**` - Static assets
- `*.js` - Config files
- `*.json` - Package files
- `*.html` - HTML files
- `netlify.toml` - Netlify config
- `.github/workflows/deploy.yml` - Workflow itself

**Does NOT trigger on:**
- `*.md` - Documentation
- `.github/**` (except deploy.yml) - Other GitHub configs
- `LICENSE`, `SECURITY.md` - Policy files

**Why:** Only deploy when actual application code or assets change.

---

### Dependabot Auto-Merge (`dependabot-auto-merge.yml`)

**Triggers on:** All pull requests (no path filter)

**Why:** Needs to check if PR author is Dependabot, regardless of files changed.

---

## Examples

### Scenario: Update README.md

**Workflows triggered:** None

**Reason:** Documentation changes don't affect code, tests, or deployment.

---

### Scenario: Update src/components/Header.jsx

**Workflows triggered:**
- ✅ CI Pipeline (lint, test, build, a11y, lighthouse, security, sonarcloud)
- ✅ Security Checks (snyk, npm-audit, secret-scanning)
- ✅ CodeQL Security Scan
- ✅ Deploy (if on main branch)

**Reason:** Source code changes require full validation.

---

### Scenario: Update package.json

**Workflows triggered:**
- ✅ CI Pipeline (dependency changes affect build)
- ✅ Security Checks (dependency security scan)
- ✅ Deploy (if on main branch)
- ❌ CodeQL (doesn't analyze JSON)

**Reason:** Dependency changes need security scanning but not code analysis.

---

### Scenario: Add image to public/

**Workflows triggered:**
- ✅ CI Pipeline (assets affect build)
- ✅ Deploy (if on main branch)
- ❌ Security Checks (static assets don't need security scan)
- ❌ CodeQL (no code to analyze)

**Reason:** Static assets affect deployment but not code security.

---

### Scenario: Update SECURITY.md

**Workflows triggered:** None

**Reason:** Policy documentation doesn't affect application.

---

## Benefits

1. **Faster feedback**: Relevant checks run immediately, irrelevant ones don't
2. **Cost savings**: Fewer CI minutes consumed
3. **Cleaner PR checks**: Only relevant status checks appear
4. **Better developer experience**: Less waiting for unrelated checks

## Maintenance

When adding new directories or file types:

1. Determine which workflows should run for those changes
2. Update the `paths:` filter in relevant workflow files
3. Document the decision in this file
4. Test with a sample PR

## Override Behavior

Path filters are ignored for:
- Scheduled runs (cron)
- Manual workflow dispatch
- Default branch protection (if configured)

This ensures security scans still run regularly even without code changes.

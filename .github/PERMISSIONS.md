# GitHub Actions Permissions

This document explains the permissions required by each workflow, following the principle of least privilege.

## Permission Scopes

GitHub Actions supports these permission scopes:

- `actions` - Download artifacts, cancel workflow runs
- `checks` - Create/update check runs
- `contents` - Read/write repository contents
- `deployments` - Create/update deployments
- `id-token` - Request OIDC JWT ID token
- `issues` - Create/update issues
- `packages` - Publish/install packages
- `pull-requests` - Create/update PRs and comments
- `security-events` - Upload security results (SARIF)
- `statuses` - Create commit statuses

Each scope can be set to:
- `read` - Read-only access
- `write` - Read and write access
- `none` - No access (explicit deny)

## Workflow Permissions

### CI Pipeline (`ci.yml`)

**Workflow-level permissions:**
```yaml
permissions:
  contents: read          # Read source code
  actions: read           # Download artifacts between jobs
  checks: write           # Create check runs for test results
  pull-requests: write    # Comment on PRs with results
```

**Why:**
- `contents: read` - Checkout code
- `actions: read` - Download build artifacts for a11y/lighthouse jobs
- `checks: write` - Report test results as check runs
- `pull-requests: write` - Post coverage reports and lint results

**Security note:** No write access to code, only to checks and PR comments.

---

### Security Checks (`security.yml`)

**Workflow-level permissions:**
```yaml
permissions:
  contents: read          # Read source code
  security-events: write  # Upload SARIF results
  actions: read           # Access workflow metadata
  pull-requests: read     # Read PR information
```

**Job-specific permissions:**

**dependency-review:**
```yaml
permissions:
  contents: read
  pull-requests: write    # Comment on PRs with findings
```

**snyk:**
```yaml
permissions:
  contents: read
  security-events: write  # Upload SARIF to Security tab
```

**npm-audit:**
```yaml
permissions:
  contents: read          # Only needs to read code
```

**secret-scanning:**
```yaml
permissions:
  contents: read          # Scan repository contents
```

**security-scorecard:**
```yaml
permissions:
  security-events: write  # Upload scorecard results
  id-token: write         # OIDC authentication
  contents: read          # Read repository
  actions: read           # Analyze workflow security
```

**Why:**
- `security-events: write` - Upload security findings to GitHub Security tab
- `id-token: write` - OpenSSF Scorecard requires OIDC authentication
- Job-level permissions override workflow-level for specific needs

---

### CodeQL Security Scan (`codeql.yml`)

**Workflow-level permissions:**
```yaml
permissions:
  actions: read           # Access workflow metadata
  contents: read          # Read source code
  security-events: write  # Upload CodeQL results
```

**Job-level permissions:**
```yaml
permissions:
  actions: read
  contents: read
  security-events: write
```

**Why:**
- `security-events: write` - Upload SARIF results to Security tab
- `contents: read` - Analyze source code
- `actions: read` - Required by CodeQL action

**Security note:** CodeQL only reads code, never writes.

---

### Deploy (`deploy.yml`)

**Workflow-level permissions:**
```yaml
permissions:
  contents: read          # Read source code
  deployments: write      # Create deployment status
  pull-requests: write    # Comment with preview URLs
```

**Why:**
- `contents: read` - Checkout and build code
- `deployments: write` - Create GitHub deployment records
- `pull-requests: write` - Post deployment URLs on PRs

**Security note:** No write access to code. Netlify handles actual deployment via API token.

---

### Dependabot Auto-Merge (`dependabot-auto-merge.yml`)

**Workflow-level permissions:**
```yaml
permissions:
  contents: write         # Merge PRs
  pull-requests: write    # Approve and merge PRs
```

**Why:**
- `contents: write` - Required to merge PRs
- `pull-requests: write` - Approve and enable auto-merge

**Security note:** Only runs for Dependabot PRs (`if: github.actor == 'dependabot[bot]'`). Regular users cannot trigger this workflow.

---

## Security Best Practices

### 1. Principle of Least Privilege

Each workflow has the minimum permissions needed:
- Most workflows only have `read` access to contents
- `write` permissions are granted only when necessary
- Job-level permissions can further restrict access

### 2. Explicit Permission Declaration

All workflows explicitly declare permissions rather than using defaults:
```yaml
# ✅ Good - Explicit permissions
permissions:
  contents: read
  security-events: write

# ❌ Bad - Implicit/default permissions
# (no permissions block)
```

### 3. Job-Level Overrides

Jobs can have more restrictive permissions than the workflow:
```yaml
permissions:
  contents: read
  security-events: write

jobs:
  npm-audit:
    permissions:
      contents: read  # Only needs read, not security-events
```

### 4. Token Scope Limitation

Workflows use `GITHUB_TOKEN` with scoped permissions, not personal access tokens (PATs):
- Automatically expires after job completion
- Scoped to the repository
- Cannot access other repositories

### 5. Third-Party Actions

When using third-party actions:
- Pin to specific commit SHA (not tag) for security
- Review action source code before use
- Prefer verified creators and official actions

## Permission Audit

### Read-Only Workflows
- CodeQL (only analyzes code)
- NPM Audit (only checks dependencies)
- Secret Scanning (only scans for secrets)

### Write to Security Tab
- Security Checks (uploads SARIF)
- CodeQL (uploads SARIF)
- Snyk (uploads SARIF)
- OpenSSF Scorecard (uploads SARIF)

### Write to PRs
- CI Pipeline (posts test results)
- Dependency Review (posts findings)
- Deploy (posts preview URLs)
- Dependabot Auto-Merge (approves PRs)

### Write to Repository
- Dependabot Auto-Merge (merges PRs)

## Troubleshooting

### Error: "Resource not accessible by integration"

**Cause:** Workflow lacks required permission.

**Solution:** Add the missing permission to the workflow or job.

### Error: "Refusing to allow an OAuth App to create or update workflow"

**Cause:** Trying to modify workflows with insufficient permissions.

**Solution:** Workflows cannot modify other workflows. Use repository settings or manual updates.

### Error: "SARIF upload failed"

**Cause:** Missing `security-events: write` permission.

**Solution:** Add `security-events: write` to workflow permissions.

## References

- [GitHub Actions Permissions](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token)
- [Security Hardening for GitHub Actions](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
- [SARIF Support](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning)

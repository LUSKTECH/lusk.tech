# Branch Protection Rules

This document outlines the recommended branch protection rules for this repository.

## Main Branch Protection

Configure these settings for the `main` branch in GitHub Settings → Branches → Add rule:

### Branch Name Pattern
```
main
```

### Protection Rules

#### Require Pull Request Reviews
- ✅ **Require a pull request before merging**
  - Required approving reviews: **1**
  - ✅ Dismiss stale pull request approvals when new commits are pushed
  - ✅ Require review from Code Owners
  - ❌ Restrict who can dismiss pull request reviews (for small teams)

#### Status Checks
- ✅ **Require status checks to pass before merging**
  - ✅ Require branches to be up to date before merging
  
  **Required status checks:**
  - `lint` (CI)
  - `test` (CI)
  - `build` (CI)
  - `a11y` (CI)
  - `lighthouse` (CI)
  - `security` (CI)
  - `snyk` (Security Checks)
  - `npm-audit` (Security Checks)
  - `CodeQL` (CodeQL Security Scan)

#### Conversation Resolution
- ✅ **Require conversation resolution before merging**
  - All review comments must be resolved

#### Commit Signing
- ✅ **Require signed commits** (recommended for security)

#### Additional Settings
- ✅ **Require linear history**
  - Prevents merge commits, enforces rebase or squash
- ✅ **Include administrators**
  - Apply rules to repository administrators
- ❌ **Allow force pushes** (disabled for safety)
- ❌ **Allow deletions** (disabled for safety)

#### Restrict Pushes
- ❌ **Restrict who can push to matching branches** (optional)
  - For larger teams, restrict to specific users/teams

### Lock Branch
- ❌ **Lock branch** (only for archived projects)

---

## Develop Branch Protection (Optional)

If using a `develop` branch for integration:

### Branch Name Pattern
```
develop
```

### Protection Rules

#### Require Pull Request Reviews
- ✅ **Require a pull request before merging**
  - Required approving reviews: **1**
  - ✅ Dismiss stale pull request approvals when new commits are pushed

#### Status Checks
- ✅ **Require status checks to pass before merging**
  - ✅ Require branches to be up to date before merging
  
  **Required status checks:**
  - `lint` (CI)
  - `test` (CI)
  - `build` (CI)

#### Additional Settings
- ✅ **Require conversation resolution before merging**
- ✅ **Require linear history**
- ❌ **Include administrators** (more flexible for develop)
- ❌ **Allow force pushes** (disabled)
- ❌ **Allow deletions** (disabled)

---

## Feature Branch Naming Convention

Enforce branch naming through team conventions (not GitHub settings):

```
feature/description
bugfix/description
hotfix/description
release/version
```

**Examples:**
- `feature/add-contact-form`
- `bugfix/fix-mobile-menu`
- `hotfix/security-patch`
- `release/v1.2.0`

---

## Rulesets (Alternative to Branch Protection)

GitHub Rulesets provide more flexible protection. To configure:

1. Go to Settings → Rules → Rulesets
2. Create new ruleset
3. Target branches: `main`, `develop`
4. Add rules similar to above

**Benefits:**
- More granular control
- Can target multiple branches with patterns
- Better bypass controls
- Metadata restrictions

---

## Bypass Permissions

For emergency situations, configure bypass permissions:

1. Settings → Branches → Edit rule
2. "Allow specified actors to bypass required pull requests"
3. Add: Repository administrators only
4. Document when bypass is acceptable

**Acceptable bypass scenarios:**
- Critical security hotfixes
- Emergency production issues
- Automated release processes

**Always:**
- Document the bypass in commit message
- Create follow-up PR for review
- Notify team of bypass

---

## Enforcement Timeline

### Phase 1: Soft Launch (Week 1-2)
- Enable basic protections
- Require PRs but allow self-approval
- Monitor for issues

### Phase 2: Full Enforcement (Week 3+)
- Require external approval
- Enforce all status checks
- Include administrators

### Phase 3: Hardening (Month 2+)
- Add commit signing requirement
- Restrict bypass permissions
- Enable additional security checks

---

## Monitoring Compliance

### Weekly Review
- Check for bypass usage
- Review failed status checks
- Audit force push attempts

### Monthly Review
- Evaluate rule effectiveness
- Update required checks as needed
- Review team feedback

---

## Troubleshooting

### "Required status check is not present"

**Cause:** Workflow hasn't run yet or check name changed.

**Solution:** 
1. Trigger workflow by creating a test PR
2. Verify check name matches workflow job name
3. Update branch protection rule

### "Administrator bypass not working"

**Cause:** "Include administrators" is enabled.

**Solution:** Temporarily disable to allow bypass, then re-enable.

### "Cannot merge: branch is out of date"

**Cause:** "Require branches to be up to date" is enabled.

**Solution:** Update branch with latest main:
```bash
git checkout feature-branch
git rebase main
git push --force-with-lease
```

---

## References

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Rulesets Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)

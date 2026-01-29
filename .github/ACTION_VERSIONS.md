# GitHub Actions Version Updates

**Last Updated:** January 27, 2026

This document tracks the versions of all GitHub Actions used in this repository's workflows.

## Current Action Versions

### Core GitHub Actions

| Action | Version | Latest Available | Status |
|--------|---------|------------------|--------|
| `actions/checkout` | v6 | v6 | ✅ Up to date |
| `actions/setup-node` | v6 | v6.2.0 | ✅ Up to date |
| `actions/upload-artifact` | v4 | v6 | ✅ Supported (v4 still maintained) |
| `actions/download-artifact` | v4 | v4 | ✅ Up to date |
| `actions/dependency-review-action` | v4.8.2 | v4.8.2 | ✅ Up to date |

### Security & Analysis Actions

| Action | Version | Latest Available | Status |
|--------|---------|------------------|--------|
| `github/codeql-action` | v4 | v4.32.0 | ✅ Up to date |
| `ossf/scorecard-action` | v2.4.3 | v2.4.3 | ✅ Up to date |
| `snyk/actions/node` | master | master | ✅ Up to date |
| `trufflesecurity/trufflehog` | main | main | ✅ Up to date |
| `SonarSource/sonarqube-scan-action` | v4 | v4 | ✅ Up to date |

### Deployment & Release Actions

| Action | Version | Latest Available | Status |
|--------|---------|------------------|--------|
| `nwtgck/actions-netlify` | v3 | v3.0.0 | ✅ Up to date |
| `softprops/action-gh-release` | v2 | v2.5.0 | ✅ Up to date |
| `mikepenz/release-changelog-builder-action` | v6 | v6.0.1 | ✅ Up to date |

### Testing & Quality Actions

| Action | Version | Latest Available | Status |
|--------|---------|------------------|--------|
| `codecov/codecov-action` | v5 | v5.5.2 | ✅ Up to date |
| `andresz1/size-limit-action` | v1 | v1 | ✅ Up to date |

### Automation Actions

| Action | Version | Latest Available | Status |
|--------|---------|------------------|--------|
| `dependabot/fetch-metadata` | v2.5.0 | v2.5.0 | ✅ Up to date |

## Recent Updates (January 27, 2026)

The following actions were updated to their latest versions:

1. **actions/setup-node**: v4 → v6
   - Updated to Node.js 24 runtime
   - Improved caching performance

2. **codecov/codecov-action**: v4 → v5
   - Tokenless uploads for public repos
   - Improved upload performance

3. **github/codeql-action**: v3 → v4
   - v3 deprecated as of January 2026
   - Updated to Node.js 20 runtime
   - Enhanced analysis capabilities

4. **ossf/scorecard-action**: v2.4.0 → v2.4.3
   - Bug fixes and security improvements

5. **SonarSource/sonarcloud-github-action**: Deprecated → **SonarSource/sonarqube-scan-action** v4
   - Migrated to unified SonarQube scan action
   - The old action is deprecated and will be removed

6. **mikepenz/release-changelog-builder-action**: v4 → v6
   - Improved changelog generation
   - Better contributor tracking

7. **softprops/action-gh-release**: v1 → v2
   - Draft release support until all artifacts uploaded
   - Better error handling

8. **actions/dependency-review-action**: v4 → v4.8.2
   - Fixed PURL parsing for scoped packages
   - Improved large summary handling

9. **dependabot/fetch-metadata**: v2 → v2.5.0
   - Updated to Node.js 20 runtime
   - Enhanced metadata extraction

## Deprecation Notices

### Deprecated Actions

- **SonarSource/sonarcloud-github-action@master**: Deprecated
  - **Replacement**: Use `SonarSource/sonarqube-scan-action@v4`
  - **Migration**: Drop-in replacement, no configuration changes needed

### Actions Approaching Deprecation

- **actions/upload-artifact@v3**: Deprecated as of January 30, 2025
  - Currently using v4 ✅
  
- **actions/download-artifact@v3**: Deprecated as of January 30, 2025
  - Currently using v4 ✅

## Version Update Policy

We follow these guidelines for action version updates:

1. **Major versions**: Review changelog and test before updating
2. **Minor versions**: Update within 1 month of release
3. **Patch versions**: Update within 2 weeks of release
4. **Security updates**: Update immediately

## Checking for Updates

To check for the latest versions of actions:

```bash
# Check a specific action's releases
curl -s https://api.github.com/repos/actions/checkout/releases/latest | jq -r .tag_name

# Or visit the GitHub Marketplace
# https://github.com/marketplace/actions/
```

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Marketplace](https://github.com/marketplace?type=actions)
- [Actions Changelog](https://github.blog/changelog/label/actions/)

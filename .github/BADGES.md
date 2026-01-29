# Badge Configuration Guide

This document explains all the badges used in the README and how to configure them.

## 🔧 Setup Required

Some badges require configuration with actual values. Replace placeholders with your actual IDs/tokens.

### 1. Netlify Deploy Status

**Current Badge:**

```markdown
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)](https://app.netlify.com/sites/lusk.tech/deploys)
```

**How to get your Site ID:**

1. Go to your Netlify dashboard
2. Select your site
3. Go to Site settings → General
4. Copy the "API ID" (this is your site ID)
5. Replace `YOUR-SITE-ID` in the badge URL

### 2. Uptime Robot

**Current Badge:**

```markdown
[![Uptime Robot status](https://img.shields.io/uptimerobot/status/m797506042-YOUR-ID?label=uptime)](https://stats.uptimerobot.com)
```

**How to set up:**

1. Sign up at <https://uptimerobot.com> (free tier available)
2. Add a monitor for <https://lusk.tech>
3. Go to Settings → API Settings
4. Get your monitor ID (starts with `m`)
5. Replace `m797506042-YOUR-ID` with your actual monitor ID

**Alternative:** Remove this badge if you don't want uptime monitoring

### 3. SonarCloud

**Current Badges:**

```markdown
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=lusktechnologies_lusk.tech&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=lusktechnologies_lusk.tech)
```

**How to configure:**

1. Sign up at <https://sonarcloud.io>
2. Import your GitHub repository
3. Your project key will be `{org}_{repo}` (e.g., `lusktechnologies_lusk.tech`)
4. Replace `lusktechnologies_lusk.tech` with your actual project key in all SonarCloud badges

### 4. Snyk Security

**Current Badge:**

```markdown
[![Snyk Security](https://snyk.io/test/github/lusktechnologies/lusk.tech/badge.svg)](https://snyk.io/test/github/lusktechnologies/lusk.tech)
```

**How to configure:**

1. Sign up at <https://snyk.io>
2. Connect your GitHub repository
3. Replace `lusktechnologies/lusk.tech` with your actual `{org}/{repo}`

### 5. OpenSSF Scorecard

**Current Badge:**

```markdown
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/lusktechnologies/lusk.tech/badge)](https://securityscorecards.dev/viewer/?uri=github.com/lusktechnologies/lusk.tech)
```

**How to configure:**

- This badge works automatically once you have the OpenSSF Scorecard workflow running
- Replace `lusktechnologies/lusk.tech` with your actual `{org}/{repo}`

### 6. Codecov

**Current Badge:**

```markdown
[![codecov](https://codecov.io/gh/lusktechnologies/lusk.tech/branch/main/graph/badge.svg)](https://codecov.io/gh/lusktechnologies/lusk.tech)
```

**How to configure:**

1. Sign up at <https://codecov.io>
2. Connect your GitHub repository
3. Replace `lusktechnologies/lusk.tech` with your actual `{org}/{repo}`
4. Add `CODECOV_TOKEN` to GitHub Secrets

### 7. Repobeats Analytics

**Current Badge:**

```markdown
![Alt](https://repobeats.axiom.co/api/embed/YOUR_REPOBEATS_TOKEN.svg "Repobeats analytics image")
```

**How to configure:**

1. Go to <https://repobeats.axiom.co/>
2. Connect your GitHub repository
3. Get your embed token
4. Replace `YOUR_REPOBEATS_TOKEN` with your actual token

**Alternative:** Remove this section if you don't want detailed analytics

## 📊 Badge Categories

### Build & Deployment (Auto-configured)

These badges work automatically with your GitHub Actions:

- ✅ CI Status
- ✅ Security Workflow Status
- ✅ CodeQL Status

### Performance (Static)

These are static badges showing your targets:

- Lighthouse Performance: 90+
- Lighthouse Accessibility: 100
- PageSpeed: 90+

**Update these** when your actual scores change.

### Technology Stack (Static)

These show your tech stack versions:

- React 19
- Vite 7
- Node.js 20

**Update these** when you upgrade versions.

### Standards (Static)

These show your development standards:

- MIT License
- Conventional Commits
- Prettier code style

## 🎨 Badge Customization

### Shields.io Custom Badges

You can create custom badges at <https://shields.io>

Example:

```markdown
![Custom Badge](https://img.shields.io/badge/custom-badge-blue)
```

### Badge Colors

Common color schemes:

- Success: `brightgreen`, `success`
- Warning: `yellow`, `orange`
- Error: `red`, `critical`
- Info: `blue`, `informational`
- Neutral: `lightgrey`, `inactive`

### Badge Logos

Add logos with `logo` parameter:

```markdown
![Badge](https://img.shields.io/badge/text-value-color?logo=react&logoColor=white)
```

Available logos: <https://simpleicons.org/>

## 🔄 Maintenance

### Monthly Tasks

- [ ] Verify all badges are displaying correctly
- [ ] Update version badges when dependencies are upgraded
- [ ] Check that external services (Codecov, SonarCloud, Snyk) are still connected

### When to Update

- **Version badges**: After upgrading React, Vite, or Node.js
- **Performance badges**: After significant performance improvements
- **Coverage badges**: Automatically updated by Codecov
- **Security badges**: Automatically updated by Snyk and OpenSSF

## 🗑️ Optional Badges to Remove

If you want a cleaner README, consider removing:

1. **Uptime Robot** - Only useful if you have frequent downtime issues
2. **Repobeats** - Detailed analytics might be overkill
3. **Language Distribution** - Obvious for a React project
4. **Contributor Activity** - Not relevant for single-developer projects

## 📚 Resources

- [Shields.io](https://shields.io/) - Badge generator
- [Simple Icons](https://simpleicons.org/) - Logo library
- [GitHub Badges](https://github.com/badges/shields) - Badge documentation
- [Awesome Badges](https://github.com/Naereen/badges) - Badge collection

## 🎯 Recommended Minimal Set

For a clean, professional look, keep these essential badges:

```markdown
<!-- Status -->
[![CI](...)
[![Netlify Status](...)

<!-- Quality -->
[![codecov](...)
[![Quality Gate](...)

<!-- Security -->
[![Security](...)
[![Snyk](...)

<!-- License -->
[![License: MIT](...)
```

This gives you build status, code quality, security posture, and licensing info without overwhelming visitors.

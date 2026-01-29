# Deployment Guide

This document outlines the deployment process, rollback procedures, and best practices.

## Deployment Environments

### Production
- **URL**: https://lusk.tech
- **Branch**: `main`
- **Trigger**: Push to main or tag creation
- **Platform**: Netlify
- **Auto-deploy**: Yes

### Preview (PR Deployments)
- **URL**: `https://pr-{number}--lusk-tech.netlify.app`
- **Branch**: Any PR branch
- **Trigger**: Pull request opened/updated
- **Platform**: Netlify
- **Auto-deploy**: Yes
- **Lifetime**: Until PR is closed

---

## Deployment Process

### Automated Deployment (Recommended)

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make Changes and Commit**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/my-feature
   ```

3. **Create Pull Request**
   - PR preview deployment automatically created
   - All CI checks run automatically
   - Review preview URL in PR comment

4. **Review and Approve**
   - Code review by team member
   - All status checks must pass
   - Preview deployment tested

5. **Merge to Main**
   - Squash and merge (preferred)
   - Production deployment triggers automatically
   - Monitor deployment in Netlify dashboard

### Manual Deployment (Emergency)

If automated deployment fails:

1. **Build Locally**
   ```bash
   npm ci
   npm run build
   ```

2. **Deploy via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod --dir=dist
   ```

---

## Release Process

### Creating a Release

1. **Update Version**
   ```bash
   npm version patch  # or minor, major
   ```

2. **Push Tag**
   ```bash
   git push origin main --tags
   ```

3. **Automated Actions**
   - Release workflow creates GitHub release
   - Changelog generated automatically
   - Build artifacts uploaded

### Versioning Strategy

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backwards compatible
- **PATCH** (0.0.1): Bug fixes, backwards compatible

**Examples:**
```bash
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.1 → 1.1.0
npm version major  # 1.1.0 → 2.0.0
```

---

## Rollback Procedures

### Quick Rollback (Netlify)

1. **Via Netlify Dashboard**
   - Go to Deploys tab
   - Find last working deployment
   - Click "Publish deploy"
   - Confirm rollback

2. **Via Netlify CLI**
   ```bash
   netlify rollback
   ```

### Git Rollback

1. **Revert Last Commit**
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Revert to Specific Commit**
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

3. **Hard Reset (Use with Caution)**
   ```bash
   git reset --hard <commit-hash>
   git push origin main --force
   ```
   ⚠️ Only use if absolutely necessary and team is aware

### Emergency Rollback

If production is completely broken:

1. **Immediate Rollback**
   - Use Netlify dashboard for instant rollback
   - Notify team in Slack/communication channel

2. **Investigate Issue**
   - Check deployment logs
   - Review recent changes
   - Identify root cause

3. **Create Hotfix**
   ```bash
   git checkout -b hotfix/critical-fix main
   # Make fix
   git commit -m "hotfix: fix critical issue"
   git push origin hotfix/critical-fix
   ```

4. **Fast-track PR**
   - Create PR with "hotfix" label
   - Request immediate review
   - Merge and deploy

---

## Deployment Checklist

### Pre-Deployment

- [ ] All tests passing locally
- [ ] Code reviewed and approved
- [ ] No console errors or warnings
- [ ] Tested in multiple browsers
- [ ] Mobile responsiveness verified
- [ ] Accessibility tested
- [ ] Performance benchmarks met
- [ ] Security scan passed
- [ ] Environment variables configured

### During Deployment

- [ ] Monitor deployment logs
- [ ] Check build completion
- [ ] Verify deployment URL
- [ ] Test critical user flows

### Post-Deployment

- [ ] Verify production site loads
- [ ] Test contact form
- [ ] Check all navigation links
- [ ] Verify analytics tracking
- [ ] Monitor error logs (first 30 minutes)
- [ ] Check Lighthouse scores
- [ ] Verify SEO meta tags

---

## Monitoring

### Real-Time Monitoring

**Netlify Dashboard:**
- Deployment status
- Build logs
- Function logs (if applicable)
- Analytics

**Browser Console:**
```javascript
// Check for errors
console.log('Production health check');
```

### Post-Deployment Checks

1. **Lighthouse Audit**
   ```bash
   npx lighthouse https://lusk.tech --view
   ```

2. **Broken Link Check**
   ```bash
   npx broken-link-checker https://lusk.tech
   ```

3. **Security Headers**
   ```bash
   curl -I https://lusk.tech
   ```

---

## Troubleshooting

### Build Fails

**Check:**
1. Build logs in GitHub Actions
2. Netlify build logs
3. Package.json scripts
4. Node version compatibility

**Common Issues:**
- Missing environment variables
- Dependency conflicts
- Build script errors
- Out of memory

### Deployment Succeeds but Site Broken

**Check:**
1. Browser console for errors
2. Network tab for failed requests
3. Asset paths (relative vs absolute)
4. Environment-specific code

### Performance Degradation

**Check:**
1. Bundle size increased
2. New dependencies added
3. Unoptimized images
4. Blocking scripts

**Fix:**
```bash
# Analyze bundle
npm run build
npx vite-bundle-visualizer
```

---

## Environment Variables

### Required Variables

**Netlify:**
- `NETLIFY_AUTH_TOKEN` - Netlify API token
- `NETLIFY_SITE_ID` - Site identifier

**GitHub Secrets:**
- `CODECOV_TOKEN` - Code coverage reporting
- `SNYK_TOKEN` - Security scanning
- `SONAR_TOKEN` - Code quality analysis

### Adding New Variables

1. **Local Development**
   ```bash
   # Add to .env
   VITE_NEW_VAR=value
   ```

2. **Netlify**
   - Site settings → Environment variables
   - Add key-value pair
   - Trigger redeploy

3. **GitHub Actions**
   - Repository settings → Secrets
   - Add new secret
   - Update workflow files

---

## Best Practices

### Do's ✅

- Deploy during low-traffic hours
- Test in preview environment first
- Monitor deployments for 30 minutes
- Keep deployment window short
- Document changes in PR
- Use feature flags for risky changes
- Maintain deployment runbook

### Don'ts ❌

- Don't deploy on Fridays (unless necessary)
- Don't skip CI checks
- Don't deploy without testing
- Don't ignore warnings
- Don't deploy multiple changes at once
- Don't bypass code review
- Don't forget to notify team

---

## Deployment Schedule

### Recommended Windows

**Best Times:**
- Tuesday-Thursday: 10 AM - 2 PM (local time)
- Low traffic periods
- When team is available for monitoring

**Avoid:**
- Fridays after 2 PM
- Weekends
- Holidays
- Peak traffic hours
- Before major events

---

## Communication

### Deployment Notifications

**Before Deployment:**
- Notify team in Slack/communication channel
- Mention expected downtime (if any)
- Share preview URL for final check

**During Deployment:**
- Post deployment start message
- Share deployment URL
- Monitor for issues

**After Deployment:**
- Confirm successful deployment
- Share production URL
- Note any issues or rollbacks

---

## Disaster Recovery

### Backup Strategy

**Automated:**
- Git history (complete code backup)
- Netlify deployment history (30 days)
- Database backups (if applicable)

**Manual:**
- Export critical data monthly
- Document configuration
- Maintain infrastructure as code

### Recovery Steps

1. **Identify Issue**
   - Determine scope of problem
   - Check error logs
   - Assess user impact

2. **Immediate Action**
   - Rollback to last known good state
   - Notify users if necessary
   - Disable affected features

3. **Root Cause Analysis**
   - Review recent changes
   - Check logs and metrics
   - Identify failure point

4. **Permanent Fix**
   - Create hotfix branch
   - Implement solution
   - Test thoroughly
   - Deploy fix

5. **Post-Mortem**
   - Document incident
   - Identify prevention measures
   - Update runbooks
   - Share learnings with team

---

## References

- [Netlify Deployment Documentation](https://docs.netlify.com/site-deploys/overview/)
- [Semantic Versioning](https://semver.org/)
- [The Twelve-Factor App](https://12factor.net/)

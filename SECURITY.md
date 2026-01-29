# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Reporting a Vulnerability

We take the security of Lusk Technologies' projects seriously. If you believe you have found a
security vulnerability, please report it to us as described below.

### GitHub Security Advisories

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them using GitHub's Security Advisory feature:

1. Navigate to the [Security tab](../../security) of this repository
2. Click "Report a vulnerability"
3. Fill out the advisory form with details about the vulnerability

### What to Include

Please include the following information in your report:

- Type of vulnerability (e.g., XSS, SQL injection, authentication bypass)
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the vulnerability, including how an attacker might exploit it

### Response Timeline

- **Initial Response**: Within 48 hours of submission
- **Status Update**: Within 7 days with an assessment of the report
- **Resolution**: We aim to release a fix within 30 days for critical vulnerabilities

### Disclosure Policy

- We will acknowledge receipt of your vulnerability report
- We will confirm the vulnerability and determine its impact
- We will release a fix as soon as possible
- We will publicly disclose the vulnerability after a fix is released

### Security Update Process

1. Security vulnerability is reported via GitHub Security Advisory
2. Vulnerability is confirmed and assessed
3. Fix is developed in a private branch
4. Security advisory is published with CVE (if applicable)
5. Fix is released and announced
6. Advisory is made public after users have had time to update

## Security Best Practices

When contributing to this project:

- Never commit sensitive data (API keys, passwords, tokens)
- Use environment variables for configuration
- Keep dependencies up to date
- Follow secure coding practices
- Review code for security issues before submitting PRs

## Automated Security Scanning

This project uses multiple automated security tools:

- **Dependabot**: Automated dependency updates
- **CodeQL**: Semantic code analysis
- **Snyk**: Vulnerability scanning for dependencies
- **SonarCloud**: Code quality and security analysis

Security scan results are available in the [Security tab](../../security).

## Security Contacts

- **Primary**: Security Advisory (preferred method)
- **Email**: <security@lusk.tech>
- **Response Time**: 48 hours

## Recognition

We appreciate the security research community's efforts in responsibly disclosing vulnerabilities.
Contributors who report valid security issues will be acknowledged in our security advisories
(unless they prefer to remain anonymous).

## Additional Resources

- [GitHub Security Advisories Documentation](https://docs.github.com/en/code-security/security-advisories)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)

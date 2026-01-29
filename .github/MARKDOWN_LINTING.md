# Markdown Linting

This project uses [markdownlint-cli](https://github.com/igorshubovych/markdownlint-cli) to ensure consistent and high-quality markdown documentation.

## Configuration

Markdown linting rules are configured in `.markdownlint.json`:

```json
{
  "default": true,
  "MD013": {
    "line_length": 120,
    "code_blocks": false,
    "tables": false
  },
  "MD033": {
    "allowed_elements": ["br", "details", "summary", "img", "kbd"]
  },
  "MD041": false,
  "MD024": {
    "siblings_only": true
  }
}
```

### Rule Customizations

- **MD013** (line-length): Set to 120 characters, excluding code blocks and tables
- **MD033** (no-inline-html): Allows specific HTML elements (`<br>`, `<details>`, `<summary>`, `<img>`, `<kbd>`)
- **MD041** (first-line-heading): Disabled to allow badges and other content before the first heading
- **MD024** (no-duplicate-heading): Only checks sibling headings (allows same heading in different sections)

## Running Locally

```bash
# Lint all markdown files
npm run lint:md

# Lint and auto-fix issues (where possible)
npx markdownlint '**/*.md' --ignore node_modules --ignore dist --fix
```

## CI Integration

Markdown linting runs automatically in the CI pipeline:

- **Workflow**: `.github/workflows/ci.yml`
- **Job**: `lint`
- **Trigger**: On push and pull requests to `main` and `develop` branches

The CI will fail if any markdown linting errors are found.

## Common Issues and Fixes

### Line Length (MD013)

**Issue**: Lines longer than 120 characters

**Fix**: Break long lines into multiple lines

```markdown
<!-- Bad -->
This is a very long line that exceeds the 120 character limit and should be broken into multiple lines for better readability.

<!-- Good -->
This is a very long line that exceeds the 120 character limit and should be broken into
multiple lines for better readability.
```

### Bare URLs (MD034)

**Issue**: URLs not wrapped in angle brackets or markdown links

**Fix**: Use angle brackets or proper markdown links

```markdown
<!-- Bad -->
Email: hello@example.com
Website: https://example.com

<!-- Good -->
Email: <hello@example.com>
Website: <https://example.com>
Or: [Example](https://example.com)
```

### Blanks Around Fences (MD031)

**Issue**: Code blocks not surrounded by blank lines

**Fix**: Add blank lines before and after code blocks

```markdown
<!-- Bad -->
Some text
```bash
code here
```
More text

<!-- Good -->
Some text

```bash
code here
```

More text
```

### Blanks Around Lists (MD032)

**Issue**: Lists not surrounded by blank lines

**Fix**: Add blank lines before and after lists

```markdown
<!-- Bad -->
Some text
- Item 1
- Item 2
More text

<!-- Good -->
Some text

- Item 1
- Item 2

More text
```

### Fenced Code Language (MD040)

**Issue**: Code blocks without language specified

**Fix**: Add language identifier to code blocks

```markdown
<!-- Bad -->
```
code here
```

<!-- Good -->
```bash
code here
```
```

### Link Fragments (MD051)

**Issue**: Internal links pointing to non-existent headings

**Fix**: Ensure link fragments match actual heading IDs (including emojis)

```markdown
<!-- Bad -->
[Quick Start](#quick-start)  <!-- If heading is "🏁 Quick Start" -->

<!-- Good -->
[Quick Start](#-quick-start)  <!-- Matches "🏁 Quick Start" -->
```

### Emphasis as Heading (MD036)

**Issue**: Using bold/italic instead of proper headings

**Fix**: Use proper markdown headings

```markdown
<!-- Bad -->
**Section Title**

<!-- Good -->
## Section Title
```

## Files Checked

The linter checks all markdown files in the repository:

- `README.md`
- `SECURITY.md`
- `SETUP.md`
- `LICENSE` (if markdown)
- `.github/*.md`
- All documentation files

**Excluded**:

- `node_modules/`
- `dist/`
- Any files in `.gitignore`

## Editor Integration

### VS Code

Install the [markdownlint extension](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint):

```bash
code --install-extension DavidAnson.vscode-markdownlint
```

The extension will automatically use the `.markdownlint.json` configuration.

### Other Editors

- **Vim/Neovim**: Use [ALE](https://github.com/dense-analysis/ale) or [coc-markdownlint](https://github.com/fannheyward/coc-markdownlint)
- **Sublime Text**: Use [SublimeLinter-contrib-markdownlint](https://github.com/jonlabelle/SublimeLinter-contrib-markdownlint)
- **Atom**: Use [linter-markdownlint](https://atom.io/packages/linter-markdownlint)

## Resources

- [markdownlint Rules](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md)
- [markdownlint-cli Documentation](https://github.com/igorshubovych/markdownlint-cli)
- [Markdown Guide](https://www.markdownguide.org/)

# Claude Code Rules for hugo.im

## Commit Guidelines

### ❌ No Attribution Required
- Do NOT add "Generated with Claude Code" or similar attribution
- Do NOT add "Co-Authored-By: Claude" lines
- Keep commit messages clean and professional

### ✅ Commit Message Format
- Use conventional commits format: `type: description`
- Focus on what was changed, not who changed it
- Be concise and descriptive
- Examples:
  - `feat: upgrade to Astro v5.13.5`
  - `fix: resolve TypeScript errors in content collections`
  - `refactor: update deprecated ViewTransitions to ClientRouter`

### 📋 General Development Rules
- Always test builds and linting before committing
- Fix all TypeScript errors and warnings when possible
- Follow existing code style and patterns
- Update documentation when making significant changes

## Project-Specific Notes
- This is a personal blog built with Astro
- Uses TypeScript throughout
- Supports multilingual content (English/Portuguese)
- Prioritize performance and accessibility
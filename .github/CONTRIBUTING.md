# Contributing

Thank you for your interest in improving this project.

## Ground Rules

- Be respectful and constructive in all discussions.
- Follow the [Code of Conduct](./CODE_OF_CONDUCT.md).
- Keep pull requests focused and small when possible.

## Development Setup

1. Install Node.js 22+ and pnpm 11+.
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start development server:
   ```bash
   pnpm dev
   ```

## Project Quality Checks

Before opening a pull request, run:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

If API schema changed, regenerate client:

```bash
pnpm gen-api
```

## Commit and Pull Request Guidelines

- Write clear commit messages.
- Reference related issue numbers when applicable.
- Include a concise summary of what changed and why.
- Add screenshots for UI changes.
- Mention breaking changes explicitly.

## Reporting Bugs and Requesting Features

Please use the issue templates in this repository.

When reporting a bug, include:

- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, browser, Node, pnpm)

## Questions

If you are unsure how to proceed, open a discussion or issue with context.

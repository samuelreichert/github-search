# GitHub Search

Search GitHub repositories, page through results, and inspect repository details including languages and README content.

## Stack

- Bun 1.3+
- React Router Framework Mode (SPA), React, TypeScript, and Redux Toolkit
- Tailwind CSS and Lucide icons
- Vitest and Testing Library for unit tests
- Playwright for end-to-end tests

## Setup

Install dependencies and create local environment settings:

```sh
bun install
cp .env.local.example .env.local
```

`VITE_GITHUB_TOKEN` is optional. Add a GitHub personal access token when you need authenticated API limits or private repository access.

## Development

```sh
bun run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Checks

```sh
bun run format:check
bun run typecheck
bun run test
bunx playwright install chromium
bun run test:e2e
bun run build
```

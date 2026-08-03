# Nuxt Dashboard

Nuxt 4 dashboard application with authentication, hero management, and user management.

## Stack

- Nuxt 4
- Nuxt UI 4
- Pinia
- TypeScript
- OpenAPI client generation via `@hey-api/openapi-ts`
- Fly.io deployment

## Features

- Login and registration flow
- Auth-protected routes (`/heroes`, `/users`)
- Heroes pages (list, details, create)
- Users list for authorized users
- Generated typed API client in `app/client/`

## Requirements

- Node.js 22+
- pnpm 11+

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run development server:

```bash
pnpm dev
```

App will be available at `http://localhost:3000`.

## Environment Configuration

The frontend API base URL is configured via Nuxt runtime config:

- `public.apiBaseUrl` in `nuxt.config.ts`

For production, set it using environment variables (for example in Fly secrets or deploy environment):

```bash
NUXT_PUBLIC_API_BASE_URL=https://your-api.example.com
```

## API Client Generation

The OpenAPI spec is stored in `openapi.json`.

Regenerate client files in `app/client/`:

```bash
pnpm gen-api
```

Generator config lives in `openapi-ts.config.ts`.

## Scripts

- `pnpm dev` - start dev server
- `pnpm build` - build production bundle
- `pnpm preview` - preview built app locally
- `pnpm typecheck` - run Nuxt type checking
- `pnpm lint` - run ESLint
- `pnpm lint:fix` - run ESLint with auto-fix
- `pnpm gen-api` - regenerate typed API client from OpenAPI

## Production Build

Build locally:

```bash
pnpm build
```

Preview build locally:

```bash
pnpm preview
```

## Deploy to Fly.io

Project contains ready-to-use `Dockerfile` and `fly.toml`.

Typical deploy flow:

```bash
fly deploy
```

Useful commands:

```bash
fly logs
fly status
```

## Project Structure

- `app/pages/` - route pages
- `app/components/` - UI components
- `app/stores/` - Pinia stores
- `app/middleware/` - route middleware
- `app/plugins/` - Nuxt plugins
- `app/client/` - generated API client

## Notes

- Icon collections are configured in `nuxt.config.ts` for stable production SSR on Fly.
- Auth token is stored via cookie helpers in `app/utils/token.ts`.

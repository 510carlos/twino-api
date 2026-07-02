# The Weekend Is Never Over

A small Next.js site for the Twino / The Weekend Is Never Over homepage.

The app is intentionally simple: one public landing page with an art-deco countdown showing where it is currently close to 5 o'clock, drink recommendations, and links to the table games site.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Public landing page |
| `/api/health` | Health check |
| `/health`, `/healthz`, `/api/healthz`, `/ping` | Rewrites to `/api/health` |

## Key Files

- `app/page.tsx` - Home page route
- `components/FiveOclockDeco/` - Main visual experience and data
- `components/Countdown/Countdown.helper.ts` - Countdown/time-zone logic
- `components/Countdown/cities.ts` - Time-zone city/drink mapping
- `public/drinks/` - Drink images
- `public/flags/` - Flag assets
- `public/games/` - Game card images

## Development

```bash
corepack pnpm install
corepack pnpm dev
```

Open `http://localhost:65210`.

## Scripts

```bash
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm build
corepack pnpm start
corepack pnpm format
```

## Deployment

The site is deployed on Vercel from this repository.

The canonical branch is `main`. `master` currently points at the same commit for compatibility while the deployment settings are cleaned up.
